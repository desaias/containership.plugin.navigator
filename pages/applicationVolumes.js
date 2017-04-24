import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';

import { API } from '../utils/config';

import Page from '../layouts/main';
import Checkbox from '../components/Checkbox';
import SectionHeader from '../components/SectionHeader';
import TopNav from '../components/TopNavAppDetail';
import VolumeListItem from '../components/VolumeListItem';
import VolumeListItemEdit from '../components/VolumeListItemEdit';

export default class ApplicationVolumes extends PureComponent {
  static async getInitialProps({ pathname, req, query }) {
    const res = await fetch(`${API}/applications/${query.id}`);
    const json = await res.json();
    return {
      application: { ...json },
      pathname: (req && req.url) || pathname,
    };
  }

  constructor() {
    super();
    this.state = {
      changeContainerPath: false,
      changeHostPath: false,
      editVolumeHostManaged: false,
      editingVolume: false,
      hostManaged: true,
      containerPath: '',
      hostPath: '',
    };
  }

  updatePath(path, value) {
    const slashedValue = value !== '' && value.charAt(0) !== '/' ? `/${value}` : value;
    return this.setState({ [path]: slashedValue });
  }

  addVolume() {
    const { application } = this.props;
    const newVol = {};
    newVol.container = this.state.containerPath;
    if (this.state.hostPath !== '') {
      newVol.host = this.state.hostPath;
    }
    const volumes = [
      ...application.volumes,
      { ...newVol },
    ];
    this.sendPayload(application.id, volumes);
  }

  editVolume(volume) {
    this.setState({
      editingVolume: volume.container,
      editVolumeHostManaged: volume.host === undefined,
      changeContainerPath: volume.container,
      changeHostPath: volume.host,
    });
  }

  deleteVolume(container) {
    const { application } = this.props;
    const volumes = application.volumes.filter(vol => vol.container !== container);
    this.sendPayload(application.id, volumes);
  }

  updateVolume() {
    const { application } = this.props;
    const volumes = application.volumes.slice();
    volumes.map((vol, index) => {
      if (vol.container === this.state.editingVolume) {
        volumes[index].container = this.state.changeContainerPath;
        if (this.state.changeHostPath === '' || this.state.changeHostPath === undefined) {
          delete volumes[index].host;
        } else {
          volumes[index].host = this.state.changeHostPath;
        }
      }
      return vol;
    });
    this.sendPayload(application.id, volumes);
  }

  sendPayload(appId, volumes) {
    fetch(`${API}/applications/${appId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ volumes }),
    })
    .then(() => this.setState({
      containerPath: '',
      hostPath: '',
    }))
    .then(() => window.location.reload());
  }

  render() {
    const { application, pathname } = this.props;
    // console.log(application);
    const hostPathPlaceholder = this.state.hostManaged ? 'Managed by ContainerShip' : 'Host Path';
    return (
      <Page pathname={pathname}>
        <TopNav appId={application.id} pathname={pathname} />

        <SectionHeader title="Add Volume" />
        <div className="add-vol-wrapper">
          <input
            className="vol-input"
            onChange={e => this.updatePath('containerPath', e.target.value)}
            placeholder="Container Path"
            type="text"
            value={this.state.containerPath}
          />
          <input
            className="vol-input"
            onChange={e => this.updatePath('hostPath', e.target.value)}
            placeholder={hostPathPlaceholder}
            readOnly={this.state.hostManaged}
            type="text"
            value={this.state.hostPath}
          />
          <button
            className="btn blue"
            onClick={() => this.addVolume()}
          >Add</button>
        </div>

        <div className="managed-host-path">
          <Checkbox
            changeFunc={() => this.setState({
              hostManaged: !this.state.hostManaged,
              hostPath: '',
            })}
            isChecked={this.state.hostManaged}
            labelText="Let Containership manage your host path."
            name="cs-managed-host"
          />
        </div>

        {application.volumes.length > 0 && (
          <section className="tag-wrapper">
            <SectionHeader title={`${application.id} Volumes`} />
            <div className="list-header">
              <p>Container Path</p>
              <p>Host Path</p>
            </div>
            {application.volumes.map((volume) => {
              if (this.state.editingVolume === volume.container) {
                const hostText = !this.state.editVolumeHostManaged ?
                  this.state.changeHostPath !== undefined ? this.state.changeHostPath : '' :
                  'Managed by ContainerShip';

                return (
                  <VolumeListItemEdit
                    key={`edit-volume-${volume.container}`}
                    cancelFunc={() => this.setState({ editingVolume: false })}
                    changeContainerPath={e => this.updatePath('changeContainerPath', e.target.value)}
                    changeHostPath={e => this.updatePath('changeHostPath', e.target.value)}
                    container={this.state.changeContainerPath}
                    editHostManagedState={this.state.editVolumeHostManaged}
                    host={hostText}
                    hostManaged={volume.host !== undefined}
                    toggleEditHostManaged={() => this.setState({
                      editVolumeHostManaged: !this.state.editVolumeHostManaged,
                      changeHostPath: '',
                    })}
                    updateFunc={() => this.updateVolume()}
                  />
                );
              }
              return (
                <VolumeListItem
                  deleteVolume={() => this.deleteVolume(volume.container)}
                  editVolume={() => this.editVolume(volume)}
                  isEditing={this.state.editingVolume === volume.container}
                  key={`volume-${volume.container}`}
                  container={volume.container}
                  host={volume.host || 'Managed by ContainerShip'}
                />
              );
            })}
          </section>
        )}

        <style jsx>{`
          .add-vol-wrapper {
            display: flex;
            align-items: center;
            margin-top: 2rem;
          }
          .add-vol-wrapper .vol-input {
            width: 33rem;
            margin-right: 2rem;
            font-size: 1.5rem;
          }
          .add-vol-wrapper .btn {
            width: 20rem;
          }

          .managed-host-path {
            width: 35rem;
            margin-left: 35rem;
          }

          .list-header {
            display: flex;
            margin-left: 2rem;
            margin-top: 1rem;
          }
          .list-header p {
            width: 35rem;
            font-size: 1.2rem;
            color: #bfbfbf;
            margin: 0;
          }
        `}</style>
      </Page>
    );
  }
}

ApplicationVolumes.propTypes = {
  application: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
};
