import React from 'react';
import { Link } from '../routes';

import vars from '../styles/vars';

const TopNavHostDetail = ({ hostId, isFollower, pathname }) => (
  <nav className="top-nav">
    <ul>
      <li>
        <Link prefetch route="hostsDetail" params={{ id: hostId }}>
          <a className={pathname === '/hostsDetail' || pathname === `/host/${hostId}` ? 'link active' : 'link'}>Overview</a>
        </Link>
      </li>
      <li>
        <Link prefetch route="hostTags" params={{ id: hostId }}>
          <a className={pathname === '/hostTags' || pathname === `/hosts/${hostId}/tags` ? 'link active' : 'link'}>Tags</a>
        </Link>
      </li>
      {isFollower && (
        <li>
          <Link prefetch route="hostContainers" params={{ id: hostId }}>
            <a className={pathname === '/hostContainers' || pathname === `/hosts/${hostId}/containers` ? 'link active' : 'link'}>Containers</a>
          </Link>
        </li>
      )}
      <li>
        <Link prefetch route="hostSettings" params={{ id: hostId }}>
          <a className={pathname === '/hostSettings' || pathname === `/hosts/${hostId}/settings` ? 'link active' : 'link'}>Settings</a>
        </Link>
      </li>
    </ul>
    <style jsx>{`
      .top-nav {
        margin: 2rem -2rem 0 -2rem;
        height: 4rem;
        border-bottom: 1px solid #e8e8e8;
      }
      ul {
        display: flex;
      }
      li {
        margin: 0;
        padding: 0;
      }
      a {
        border: 1px solid #e8e8e8;
        border-radius: 4px 4px 0 0;
        padding: 12px 0;
        margin: 0 1rem;
        color: ${vars.lightBlue};
        width: 12rem;
        display: flex;
        justify-content: center;
        height: 4rem;
      }
      a.active {
        border-bottom: 1px solid #fff;
      }
      li:first-of-type a {
        margin-left: 4rem;
      }
    `}</style>
  </nav>
);

TopNavHostDetail.propTypes = {
  hostId: React.PropTypes.string.isRequired,
  isFollower: React.PropTypes.bool,
  pathname: React.PropTypes.string.isRequired,
};

export default TopNavHostDetail;
