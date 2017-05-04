import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';

import { Link } from '../routes';

import Page from '../layouts/main';
import TopNav from '../components/TopNavAppDetail';
import SectionHeader from '../components/SectionHeader';

import vars from '../styles/vars';

class ApplicationsDetail extends PureComponent {
  static async getInitialProps({ pathname, req, query }) {
    let res;
    if (process.browser) {
      res = await fetch(`${window.location.origin}/v1/applications/${query.id}`);
    } else {
      res = await fetch(`http://127.0.0.1/v1/applications/${query.id}`);
    }
    const json = await res.json();
    return {
      application: { ...json },
      pathname: (req && req.url) || pathname,
    };
  }

  render() {
    const { application, pathname } = this.props;

    const respawn = application.respawn ? 'true' : 'false';
    const privileged = application.privileged ? 'true' : 'false';

    return (
      <Page pathname={pathname}>
        <TopNav
          appId={application.id}
          pathname={pathname}
        />

        <SectionHeader title={`${application.id} Details`} />
        <section>
          <div className="app-detail">
            <p>Containers</p>
            {(application.containers.length === 0 && (
              <p>No Containers Running: <Link route="applicationContainers" params={{ id: application.id }}>
                <a className="link">Scale Containers</a>
              </Link></p>
            )) || (
              <p>{application.containers.length}</p>
            )}
          </div>

          <div className="app-detail">
            <p>Discovery Port</p>
            <p>{application.discovery_port}</p>
          </div>
          <div className="app-detail">
            <p>Image</p>
            <p>{application.image}</p>
          </div>
          <div className="app-detail">
            <p>Command</p>
            <p>{application.command}</p>
          </div>
          <div className="app-detail">
            <p>Engine</p>
            <p>{application.engine}</p>
          </div>
          <div className="app-detail">
            <p>Networking Mode</p>
            <p>{application.network_mode}</p>
          </div>
          <div className="app-detail">
            <p>Container Port</p>
            <p>{application.container_port}</p>
          </div>
          <div className="app-detail">
            <p>CPUs</p>
            <p>{application.cpus}</p>
          </div>
          <div className="app-detail">
            <p>Memory</p>
            <p>{application.memory}</p>
          </div>
          <div className="app-detail">
            <p>Respawn</p>
            <p>{respawn}</p>
          </div>
          <div className="app-detail">
            <p>Privileged</p>
            <p>{privileged}</p>
          </div>
        </section>

        <style jsx>{`
          .app-detail {
            display: flex;
            border-bottom: 1px solid #e8e8e8;
            padding-left: 1rem;
            align-items: center;
            height: 4rem;
          }

          .app-detail:last-of-type {
            border-bottom: 0;
          }

          .app-detail p:first-of-type {
            width: 20rem;
          }

          .app-detail p:last-of-type {
            font-weight: lighter;
          }

          p {
            font-size: 1.5rem;
          }
          .link {
            color: ${vars.lightBlue};
          }
        `}</style>
      </Page>
    );
  }

}

ApplicationsDetail.propTypes = {
  application: PropTypes.object,
  pathname: PropTypes.string,
};

export default ApplicationsDetail;
