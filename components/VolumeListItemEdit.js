import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';

const VolumeListItemEdit = ({
  cancelFunc,
  changeContainerPath,
  changeHostPath,
  container,
  editHostManagedState,
  host,
  toggleEditHostManaged,
  updateFunc,
}) => (
  <div className="tag-wrapper">
    <div className="inputs">
      <input
        className="vol-input"
        onChange={changeContainerPath}
        placeholder="Container Path"
        type="text"
        value={container}
      />
      <input
        className="vol-input"
        onChange={changeHostPath}
        placeholder="Host Path"
        readOnly={editHostManagedState}
        type="text"
        value={host}
      />
      <button
        className="btn red"
        onClick={cancelFunc}
      >Cancel</button>
      <button
        className="btn blue"
        onClick={updateFunc}
      >Update</button>
    </div>
    <div className="managed-host-path">
      <Checkbox
        changeFunc={toggleEditHostManaged}
        isChecked={editHostManagedState}
        labelText="Let Containership manage your host path."
        name="edit-managed-host"
      />
    </div>

    <style jsx>{`
      .tag-wrapper {
        display: flex;
        flex-direction: column;
        border-top: 1px solid #e8e8e8;
        height: 11rem;
        padding-left: 2rem;
        justify-content: center;
      }
      .inputs {
        display: flex;
        align-items: center;
      }
      .vol-input {
        font-size: 1.5rem;
        width: 33rem;
        margin-right: 2rem;
      }
      .btn {
        width: 10rem;
        height: 3rem;
        font-size: 1.5rem;
        margin-right: 1rem;
      }
      .managed-host-path {
        width: 35rem;
        margin-left: 35rem;
      }
    `}</style>
  </div>
);

VolumeListItemEdit.propTypes = {
  cancelFunc: PropTypes.func.isRequired,
  changeContainerPath: PropTypes.func.isRequired,
  changeHostPath: PropTypes.func.isRequired,
  container: PropTypes.string,
  editHostManagedState: PropTypes.bool,
  host: PropTypes.string,
  toggleEditHostManaged: PropTypes.func.isRequired,
  updateFunc: PropTypes.func.isRequired,
};

export default VolumeListItemEdit;
