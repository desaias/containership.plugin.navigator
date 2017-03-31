import React, { PropTypes, PureComponent } from 'react';
import 'isomorphic-fetch';

import { Router } from '../routes';

import Page from '../layouts/main';
import ConfirmModal from '../components/ConfirmModal';
import SectionHeader from '../components/SectionHeader';
import ToggleBtn from '../components/ToggleBtn';
import TopNav from '../components/TopNavAppDetail';

import vars from '../styles/vars';

export default class ApplicationSettings extends PureComponent {
  static async getInitialProps({ pathname, req, query }) {
    const res = await fetch(`http://198.199.69.61/v1/applications/${query.id}`);
    const json = await res.json();
    return {
      application: { ...json },
      pathname: (req && req.url) || pathname,
    };
  }

  constructor() {
    super();
    this.toggleJsonMode = this.toggleJsonMode.bind(this);
    this.state = {
      modalVisible: false,
      modalConfirmText: 'DELETE',
      modalInputText: '',
      itemsToDisplayInJSON: [
        'image',
        'command',
        'network_mode',
        'container_port',
        'cpus',
        'memory',
        'respawn',
        'privileged',
      ],
      displayInJSON: {
        command: '',
        container_port: '',
        cpus: 0.25,
        image: '',
        memory: '512',
        network_mode: 'bridge',
        privileged: false,
        respawn: true,
      },
      jsonMode: false,
      jsonError: false,
      payload: {
        command: '',
        containers: [],
        container_port: '',
        cpus: 0.25,
        engine: 'docker',
        env_vars: [],
        id: '',
        image: '',
        memory: 512,
        network_mode: 'bridge',
        privileged: false,
        respawn: true,
        tags: {},
        volumes: [{ container: '/data' }],
      },
      hasError: {
        id: false,
        image: false,
        command: false,
        network_mode: false,
        container_port: false,
        cpus: false,
        memory: false,
        respawn: false,
        privileged: false,
      },
    };
  }

  componentDidMount() {
    const { application } = this.props;
    this.setExistingPayload(application);
  }

  setExistingPayload(app) {
    const tmp = {};
    this.state.itemsToDisplayInJSON.map(key => (tmp[key] = app[key]));
    this.setState({
      payload: {
        ...app,
      },
      displayInJSON: tmp,
    });
  }

  deleteApplication() {
    const { application } = this.props;
    if (this.state.modalConfirmText === this.state.modalInputText) {
      this.setState({ modalInputText: '', modalVisible: false });
      return fetch(`http://198.199.69.61/v1/applications/${application.id}`, {
        method: 'DELETE',
      })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error('deleting error');
        }
        return res;
      })
      .then(() => {
        Router.push('/applications');
      });
    }
    return false;
  }

  toggleJsonMode() {
    this.setState({ jsonMode: !this.state.jsonMode });
  }

  validateString(attr) {
    const key = Object.keys(attr)[0];
    const value = Object.values(attr)[0];
    this.setState({
      hasError: {
        ...this.state.hasError,
        [key]: value === '',
      },
    });
  }

  validateFloat(attr) {
    const key = Object.keys(attr)[0];
    const value = Object.values(attr)[0];
    this.setState({
      hasError: {
        ...this.state.hasError,
        [key]: value <= 0,
      },
    });
  }

  jsonEditPayload(payload) {
    return this.setState({ displayInJSON: JSON.parse(payload) });
  }

  jsonOnBlur(json) {
    try {
      JSON.parse(json);
      this.setState({ jsonError: false });
      return true;
    } catch (err) {
      this.setState({ jsonError: true });
      return false;
    }
  }

  updateInputValue(attr) {
    const key = Object.keys(attr)[0];
    this.setState({
      displayInJSON: {
        ...this.state.displayInJSON,
        ...attr,
      },
    }, () => {
      switch (key) {
      case 'id':
      case 'image':
      case 'network_mode':
        this.validateString(attr);
        break;
      case 'cpus':
        this.validateFloat(attr);
        break;
      default:
        break;
      }
    });
  }

  updateApplication() {
    fetch(`http://198.199.69.61/v1/applications/${this.state.payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.displayInJSON),
    })
    .then(res => res.json())
    .then((app) => {
      Router.pushRoute('applicationsDetail', { id: app.id });
    });
  }

  render() {
    const { application, pathname } = this.props;

    let jsonClasses = 'json';
    if (this.state.jsonMode) {
      jsonClasses = 'json json--on';
    }
    if (this.state.jsonError) {
      jsonClasses = `${jsonClasses} error`;
    }

    const {
      command,
      container_port: containerPort, // rename as camelCase
      cpus,
      image,
      memory,
      network_mode: networkMode, // rename as camelCase
      privileged,
      respawn,
    } = this.state.displayInJSON;

    return (
      <Page pathname={pathname}>
        <TopNav appId={application.id} pathname={pathname} />

        <div className="json-toggle">
          <ToggleBtn
            text="JSON Mode"
            toggle={this.toggleJsonMode}
          />
        </div>

        <SectionHeader title={`${application.id} Settings`} />

        <section>
          <main>
            <div className="form">
              <div className="input-wrap">
                <label htmlFor="id">Name</label>
                <input
                  className={this.state.hasError.id ? 'error' : ''}
                  id="id"
                  placeholder="Appliation Name"
                  type="text"
                  defaultValue={application.id}
                  readOnly
                />
              </div>

              <div className="input-wrap">
                <label htmlFor="image">Image</label>
                <input
                  className={this.state.hasError.image ? 'error' : ''}
                  id="image"
                  onBlur={e => this.validateString({ image: e.target.value })}
                  onChange={e => this.updateInputValue({ image: e.target.value })}
                  placeholder="Image"
                  type="text"
                  value={image}
                />
              </div>

              <div className="input-wrap">
                <label htmlFor="command">Command</label>
                <input
                  id="command"
                  onChange={e => this.updateInputValue({ command: e.target.value })}
                  placeholder="node server.js"
                  type="text"
                  value={command}
                />
              </div>

              <div className="input-wrap">
                <label htmlFor="network_mode">Network</label>
                <select
                  className={this.state.hasError.network_mode ? 'error' : ''}
                  id="network_mode"
                  onBlur={e => this.validateString({ network_mode: e.target.value })}
                  onChange={e => this.updateInputValue({ network_mode: e.target.value })}
                  value={networkMode}
                >
                  <option value="">Select Network Type</option>
                  <option value="bridge">Bridge</option>
                  <option value="host">Host</option>
                </select>
              </div>

              <div className="input-wrap">
                <label htmlFor="container_port">Port</label>
                <input
                  id="container_port"
                  onChange={e => this.updateInputValue({
                    container_port: parseInt(e.target.value, 10) || '',
                  })}
                  placeholder="Add a port number"
                  type="text"
                  value={containerPort}
                />
              </div>

              <div className="input-wrap">
                <label htmlFor="cpus">CPUs</label>
                <input
                  id="cpus"
                  onChange={e => this.updateInputValue({
                    cpus: e.target.value,
                  })}
                  onBlur={e => this.updateInputValue({
                    cpus: parseFloat(e.target.value) || 0.1,
                  })}
                  placeholder="0.25"
                  type="text"
                  value={cpus}
                />
              </div>

              <div className="input-wrap">
                <label htmlFor="memory">Memory (MB)</label>
                <input
                  id="memory"
                  onBlur={e => this.updateInputValue({
                    memory: parseInt(e.target.value, 10) || 1,
                  })}
                  onChange={e => this.updateInputValue({ memory: e.target.value })}
                  placeholder="512"
                  type="text"
                  value={memory}
                />
              </div>

              <div className="input-wrap">
                <label htmlFor="respawn">Respawn</label>
                <select
                  id="network"
                  onChange={e => this.updateInputValue({ respawn: e.target.value === 'true' })}
                  value={respawn}
                >
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </div>

              <div className="input-wrap">
                <label htmlFor="privileged">Privileged</label>
                <select
                  id="privileged"
                  onChange={e => this.updateInputValue({ privileged: e.target.value === 'true' })}
                  value={privileged}
                >
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </div>

              <div className="btn-wrap">
                <button
                  className="btn blue"
                  id="addBtn"
                  onClick={() => this.updateApplication()}
                >Update Application</button>
              </div>

            </div>

            <textarea
              className={jsonClasses}
              onBlur={e => this.jsonOnBlur(e.target.value)}
              onFocus={e => this.jsonOnBlur(e.target.value)}
              onChange={e => this.jsonEditPayload(e.target.value)}
              value={JSON.stringify(this.state.displayInJSON, undefined, 2)}
            />
          </main>
        </section>

        <SectionHeader title="Delete Application" />
        <div className="delete-btn-wrap">
          <button
            className="btn red"
            onClick={() => this.setState({ modalConfirmText: application.id, modalVisible: true })}
          >Delete Application</button>
        </div>

        <ConfirmModal
          changeInputFunc={e => this.setState({ modalInputText: e.target.value })}
          closeModal={() => this.setState({ modalInputText: '', modalVisible: false })}
          confirmBtnFunc={() => this.deleteApplication()}
          deleteBtnText="Confirm Delete"
          inputPlaceholder={this.state.modalConfirmText}
          inputText={this.state.modalInputText}
          isVisible={this.state.modalVisible}
          title={`Delete ${application.id}`}
        />

        <style jsx>{`
          .json-toggle {
            justify-content: flex-end;
            margin: 6rem 3rem -8.5rem;
          }

          main {
            display: flex;
            flex-direction: row;
            flex: 1;
            overflow: hidden;
            margin: 2rem -2rem 0 0;
          }

          .form {
            flex: 1;
            overflow: scroll;
          }

          .json {
            background: ${vars.darkBlue};
            box-sizing: border-box;
            color: #fff;
            flex: 0 0 50%;
            font-family: monospace;
            font-size: 120%;
            margin-right: -50%;
            padding: 2rem;
            transition-property: all;
            transition: cubic-bezier(.17,.67,.83,.67) 300ms;
          }

          .json--on {
            margin-right: 0;
            border: 0;
            outline: none;
          }

          .json.error {
            background: ${vars.red};
          }

          .input-wrap {
            display: flex;
            align-items: center;
            margin: 0 0 2rem 2rem;
          }
          .input-wrap label,
          .input-wrap input {
            font-size: 1.4rem;
          }
          .input-wrap label {
            display: block;
            width: 15rem;
          }
          .input-wrap input {
            width: 30rem;
          }
          .input-wrap select {
            width: 30rem;
            font-size: 1.4rem;
            border: 1px solid #e8e8e8;
            background-color: #fff;
            height: 4rem;
          }

          .input-wrap select.error {
            border: 1px solid ${vars.red};
          }

          .btn-wrap {
            width: 30rem;
            margin-left: 17rem;
            margin-bottom: 2rem;
          }

          .delete-btn-wrap {
            margin: 2rem 0;
            width: 50rem;
          }

          input[readonly] {
            background: #d8d8d8;
          }
        `}</style>
      </Page>
    );
  }
}

ApplicationSettings.propTypes = {
  application: PropTypes.object,
  pathname: PropTypes.string,
};
