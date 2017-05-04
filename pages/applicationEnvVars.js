import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';

import Page from '../layouts/main';
import SectionHeader from '../components/SectionHeader';
import TopNav from '../components/TopNavAppDetail';
import EnvironmentVariableListItem from '../components/EnviornmentVariableListItem';
import EnvironmentVariableListItemEdit from '../components/EnviornmentVariableListItemEdit';

export default class ApplicationEnvVars extends PureComponent {
  static async getInitialProps({ pathname, req, query }) {
    let res;
    if (process.browser) {
      res = await fetch(`${window.location.protocol}//${window.location.hostname}/v1/applications/${query.id}`);
    } else {
      res = await fetch(`http://127.0.0.1/v1/applications/${query.id}`);
    }
    const json = await res.json();
    return {
      application: { ...json },
      pathname: (req && req.url) || pathname,
    };
  }

  constructor() {
    super();
    this.state = {
      editingVar: false,
      envKey: '',
      envValue: '',
      modifiedEnvKey: '',
      modifiedEnvVal: '',
    };
  }

  addEnvVar() {
    const { application } = this.props;
    const vars = {
      ...application.env_vars,
      ...{ [this.state.envKey.trim()]: this.state.envValue },
    };
    this.sendPayload(application.id, vars);
  }

  deleteEnvVar(envVar) {
    const { application } = this.props;
    const vars = {
      ...application.env_vars,
    };
    delete vars[envVar];
    this.sendPayload(application.id, vars);
  }

  updateEnvVar() {
    const { application } = this.props;
    const vars = {
      ...application.env_vars,
    };
    delete vars[this.state.editingVar];
    vars[this.state.modifiedEnvKey] = this.state.modifiedEnvVal;
    this.sendPayload(application.id, vars);
  }

  sendPayload(appId, vars) {
    fetch(`${window.location.protocol}//${window.location.hostname}/v1/applications/${appId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ env_vars: { ...vars } }),
    })
    .then(() => this.setState({
      envKey: '',
      envValue: '',
    }))
    .then(() => window.location.reload());
  }

  render() {
    const { application, pathname } = this.props;

    return (
      <Page pathname={pathname}>
        <TopNav appId={application.id} pathname={pathname} />

        <SectionHeader title="Add Environment Variable" />
        <div className="add-env-wrapper">
          <input
            className="env-input"
            onChange={e => this.setState({ envKey: e.target.value })}
            placeholder="key"
            type="text"
            value={this.state.envKey}
          />
          <input
            className="env-input"
            onChange={e => this.setState({ envValue: e.target.value })}
            placeholder="value"
            type="text"
            value={this.state.envValue}
          />
          <button
            className="btn blue"
            onClick={() => this.addEnvVar()}
          >Add</button>
        </div>

        {Object.keys(application.env_vars).length > 0 && (
          <section className="tag-wrapper">
            <SectionHeader title={`${application.id} Environment Variables`} />
            <div className="list-header">
              <p>Key</p>
              <p>Value</p>
            </div>
            {Object.keys(application.env_vars).map((envVar) => {
              if (this.state.editingVar === envVar) {
                return (
                  <EnvironmentVariableListItemEdit
                    cancelBtnFunc={() => this.setState({ editingVar: false })}
                    changeKeyFunc={e => this.setState({ modifiedEnvKey: e.target.value })}
                    changeValFunc={e => this.setState({ modifiedEnvVal: e.target.value })}
                    envKey={this.state.modifiedEnvKey}
                    envValue={this.state.modifiedEnvVal}
                    key={`env-edit-${envVar}`}
                    updateBtnFunc={() => this.updateEnvVar()}
                  />
                );
              }
              return (
                <EnvironmentVariableListItem
                  deleteVar={() => this.deleteEnvVar(envVar)}
                  editVar={() => this.setState({
                    editingVar: envVar,
                    modifiedEnvKey: envVar,
                    modifiedEnvVal: application.env_vars[envVar],
                  })}
                  key={`env-${envVar}`}
                  envKey={envVar}
                  envValue={application.env_vars[envVar]}
                />
              );
            })}
          </section>
        )}

        <style jsx>{`
          .add-env-wrapper {
            display: flex;
            align-items: center;
            margin-top: 2rem;
          }
          .add-env-wrapper .env-input {
            width: 33rem;
            margin-right: 2rem;
            font-size: 1.5rem;
          }
          .add-env-wrapper .btn {
            width: 20rem;
          }

          .list-header {
            display: flex;
            margin-left: 2rem;
            margin-top: 1rem;
          }
          .list-header p {
            width: 35rem;
            font-size: 1.2rem;
            color: #bfbfbf;
            margin: 0;
          }
        `}</style>
      </Page>
    );
  }
}

ApplicationEnvVars.propTypes = {
  application: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
};
