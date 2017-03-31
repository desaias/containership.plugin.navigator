import React, { PropTypes, PureComponent } from 'react';
import { flatten, unflatten } from 'flat';
import 'isomorphic-fetch';

import Page from '../layouts/main';
import NumberStepper from '../components/NumberStepper';
import SectionHeader from '../components/SectionHeader';
import TopNav from '../components/TopNavAppDetail';

import vars from '../styles/vars';

export default class ApplicationConstraints extends PureComponent {
  static async getInitialProps({ pathname, req, query }) {
    const res = await fetch(`http://198.199.69.61/v1/applications/${query.id}`);
    const json = await res.json();
    const cs = await fetch('http://198.199.69.61/v1/cluster/state');
    const csJson = await cs.json();
    return {
      application: { ...json },
      hosts: Object.values(csJson.hosts),
      pathname: (req && req.url) || pathname,
    };
  }

  constructor() {
    super();
    this.changePerHostCount = this.changePerHostCount.bind(this);
    this.changeMinimumCount = this.changeMinimumCount.bind(this);
    this.updateHostTags = this.updateHostTags.bind(this);

    this.state = {
      hostTags: [],
      hostTagsChanged: false,
      partition: null,
      partitionChanged: false,
      perHostCount: 0,
      perHostChanged: false,
      predefinedKey: null,
      predefinedValue: null,
      maximumCount: 0,
      maximumChanged: false,
      minimumCount: 0,
      minimumChanged: false,
    };
  }

  componentDidMount() {
    const { application } = this.props;
    const tags = application.tags;

    if (tags.constraints && tags.constraints.per_host) {
      this.setInitialState('perHostCount', tags.constraints.per_host);
    }
    if (tags.constraints && tags.constraints.min) {
      this.setInitialState('minimumCount', tags.constraints.min);
    }
    if (tags.constraints && tags.constraints.max) {
      this.setInitialState('maximumCount', tags.constraints.max);
    }
    if (tags.constraints && tags.constraints.partition) {
      this.setInitialState('partition', tags.constraints.partition);
    }
    this.setInitialHostTagsState();
  }

  setInitialHostTagsState() {
    const { application } = this.props;
    const { tags } = application;
    const hostTags = Object.keys(tags);

    this.setState({
      hostTags,
    });
  }

  setPartition(value) {
    this.setState({
      partition: value,
      partitionChanged: true,
      perHostCount: 0,
      perHostChanged: false,
      predefinedKey: 'partition',
      predefinedValue: value,
      maximumCount: 0,
      maximumChanged: false,
      minimumCount: 0,
      minimumChanged: false,
    });
  }

  setInitialState(key, val) {
    this.setState({
      [key]: val,
      predefinedKey: key,
      predefinedValue: val,
    });
  }

  changePerHostCount(newCount) {
    if (newCount < 0) {
      return false;
    }
    return this.setState({
      partition: null,
      partitionChanged: false,
      perHostCount: newCount,
      perHostChanged: true,
      predefinedKey: 'per_host',
      predefinedValue: newCount,
      maximumCount: 0,
      maximumChanged: false,
      minimumCount: 0,
      minimumChanged: false,
    });
  }

  changeMinimumCount(newCount) {
    if (newCount < 0) {
      return false;
    }
    return this.setState({
      partition: null,
      partitionChanged: false,
      perHostCount: 0,
      perHostChanged: false,
      predefinedKey: 'min',
      predefinedValue: newCount,
      maximumCount: 0,
      maximumChanged: false,
      minimumCount: newCount,
      minimumChanged: true,
    });
  }

  changeMaximumCount(newCount) {
    if (newCount < 0) {
      return false;
    }
    return this.setState({
      partition: null,
      partitionChanged: false,
      perHostCount: 0,
      perHostChanged: false,
      predefinedKey: 'max',
      predefinedValue: newCount,
      maximumCount: newCount,
      maximumChanged: true,
      minimumCount: 0,
      minimumChanged: false,
    });
  }

  saveConstraint(key, val, isPredefined) {
    const { application } = this.props;
    const tags = application.tags;

    // delete any existing predefined constraints if updating
    if (isPredefined && Object.prototype.hasOwnProperty.call(application.tags, 'constraints')) {
      delete tags.constraints;
    }

    // if udpating a predefined constraint to 0, it should delete it
    if (key.startsWith('constraints') && val === 0) {
      return this.deleteConstraint(key);
    }

    const flatTags = flatten(tags);
    const updatedFlat = unflatten({
      ...flatTags,
      ...{ [key]: (/^\d+$/.test(val)) ? parseInt(val, 10) : val },
    });

    return this.pushNewConstraints(updatedFlat);
  }

  deleteConstraint(key) {
    const { application } = this.props;
    const flatTags = flatten(application.tags);
    delete flatTags[key];
    const updatedFlat = unflatten(flatTags);
    this.pushNewConstraints(updatedFlat);
  }

  pushNewConstraints(tags) {
    const { application } = this.props;
    fetch(`http://198.199.69.61/v1/applications/${application.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags,
      }),
    })
    .then(res => res.json())
    .then(() => window.location.reload());
  }


  updateHostTags(tag) {
    const existing = this.state.hostTags.indexOf(tag);
    if (existing === -1) {
      this.setState({
        hostTags: this.state.hostTags.concat([tag]),
        hostTagsChanged: true,
      });
    }

    if (existing > -1) {
      const hostTags = this.state.hostTags.slice();
      hostTags.splice(existing, 1);
      this.setState({
        hostTags,
        hostTagsChanged: true,
      });
    }
  }

  putHostTags() {
    const { application, hosts } = this.props;
    const { tags } = application;
    const followerHosts = hosts.filter(host => host.mode === 'follower');
    const followerHostTags = flatten(Object.assign({}, ...(followerHosts.map(host => host.tags))));
    const appTags = {};
    if (this.state.hostTags.length) {
      this.state.hostTags.map((tag) => {
        if (tag === 'constraints') {
          appTags.constraints = Object.assign({}, tags.constraints);
        }
        if (tag !== 'constraints') {
          appTags[tag] = followerHostTags[tag];
        }
        return true;
      });
    }

    fetch(`http://198.199.69.61/v1/applications/${application.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tags: appTags }),
    })
    .then(res => res.json())
    .then(() => window.location.reload());
  }

  render() {
    const { application, hosts, pathname } = this.props;
    const followerHosts = hosts.filter(host => host.mode === 'follower');
    const followerHostTags = flatten(Object.assign({}, ...(followerHosts.map(host => host.tags))));
    const hostTags = Object.keys(followerHostTags).map(tag => ({
      label: tag,
      value: tag,
    }));

    return (
      <Page pathname={pathname}>
        <div>
          <TopNav appId={application.id} pathname={pathname} />
          <SectionHeader title={`${application.id} Constraints`} />

          <section className="constraint per-host">
            <p>Per Host</p>
            <div className="step-wrapper">
              <NumberStepper
                changeCallback={newCount => this.changePerHostCount(newCount)}
                quantity={this.state.perHostCount}
              />
            </div>
            {this.state.perHostChanged && (
              <button
                className="btn blue"
                onClick={() => this.saveConstraint('constraints.per_host', this.state.predefinedValue, true)}
              >Update Per Host</button>
            )}
          </section>

          <section className="constraint minimum">
            <p>Minimum</p>
            <div className="step-wrapper">
              <NumberStepper
                changeCallback={newCount => this.changeMinimumCount(newCount)}
                quantity={this.state.minimumCount}
              />
            </div>
            {this.state.minimumChanged && (
              <button
                className="btn blue"
                onClick={() => this.saveConstraint('constraints.min', this.state.predefinedValue, true)}
              >Update Minimum</button>
            )}
          </section>

          <section className="constraint maximum">
            <p>Maximum</p>
            <div className="step-wrapper">
              <NumberStepper
                changeCallback={newCount => this.changeMaximumCount(newCount)}
                quantity={this.state.maximumCount}
              />
            </div>
            {this.state.maximumChanged && (
              <button
                className="btn blue"
                onClick={() => this.saveConstraint('constraints.max', this.state.predefinedValue, true)}
              >Update Maximum</button>
            )}
          </section>

          <section className="constraint partition">
            <p>Partition</p>
            <div className="step-wrapper">
              {hostTags.map((tag, index) => (
                <div key={`partition-${tag.value}`}>
                  <input
                    checked={this.state.partition === tag.value}
                    className="checkbox-custom"
                    id={`partition-${tag.value}`}
                    name={`checkbox-${tag.value}`}
                    onChange={e => this.setPartition(e.target.value, index)}
                    type="checkbox"
                    value={tag.value}
                  />
                  <label htmlFor={`partition-${tag.value}`} className="checkbox-custom-label">{tag.label}</label>
                </div>
              ))}
            </div>
            {this.state.partitionChanged && (
              <button
                className="btn blue"
                onClick={() => this.saveConstraint('constraints.partition', this.state.predefinedValue, true)}
              >Update Partition</button>
            )}
          </section>

          <section className="constraint host-tag">
            <p>Host Tag</p>
            <div className="step-wrapper">
              {hostTags.map((tag) => {
                const hostTagSelected = this.state.hostTags.indexOf(tag.value) !== -1;

                return (
                  <div key={`host-tag-${tag.value}`}>
                    <input
                      checked={hostTagSelected}
                      className="checkbox-custom"
                      id={`host-tag-${tag.value}`}
                      name={`checkbox-${tag.value}`}
                      onChange={e => this.updateHostTags(e.target.value)}
                      type="checkbox"
                      value={tag.value}
                    />
                    <label htmlFor={`host-tag-${tag.value}`} className="checkbox-custom-label">{tag.label}</label>
                  </div>
                );
              })}
            </div>
            {this.state.hostTagsChanged && (
              <button
                className="btn blue"
                onClick={() => this.putHostTags()}
              >Update Host Tags</button>
            )}
          </section>
        </div>


        <style jsx>{`
          .constraint {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e8e8e8;
            padding: 2rem;
            height: 9rem;
          }
          .constraint:last-of-type {
            border-bottom: 0;
          }
          .constraint.partition,
          .constraint.host-tag {
            align-items: flex-start;
            height: auto;
          }
          .constraint p {
            width: 10rem;
            font-size: 1.5rem;
          }
          .constraint .step-wrapper {
            width: 35rem;
            margin-right: 2rem;
          }
          .constraint .btn {
            width: 21rem;
          }


          .checkbox-custom {
            opacity: 0;
            position: absolute;
          }
          .checkbox-custom, .checkbox-custom-label {
            display: flex;
            align-items: center;
            margin: .5rem 0;
            cursor: pointer;
          }
          .checkbox-custom-label {
            position: relative;
          }
          .checkbox-custom + .checkbox-custom-label:before {
            content: '';
            background: #fff;
            border: 2px solid #e8e8e8;
            display: inline-block;
            vertical-align: middle;
            width: 25px;
            height: 25px;
            padding: 2px;
            margin-right: 10px;
            text-align: center;
            transition-property: all;
            transition: cubic-bezier(.17,.67,.83,.67) 150ms;
          }
          .checkbox-custom:hover + .checkbox-custom-label:before {
            border: 2px solid ${vars.lightBlue};
          }
          .checkbox-custom:checked + .checkbox-custom-label:before {
            background: ${vars.lightBlue};
            border: 2px solid ${vars.lightBlue};
          }
          .checkbox-custom:focus + .checkbox-custom-label {
            outline: 0px;
          }
        `}</style>
      </Page>
    );
  }
}

ApplicationConstraints.propTypes = {
  application: PropTypes.object,
  hosts: PropTypes.array,
  pathname: PropTypes.string,
};
