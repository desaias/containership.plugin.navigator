import React, { PropTypes, PureComponent } from 'react';
import 'isomorphic-fetch';

import { API } from '../utils/config';

import Page from '../layouts/main';
import ContainerDetails from '../components/ContainerDetails';
import TopNav from '../components/TopNavHostDetail';
import SectionHeader from '../components/SectionHeader';

export default class HostContainers extends PureComponent {
  static async getInitialProps({ pathname, req, query }) {
    const res = await fetch(`${API}/hosts/${query.id}`);
    const json = await res.json();
    return {
      host: { ...json },
      pathname: (req && req.url) || pathname,
    };
  }

  static deleteContainer(applicationId, containerId) {
    fetch(`${API}/applications/${applicationId}/containers/${containerId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => window.location.reload());
  }

  render() {
    const { host, pathname } = this.props;

    return (
      <Page pathname={pathname}>
        <TopNav hostId={host.id} isFollower={host.mode === 'follower'} pathname={pathname} />

        {host.containers.length > 0 && (
          <div>
            <SectionHeader title={`Containers: ${host.id}`} />
            <section className="cw">
              <div className="list-header">
                <p className="container-id">Application</p>
                <p className="container-status">Status</p>
                <p className="container-host">Host IP</p>
                <p className="container-port">Host Port</p>
                <p className="random-port">Random Port</p>
                <p className="start-time">Start Time</p>
              </div>
              {host.containers.map(container => (
                <ContainerDetails
                  key={container.id}
                  application={container.application}
                  deleteContainer={() => this.deleteContainer(container.application, container.id)}
                  host={container.status === 'loaded' ? host.address.public : ''}
                  hostContainer
                  hostPort={container.status === 'loaded' ? container.host_port : ''}
                  randomHostPort={container.random_host_port}
                  startTime={container.start_time}
                  status={container.status}
                />
              ))}
            </section>
          </div>
        )}
        <style jsx>{`
          .list-header {
            display: flex;
            margin-left: 2.2rem;
            margin-top: 1rem;
          }
          .list-header p {
            font-size: 1.2rem;
            color: #bfbfbf;
            margin: 0 2rem 0 0;
          }

          .list-header .container-id {
            width: 25rem;
            margin-right: 1.5rem;
          }

          .list-header .container-status {
            width: 10rem;
          }
          .list-header .container-host {
            width: 15rem;
          }

          .list-header .container-port {
            width: 12rem;
          }

          .list-header .random-port {
            width: 15rem;
          }

          .list-header .start-time {
            width: 15rem;
          }
        `}</style>
      </Page>
    );
  }
}

HostContainers.propTypes = {
  host: PropTypes.object,
  pathname: PropTypes.string,
};
