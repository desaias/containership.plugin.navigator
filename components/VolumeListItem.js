import React, { PropTypes } from 'react';

import vars from '../styles/vars';

const VolumeListItem = ({
  deleteVolume,
  editVolume,
  container,
  host,
}) => (
  <div className="tag-wrapper">
    <p>{container}</p>
    <p>{host}</p>

    <button className="edit" onClick={editVolume}>
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <path fillRule="evenodd" d="M4.48 7.27c.26.26 1.28 1.33 1.28 1.33l.56-.58-.88-.91 1.69-1.8s-.76-.74-.43-.45c.32-1.19.03-2.51-.87-3.44C4.93.5 3.66.2 2.52.51l1.93 2-.51 1.96-1.89.52-1.93-2C-.19 4.17.1 5.48 1 6.4c.94.98 2.29 1.26 3.48.87zm6.44 1.94l-2.33 2.3 3.84 3.98c.31.33.73.49 1.14.49.41 0 .82-.16 1.14-.49.63-.65.63-1.7 0-2.35l-3.79-3.93zM16 2.53L13.55 0 6.33 7.46l.88.91-4.31 4.46-.99.53-1.39 2.27.35.37 2.2-1.44.51-1.02L7.9 9.08l.88.91L16 2.53z" />
      </svg>
    </button>

    <button className="delete" onClick={deleteVolume}>
      <svg viewBox="0 0 12 16" width="12" height="16" aria-hidden="true">
        <path d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z" />
      </svg>
    </button>

    <style jsx>{`
      .tag-wrapper {
        display: flex;
        align-items: center;
        border-top: 1px solid #e8e8e8;
        height: 4rem;
        padding-left: 2rem;
      }
      p {
        font-size: 1.5rem;
        width: 35rem;
      }
      .edit {
        width: auto;
        fill: ${vars.lightBlue};
        cursor: pointer;
        display: flex;
        align-items: center;
        border: 0;
        background: white;
      }
      .edit svg {
        margin-right: 1rem;
      }
      .delete {
        width: auto;
        fill: ${vars.red};
        cursor: pointer;
        display: flex;
        align-items: center;
        border: 0;
        background: white;
      }
      .delete svg {
        margin-right: 1rem;
      }
    `}</style>
  </div>
);

VolumeListItem.propTypes = {
  deleteVolume: PropTypes.func,
  editVolume: PropTypes.func,
  container: PropTypes.string,
  host: PropTypes.string,
};

export default VolumeListItem;
