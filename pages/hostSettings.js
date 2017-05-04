import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';

import { Router } from '../routes';

import Page from '../layouts/main';
import SectionHeader from '../components/SectionHeader';
import TopNav from '../components/TopNavHostDetail';
import ConfirmModal from '../components/ConfirmModal';

export default class HostsSettings extends PureComponent {
  static async getInitialProps({ pathname, req, query }) {
    let res;
    if (process.browser) {
      res = await fetch(`${window.location.protocol}//${window.location.hostname}/v1/hosts/${query.id}`);
    } else {
      res = await fetch(`http://127.0.0.1/v1/hosts/${query.id}`);
    }
    const json = await res.json();
    return {
      host: { ...json },
      pathname: (req && req.url) || pathname,
    };
  }

  constructor() {
    super();
    this.state = {
      modalVisible: false,
      modalConfirmText: 'DELETE',
      modalInputText: '',
    };
  }

  confirmDelete() {
    const { host } = this.props;
    if (this.state.modalConfirmText === this.state.modalInputText) {
      this.setState({ modalInputText: '', modalVisible: false });
      return fetch(`${window.location.protocol}//${window.location.hostname}/v1/hosts/${host.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error('deleting error');
        }
        return res;
      })
      .then(() => {
        Router.push('/hosts');
      });
    }
    return false;
  }

  render() {
    const { host, pathname } = this.props;

    return (
      <Page pathname={pathname}>
        <TopNav hostId={host.id} isFollower={host.mode === 'follower'} pathname={pathname} />

        <SectionHeader title="Delete Host" />
        <section className="settings-wrapper">
          <p>Are you sure you want to delete this host?
            It will be disconnected from the cluster.</p>
          <button
            className="btn red"
            onClick={() => this.setState({ modalVisible: true })}
          >Detach From Cluster</button>
        </section>

        <ConfirmModal
          changeInputFunc={e => this.setState({ modalInputText: e.target.value })}
          closeModal={() => this.setState({ modalInputText: '', modalVisible: false })}
          confirmBtnFunc={() => this.confirmDelete()}
          deleteBtnText="Confirm Delete"
          inputPlaceholder={this.state.modalConfirmText}
          inputText={this.state.modalInputText}
          isVisible={this.state.modalVisible}
          title="Delete Host"
        />

        <style jsx>{`
          .settings-wrapper {
            width: 55rem;
            margin: 2rem 0 0 0;
          }
          p {
            text-align: center;
          }
          .btn {
            margin-top: 2rem;
          }
        `}</style>
      </Page>
    );
  }
}

HostsSettings.propTypes = {
  host: PropTypes.object,
  pathname: PropTypes.string,
};
