import React, { PropTypes } from 'react';
import moment from 'moment';

import { Link } from '../routes';

import vars from '../styles/vars';

const ContainerDetails = ({
  application,
  containerId,
  deleteContainer,
  host,
  hostContainer,
  hostPort,
  randomHostPort,
  startTime,
  status,
}) => {
  let statusStyles;
  if (status === 'loaded') {
    statusStyles = 'status green';
  }
  if (status === 'loading') {
    statusStyles = 'status yellow';
  }
  if (status === 'unloaded') {
    statusStyles = 'status red';
  }

  return (
    <div className="container-link">
      <figure className={statusStyles} />
      <p className="container-id">{
        hostContainer ?
          <Link route="applicationContainers" params={{ id: application }}><a className="app-id link">{application}</a></Link> :
          containerId
        }
      </p>
      <p className="container-status">{status}</p>
      <p className="container-host">{host}</p>
      <p className="container-port">{hostPort}</p>
      <p className="random-port">{randomHostPort ? 'true' : 'false'}</p>
      <p className="start-time">{moment(startTime).utc().fromNow()}</p>
      {status === 'loading' && (
        <button className="reload" onClick={() => window.location.reload()}>
          <svg viewBox="0 0 12 16" width="12" height="16" aria-hidden="true">
            <path d="M10.24 7.4a4.15 4.15 0 0 1-1.2 3.6 4.346 4.346 0 0 1-5.41.54L4.8 10.4.5 9.8l.6 4.2 1.31-1.26c2.36 1.74 5.7 1.57 7.84-.54a5.876 5.876 0 0 0 1.74-4.46l-1.75-.34zM2.96 5a4.346 4.346 0 0 1 5.41-.54L7.2 5.6l4.3.6-.6-4.2-1.31 1.26c-2.36-1.74-5.7-1.57-7.85.54C.5 5.03-.06 6.65.01 8.26l1.75.35A4.17 4.17 0 0 1 2.96 5z" />
          </svg>
        </button>
      )}
      <button className="delete" onClick={deleteContainer}>
        <svg viewBox="0 0 12 16" width="12" height="16" aria-hidden="true">
          <path d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z" />
        </svg>
      </button>
      <style jsx>{`
        .container-link {
          display: flex;
          align-items: center;
          border-top: 1px solid #e8e8e8;
          height: 4rem;
        }

        .container-link:hover {
          background-color: #fbfbfb;
        }

        .status {
          display: block;
          height: 2.5rem;
          width: 4px;
          overflow: hidden;
          margin: 0 1.5rem 0 0;
          border-radius: 4px;
        }

        .status.green {
          background-color: ${vars.green};
        }
        .status.yellow {
          background-color: ${vars.yellow};
        }
        .status.red {
          background-color: ${vars.red};
        }

        p, a {
          font-size: 1.5rem;
          margin-right: 2rem;
        }

        .link {
          color: ${vars.lightBlue};
          height: 4rem;
          display: flex;
          align-items: center;
          width: 30rem;
        }

        .container-id {
          width: 25rem;
          margin-right: 2rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .container-status {
          width: 10rem;
        }
        .container-host {
          width: 15rem;
        }

        .container-port {
          width: 12rem;
        }

        .random-port {
          width: 15rem;
        }

        .start-time {
          width: 15rem;
        }

        .reload {
          width: auto;
          fill: ${vars.lightBlue};
          border: 0;
          background-color: inherit;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .delete {
          width: auto;
          fill: ${vars.red};
          cursor: pointer;
          display: flex;
          align-items: center;
          border: 0;
          background-color: inherit;
        }
        .delete svg {
          margin-right: 1rem;
        }

      `}</style>
    </div>
  );
};

ContainerDetails.propTypes = {
  application: PropTypes.string,
  containerId: PropTypes.string,
  deleteContainer: PropTypes.func.isRequired,
  host: PropTypes.string,
  hostContainer: PropTypes.bool,
  hostPort: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  randomHostPort: PropTypes.bool,
  startTime: PropTypes.number,
  status: PropTypes.string,
};

export default ContainerDetails;
