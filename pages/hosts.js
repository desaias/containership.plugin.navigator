import React, { PropTypes, PureComponent } from 'react';
import 'isomorphic-fetch';

import { API } from '../utils/config';

import Page from '../layouts/main';
import HostLink from '../components/HostLink';
import SectionHeader from '../components/SectionHeader';

export default class Hosts extends PureComponent {
  static async getInitialProps({ pathname, req }) {
    const res = await fetch(`${API}/hosts`);
    const hosts = await res.json();
    return {
      hosts,
      pathname: (req && req.url) || pathname,
    };
  }

  render() {
    const { hosts, pathname } = this.props;

    const followers = Object.values(hosts).filter(host => host.mode === 'follower');

    // sort so controlling leader is always first
    const leaders = Object.values(hosts).filter(host => host.mode === 'leader').sort((a, b) => {
      if (a.praetor.leader && !b.praetor.leader) {
        return -1;
      }
      if (!a.praetor.leader && b.praetor.leader) {
        return 1;
      }
      return 0;
    });

    return (
      <Page pathname={pathname}>
        {leaders.length > 0 && (
          <section className="host-wrapper">
            <SectionHeader title="Leader Hosts" />
            <div className="list-header">
              <p>Public IP</p>
              <p>Start Time</p>
              <p>Last Sync</p>
              <p>Leader Mode</p>
            </div>
            {leaders.map(host => (
              <HostLink
                hostId={host.id}
                hostName={host.host_name}
                hostState={host.state}
                isLeader={host.praetor.leader}
                isLeaderType
                lastSync={host.last_sync}
                publicIP={host.address.public}
                startTime={host.start_time}
                key={host.id}
              />
            ))}
          </section>
        )}

        {followers.length > 0 && (
          <section className="host-wrapper">
            <SectionHeader title="Follower Hosts" />
            <div className="list-header">
              <p>Public IP</p>
              <p>Start Time</p>
              <p>Last Sync</p>
              <p>Host ID</p>
            </div>
            {followers.map(host => (
              <HostLink
                hostId={host.id}
                hostName={host.host_name}
                hostState={host.state}
                lastSync={host.last_sync}
                publicIP={host.address.public}
                startTime={host.start_time}
                key={host.id}
              />
            ))}
          </section>
        )}

        <style jsx>{`
          .list-header {
            display: flex;
            margin-left: 2rem;
            margin-top: 1rem;
          }
          .list-header p {
            width: 20rem;
            font-size: 1.2rem;
            color: #bfbfbf;
            margin: 0;
          }
        `}</style>
      </Page>
    );
  }
}

Hosts.propTypes = {
  hosts: PropTypes.object,
  pathname: PropTypes.string,
};
