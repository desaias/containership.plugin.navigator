import React, { PropTypes, PureComponent } from 'react';
import 'isomorphic-fetch';

import { Link } from '../routes';

import Page from '../layouts/main';

import ApplicationLink from '../components/ApplicationLink';
import SectionHeader from '../components/SectionHeader';

export default class Applications extends PureComponent {
  static async getInitialProps({ pathname, req }) {
    const res = await fetch('http://198.199.69.61/v1/applications');
    const json = await res.json();
    return {
      applications: Object.values(json),
      pathname: (req && req.url) || pathname,
    };
  }

  render() {
    const { applications, pathname } = this.props;
    const coreApps = applications.filter(app => (
      Object.prototype.hasOwnProperty.call(app, 'tags') &&
      Object.prototype.hasOwnProperty.call(app.tags, 'metadata') &&
      Object.prototype.hasOwnProperty.call(app.tags.metadata, 'ancestry') &&
      app.tags.metadata.ancestry === 'containership.plugin'
    ));

    const coreAppIDs = coreApps.map(app => app.id);
    const userApps = applications.filter(app => coreAppIDs.indexOf(app.id) === -1);

    return (
      <Page pathname={pathname}>
        <div className="top-nav">
          <Link prefetch route="addApplication"><a className="btn blue">Add Application</a></Link>
        </div>

        {userApps.length > 0 && (
          <section className="application-wrapper">
            <SectionHeader title="User Applications" />
            <div className="list-header">
              <p>App IP</p>
              <p>Containers</p>
              <p>Max CPU Usage</p>
              <p>Max Memory Usage</p>
            </div>
            <section>
              {userApps.map(app => (
                <ApplicationLink
                  key={`app-id-${app.id}`}
                  appId={app.id}
                  containerCount={app.containers.length}
                  containersLoaded={app.containers.filter(a => a.status === 'loaded').length}
                  cpus={app.cpus * app.containers.length}
                  memory={app.memory * app.containers.length}
                  userApp
                />
              ))}
            </section>
          </section>
        )}
        <section className="application-wrapper">
          <SectionHeader title="Core Applications" />
          <div className="list-header">
            <p>App IP</p>
            <p>Containers</p>
            <p>Max CPU Usage</p>
            <p>Max Memory Usage</p>
          </div>
          <section>
            {coreApps.map(app => (
              <ApplicationLink
                key={`app-id-${app.id}`}
                appId={app.id}
                containerCount={app.containers.length}
                containersLoaded={app.containers.filter(a => a.status === 'loaded').length}
                cpus={app.cpus * app.containers.length}
                memory={app.memory * app.containers.length}
              />
            ))}
          </section>
        </section>

        <style jsx>{`
          .top-nav {
            margin-top: 2rem;
          }

          .list-header {
            display: flex;
            margin-left: 2.2rem;
            margin-top: 1rem;
          }
          .list-header p {
            width: 20rem;
            font-size: 1.2rem;
            color: #bfbfbf;
            margin: 0;
            text-align: center;
          }

          .list-header p:first-of-type {
            text-align: left;
            width: 30rem;
          }

        `}</style>
      </Page>
    );
  }
}

Applications.propTypes = {
  applications: PropTypes.array,
  pathname: PropTypes.string,
};
