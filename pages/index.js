import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';

import { API } from '../utils/config';

import Page from '../layouts/main';

import OverviewBox from '../components/OverviewBox';
import SectionHeader from '../components/SectionHeader';

import { formatMemory } from '../utils/helpers';

export default class Overview extends PureComponent {
  static async getInitialProps({ pathname, req }) {
    const res = await fetch(`${API}/cluster/state`);
    const json = await res.json();
    return {
      applications: Object.values(json.applications),
      hosts: Object.values(json.hosts),
      pathname: (req && req.url) || pathname,
    };
  }

  render() {
    const {
      applications,
      hosts,
      pathname,
    } = this.props;

    const leaders = hosts.filter(host => host.mode === 'leader');
    const followers = hosts.filter(host => host.mode === 'follower');

    const getTotal = (sum, count) => sum + count;

    const containerCount = applications
      .map((app) => {
        if (app.containers.length === 0) {
          return 1;
        }
        return app.containers.length;
      })
      .reduce(getTotal, 0);

    const containersLoaded = applications
      .map(app => app.containers.filter(container => container.status === 'loaded'))
      .map(containers => containers.length)
      .reduce(getTotal, 0);

    const cpuCount = followers
      .map(host => host.cpus)
      .reduce(getTotal, 0);

    const memoryCount = followers
      .map(host => host.memory)
      .reduce(getTotal, 0);

    const usedCPUs = [];
    applications
      .map(app => app.containers.filter(container => container.status === 'loaded'))
      .map(containers => containers.forEach((container) => {
        if (container.status === 'loaded') {
          usedCPUs.push(container.cpus);
        }
      }));

    const cpusUsed = usedCPUs.reduce(getTotal, 0);

    const usedMemory = [];
    applications
      .map(app => app.containers.filter(container => container.status === 'loaded'))
      .map(containers => containers.forEach((container) => {
        if (container.status === 'loaded') {
          usedMemory.push(container.memory);
        }
      }));
    const memoryUsed = usedMemory.reduce(getTotal, 0);

    const coreApps = applications.filter(app => (
      Object.prototype.hasOwnProperty.call(app, 'tags') &&
      Object.prototype.hasOwnProperty.call(app.tags, 'metadata') &&
      Object.prototype.hasOwnProperty.call(app.tags.metadata, 'ancestry') &&
      app.tags.metadata.ancestry === 'containership.plugin'
    ));

    const leaderText = leaders.length > 1 || leaders.length === 0 ? `${leaders.length} Leaders` : '1 Leader';
    const followerText = followers.length > 1 || followers.length === 0 ? `${followers.length} Followers` : '1 Follower';
    const hostMeta = `${leaderText} | ${followerText}`;
    const userApps = applications.length - coreApps.length;
    const appMeta = `${userApps} User | ${coreApps.length} Core`;
    const containersMeta = containerCount === containersLoaded ? 'All Containers Loaded' : `${containersLoaded} Containers Loaded`;

    return (
      <Page pathname={pathname}>

        <SectionHeader title="Cluster Overview" />
        <section className="overview-wrapper">
          <OverviewBox
            title="Hosts"
            count={hosts.length}
            meta={hostMeta}
          />
          <OverviewBox
            title="Applications"
            count={applications.length}
            meta={appMeta}
          />
          <OverviewBox
            title="App Containers"
            count={containerCount}
            meta={containersMeta}
          />
          <OverviewBox
            title="Total CPUs"
            count={cpuCount}
            meta={`${cpusUsed.toFixed(2)} Used`}
          />
          <OverviewBox
            title="Total Memory"
            count={formatMemory(memoryCount / 1024 / 1024)}
            meta={`${formatMemory(memoryUsed)} Used`}
          />
        </section>

        <style jsx>{`
          h2 {
            font-weight: normal;
          }
          .overview-wrapper {
            display: flex;
            flex-wrap: wrap;
          }
        `}</style>
      </Page>
    );
  }
}

Overview.propTypes = {
  applications: PropTypes.array,
  hosts: PropTypes.array,
  pathname: PropTypes.string,
};
