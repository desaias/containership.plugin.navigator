import React, { PropTypes } from 'react';

import { Link } from '../routes';
import vars from '../styles/vars';

const ApplicationLink = ({
  appId,
  containerCount,
  containersLoaded,
  cpus,
  memory,
}) => {
  let statusStyles;
  if (containersLoaded === containerCount) {
    statusStyles = 'status green';
  }
  if (containersLoaded > 0 && containersLoaded !== containerCount) {
    statusStyles = 'status yellow';
  }
  if (containersLoaded === 0) {
    statusStyles = 'status red';
  }
  return (
    <div className="app-link">
      <figure className={statusStyles} />
      <Link route="applicationsDetail" params={{ id: appId }}><a className="app-id link">{appId}</a></Link>
      <p className="containers">{`${containersLoaded}/${containerCount}`}</p>
      <p className="cpus">{cpus.toFixed(2)}</p>
      <p className="memory">{`${memory} MB`}</p>

      <style jsx>{`
        .app-link {
          display: flex;
          align-items: center;
          border-top: 1px solid #e8e8e8;
          height: 4rem;
        }

        .app-link:hover {
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
          width: 20rem;
          font-size: 1.5rem;
        }

        .link {
          color: ${vars.lightBlue};
          height: 4rem;
          display: flex;
          align-items: center;
          width: 30rem;
        }

        .app-id {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .containers, .cpus, .memory  {
          width: 20rem;
          text-align: center;
        }

      `}</style>
    </div>
  );
};

ApplicationLink.propTypes = {
  appId: PropTypes.string,
  containerCount: PropTypes.number,
  containersLoaded: PropTypes.number,
  cpus: PropTypes.number,
  memory: PropTypes.number,
};

export default ApplicationLink;
