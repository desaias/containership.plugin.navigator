import React, { PropTypes, PureComponent } from 'react';
import { flatten } from 'flat';
import 'isomorphic-fetch';

import Page from '../layouts/main';
import TopNav from '../components/TopNavAppDetail';
import SectionHeader from '../components/SectionHeader';

import vars from '../styles/vars';

export default class ApplicationTags extends PureComponent {
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
    this.state = {
      partition: null,
      partitionChanged: false,
    };
  }

  setHostTag(tag) {
    console.log(tag);
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
        <TopNav appId={application.id} pathname={pathname} />
        <SectionHeader title={`${application.id} Tags`} />
        <section className="constraint host-tags">
          <p>Host Tags</p>
          <div className="step-wrapper">
            {hostTags.map((tag, index) => (
              <div key={tag.value}>
                <input
                  checked={this.state.partition === tag.value}
                  className="checkbox-custom"
                  id={tag.value}
                  name={`checkbox-${tag.value}`}
                  onChange={e => this.setHostTag(e.target.value, index)}
                  type="checkbox"
                  value={tag.value}
                />
                <label htmlFor={tag.value} className="checkbox-custom-label">{tag.label}</label>
              </div>
            ))}
          </div>
          {this.state.partitionChanged && (
            <button
              className="btn blue"
              onClick={() => console.log('boom')}
            >Update Partition</button>
          )}
        </section>
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
          .constraint.host-tags {
            align-items: flex-start;
            height: auto;
          }
          .constraint p {
            width: 10rem;
            font-size: 1.5rem;
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

ApplicationTags.propTypes = {
  application: PropTypes.object,
  hosts: PropTypes.array,
  pathname: PropTypes.string,
};
