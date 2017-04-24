import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CopyToClipboard from 'react-copy-to-clipboard';
import 'isomorphic-fetch';

import { API } from '../utils/config';

import Page from '../layouts/main';
import SectionHeader from '../components/SectionHeader';
import TopNav from '../components/TopNavHostDetail';

export default class HostsDetail extends PureComponent {
  static async getInitialProps({ pathname, req, query }) {
    const res = await fetch(`${API}/hosts/${query.id}`);
    const json = await res.json();
    return {
      host: { ...json },
      pathname: (req && req.url) || pathname,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isPrivateCopied: false,
      isPublicCopied: false,
    };
  }

  render() {
    const { host, pathname } = this.props;
    const publicButtonText = (this.state.isPublicCopied) ? 'Copied' : 'Copy Public IP';
    const privateButtonText = (this.state.isPrivateCopied) ? 'Copied' : 'Copy Private IP';


    let hostModeText = 'Follower';
    if (!host.praetor.leader && host.praetor.leader_eligible) {
      hostModeText = 'Standby Leader';
    }
    if (host.praetor.leader && host.praetor.leader_eligible) {
      hostModeText = 'Controlling Leader';
    }

    return (
      <Page pathname={pathname}>
        <TopNav hostId={host.id} isFollower={host.mode === 'follower'} pathname={pathname} />

        <SectionHeader title={`Host Detail: ${host.host_name || host.id}`} />
        <section>
          <div className="host-detail">
            <p>Containership Version</p>
            <p>{host.metadata.containership.version}</p>
          </div>
          <div className="host-detail">
            <p>Host ID</p>
            <p>{host.id}</p>
          </div>
          <div className="host-detail">
            <p>Host Name</p>
            <p>{host.host_name}</p>
          </div>
          <div className="host-detail">
            <p>Mode</p>
            <p>{hostModeText}</p>
          </div>
          <div className="host-detail">
            <p>Process Uptime</p>
            <p>{moment(host.start_time).utc().fromNow(true)}</p>
          </div>
          <div className="host-detail">
            <p>Private IP</p>
            <p className="ip-address">{host.address.private}</p>
            <CopyToClipboard
              text={host.address.private} onCopy={() => {
                this.setState({ isPrivateCopied: true });
                setTimeout(() => this.setState({ isPrivateCopied: false }), 1000);
              }
           }>
              <button className="btn blue copy-btn">{privateButtonText}</button>
            </CopyToClipboard>
          </div>
          <div className="host-detail">
            <p>Public IP</p>
            <p className="ip-address">{host.address.public}</p>
            <CopyToClipboard
              text={host.address.public} onCopy={() => {
                this.setState({ isPublicCopied: true });
                setTimeout(() => this.setState({ isPublicCopied: false }), 1000);
              }
           }>
              <button className="btn blue copy-btn">{publicButtonText}</button>
            </CopyToClipboard>
          </div>
          <div className="host-detail">
            <p>Region</p>
            <p>{host.tags.cloud.region}</p>
          </div>
          {host.mode === 'follower' && (
            <div>
              <div className="host-detail">
                <p>Total CPUs</p>
                <p>{host.cpus}</p>
              </div>
              <div className="host-detail">
                <p>Used CPUs</p>
                <p>{host.containers.map(container => (container.status === 'loaded' ? container.cpus : 0)).reduce((sum, count) => (
                  sum + count
                ), 0).toFixed(2)}</p>
              </div>
              <div className="host-detail">
                <p>Total Memory</p>
                <p>{`${(host.memory / 1024 / 1024).toFixed(0)} MB`}</p>
              </div>
              <div className="host-detail">
                <p>Used Memory</p>
                <p>{`${host.containers.map(container => (container.status === 'loaded' ? container.memory : 0)).reduce((sum, count) => (
                  sum + count
                ), 0)} MB`}</p>
              </div>
            </div>
          )}
        </section>

        <style jsx>{`
          .host-detail {
            display: flex;
            border-bottom: 1px solid #e8e8e8;
            padding-left: 1rem;
            align-items: center;
            height: 4rem;
          }

          .host-detail:last-of-type {
            border-bottom: 0;
          }

          .host-detail p:first-of-type {
            width: 20rem;
          }

          .host-detail p:last-of-type {
            font-weight: lighter;
          }

          p {
            font-size: 1.5rem;
          }

          .ip-address {
            width: 14rem;
          }

          .copy-btn {
            width: 18rem;
            justify-content: center;
            height: 3rem;
            letter-spacing: 0;
          }

        `}</style>
      </Page>
    );
  }
}

HostsDetail.propTypes = {
  host: PropTypes.object,
  pathname: PropTypes.string,
};
