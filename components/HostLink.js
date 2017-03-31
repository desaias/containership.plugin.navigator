import React, { PropTypes } from 'react';
import moment from 'moment';
import { Link } from '../routes';

import vars from '../styles/vars';

// export default class HostLink extends PureComponent {
const HostLink = ({
  hostId,
  hostState,
  isLeader,
  isLeaderType,
  lastSync,
  publicIP,
  startTime,
}) => {
  const statusStyles = hostState === 'operational' ? 'status green' : 'status red';
  const hostLinkStyles = isLeader ? 'host-link leader' : 'host-link';

  return (
    <div className={hostLinkStyles}>
      <figure className={statusStyles} />
      <Link route="hostsDetail" params={{ id: hostId }}><a className="link">{publicIP}</a></Link>
      <p>{moment(startTime).utc().format('lll')}</p>
      <p>{moment(lastSync).utc().fromNow()}</p>
      {
        (isLeader && isLeaderType && (<p>Controlling Leader</p>)) ||
        (!isLeader && isLeaderType && (<p>Standby Leader</p>)) ||
        (<p className="host-id">{hostId}</p>)
      }

      <style jsx>{`
        .host-link {
          display: flex;
          align-items: center;
          border-top: 1px solid #e8e8e8;
          height: 4rem;
        }
        .host-link:hover {
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

        p, a {
          width: 20rem;
          font-size: 1.5rem;
        }

        .link {
          color: ${vars.lightBlue};
          height: 4rem;
          display: flex;
          align-items: center;
        }

        .host-id {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 33rem;
        }
      `}</style>
    </div>
  );
};

HostLink.propTypes = {
  hostId: PropTypes.string.isRequired,
  hostState: PropTypes.string.isRequired,
  isLeader: PropTypes.bool,
  isLeaderType: PropTypes.bool,
  lastSync: PropTypes.number.isRequired,
  publicIP: PropTypes.string.isRequired,
  startTime: PropTypes.number.isRequired,
};

export default HostLink;
