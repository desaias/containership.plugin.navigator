import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';

import { API } from '../utils/config';
import { Router } from '../routes';

import Page from '../layouts/main';
import SectionHeader from '../components/SectionHeader';
import ToggleBtn from '../components/ToggleBtn';

import vars from '../styles/vars';

export default class AddApplication extends PureComponent {
  static async getInitialProps({ pathname, req }) {
    return {
      pathname: (req && req.url) || pathname,
    };
  }

  constructor() {
    super();
    this.toggleJsonMode = this.toggleJsonMode.bind(this);
    this.state = {
      jsonMode: false,
      jsonError: false,
      payload: {
        command: '',
        container_port: '',
        cpus: 0.25,
        engine: 'docker',
        id: '',
        image: '',
        memory: 512,
        network_mode: 'bridge',
        privileged: false,
        respawn: true,
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
    return this.setState({ payload: JSON.parse(payload) });
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
      payload: {
        ...this.state.payload,
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

  createApplication() {
    fetch(`${API}/applications/${this.state.payload.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.payload),
    })
    .then(res => res.json())
    .then((app) => {
      Router.pushRoute('applicationsDetail', { id: app.id });
    });
  }

  render() {
    const { pathname } = this.props;

    let jsonClasses = 'json';
    if (this.state.jsonMode) {
      jsonClasses = 'json json--on';
    }
    if (this.state.jsonError) {
      jsonClasses = `${jsonClasses} error`;
    }
    return (
      <Page pathname={pathname}>
        <div className="json-toggle">
          <ToggleBtn
            text="JSON Mode"
            toggle={this.toggleJsonMode}
          />
        </div>

        <SectionHeader title="Add New Application" />

        <section>

          <main>
            <div className="form">
              <div className="input-wrap">
                <label htmlFor="id">Name</label>
                <input
                  className={this.state.hasError.id ? 'error' : ''}
                  id="id"
                  onBlur={e => this.validateString({ id: e.target.value })}
                  onChange={e => this.updateInputValue({ id: e.target.value })}
                  placeholder="Application Name"
                  type="text"
                  value={this.state.payload.id}
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
                  value={this.state.payload.image}
                />
              </div>

              <div className="input-wrap">
                <label htmlFor="command">Command</label>
                <input
                  id="command"
                  onChange={e => this.updateInputValue({ command: e.target.value })}
                  placeholder="node server.js"
                  type="text"
                  value={this.state.payload.command}
                />
              </div>

              <div className="input-wrap">
                <label htmlFor="network_mode">Network</label>
                <select
                  className={this.state.hasError.network_mode ? 'error' : ''}
                  id="network_mode"
                  onBlur={e => this.validateString({ network_mode: e.target.value })}
                  onChange={e => this.updateInputValue({ network_mode: e.target.value })}
                  value={this.state.payload.network_mode}
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
                  value={this.state.payload.container_port}
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
                  value={this.state.payload.cpus}
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
                  value={this.state.payload.memory}
                />
              </div>

              <div className="input-wrap">
                <label htmlFor="respawn">Respawn</label>
                <select
                  id="network"
                  onChange={e => this.updateInputValue({ respawn: e.target.value === 'true' })}
                  value={this.state.payload.respawn}
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
                  value={this.state.payload.privileged}
                >
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </div>

              <div className="btn-wrap">
                <button
                  className="btn blue"
                  id="addBtn"
                  onClick={() => this.createApplication()}
                >Create Application</button>
              </div>
            </div>

            <textarea
              className={jsonClasses}
              onBlur={e => this.jsonOnBlur(e.target.value)}
              onFocus={e => this.jsonOnBlur(e.target.value)}
              onChange={e => this.jsonEditPayload(e.target.value)}
              value={JSON.stringify(this.state.payload, undefined, 2)}
            />
          </main>
        </section>

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
          }
        `}</style>
      </Page>
    );
  }
}

AddApplication.propTypes = {
  pathname: PropTypes.string,
};
