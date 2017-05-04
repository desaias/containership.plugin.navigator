import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';

import Page from '../layouts/main';
import ContainerDetails from '../components/ContainerDetails';
import NumberStepper from '../components/NumberStepper';
import SectionHeader from '../components/SectionHeader';
import TopNav from '../components/TopNavAppDetail';

export default class ApplicationContainers extends PureComponent {
  static async getInitialProps({ pathname, req, query }) {
    let res;
    let cs;
    if (process.browser) {
      res = await fetch(`${window.location.protocol}//${window.location.hostname}/v1/applications/${query.id}`);
      cs = await fetch(`${window.location.protocol}//${window.location.hostname}/v1/cluster/state`);
    } else {
      res = await fetch(`http://127.0.0.1/v1/applications/${query.id}`);
      cs = await fetch(`http://127.0.0.1/v1/cluster/state`);
    }
    const json = await res.json();
    const csJson = await cs.json();
    return {
      hosts: Object.values(csJson.hosts),
      application: { ...json },
      pathname: (req && req.url) || pathname,
    };
  }

  constructor() {
    super();
    this.state = {
      modifiedContainerCount: false,
    };
  }

  prepareContainerCount(newCount) {
    if (newCount < 0) {
      return false;
    }
    return this.setState({
      modifiedContainerCount: newCount,
    });
  }

  deleteContainer(containerId) {
    const { application } = this.props;
    fetch(`${window.location.protocol}//${window.location.hostname}/v1/applications/${application.id}/containers/${containerId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => window.location.reload());
  }

  scaleContainers(diff) {
    const { application } = this.props;
    const method = diff > 0 ? 'POST' : 'DELETE';
    const count = diff > 0 ? diff : diff * -1;

    fetch(`${window.location.protocol}//${window.location.hostname}/v1/applications/${application.id}/containers?count=${count}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error updating containers');
      }
      return true;
    })
    .then(() => {
      window.location.reload();
    });
  }

  render() {
    const { application, hosts, pathname } = this.props;

    // number stepper stuff
    const modifiedCount = this.state.modifiedContainerCount !== false &&
      this.state.modifiedContainerCount >= 0 ?
      this.state.modifiedContainerCount :
      application.containers.length;

    const diff = modifiedCount - application.containers.length;
    let scaleBtnClasses = 'btn disabled';
    let scaleBtnTxt = 'Add Containers';
    if (diff === 0) {
      scaleBtnClasses = 'btn disabled';
      scaleBtnTxt = 'Add Containers';
    }
    if (diff > 0) {
      scaleBtnClasses = 'btn blue';
      scaleBtnTxt = diff > 1 ? `Add ${diff} Containers` : 'Add 1 Container';
    }
    if (diff < 0) {
      scaleBtnClasses = 'btn red';
      scaleBtnTxt = diff < -1 ? `Remove ${diff * -1} Containers` : 'Remove 1 Container';
    }


    return (
      <Page pathname={pathname}>
        <TopNav appId={application.id} pathname={pathname} />

        <SectionHeader title={`Scale ${application.id} Containers`} />
        <section className="scw">
          <div className="step-wrapper">
            <NumberStepper
              changeCallback={newCount => this.prepareContainerCount(newCount)}
              quantity={modifiedCount}
            />
          </div>
          {diff !== 0 && (
            <button
              className={scaleBtnClasses}
              onClick={() => this.scaleContainers(diff)}
            >{scaleBtnTxt}</button>
          )}
        </section>

        {application.containers.length > 0 && (
          <div>
            <SectionHeader title={`${application.id} Containers`} />
            <section className="cw">
              <div className="list-header">
                <p className="container-id">Container ID</p>
                <p className="container-status">Status</p>
                <p className="container-host">Host IP</p>
                <p className="container-port">Host Port</p>
                <p className="random-port">Random Port</p>
                <p className="start-time">Start Time</p>
              </div>
              {application.containers.map((container) => {
                const containerHost = hosts.find(host => host.id === container.host);
                return (
                  <ContainerDetails
                    key={container.id}
                    containerId={container.id}
                    deleteContainer={() => this.deleteContainer(container.id)}
                    host={container.status === 'loaded' ? containerHost.address.public : ''}
                    hostPort={container.status === 'loaded' ? container.host_port : ''}
                    randomHostPort={container.random_host_port}
                    startTime={container.start_time}
                    status={container.status}
                  />
                );
              })}
            </section>
          </div>
        )}

        <style jsx>{`
          .scw {
            display: flex;
            margin-top: 4rem;
            align-items: center;
          }
          .scw .btn {
            width: 30rem;
          }
          .step-wrapper {
            width: 30rem;
            margin-right: 2rem;
          }

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

ApplicationContainers.propTypes = {
  application: PropTypes.object,
  hosts: PropTypes.array,
  pathname: PropTypes.string,
};
