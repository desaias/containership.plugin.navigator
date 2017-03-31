import React from 'react';

import { Link } from '../routes';

import vars from '../styles/vars';

const TopNavAppDetail = ({ appId, pathname }) => (
  <nav className="top-nav">
    <ul>
      <li>
        <Link prefetch route="applicationsDetail" params={{ id: appId }}>
          <a
            className={
              pathname === '/applicationsDetail' ||
              pathname === `/applications/${appId}` ? 'link active' : 'link'
            }
          >Overview</a>
        </Link>
      </li>
      <li>
        <Link prefetch route="applicationContainers" params={{ id: appId }}>
          <a
            className={
              pathname === '/applicationContainers' ||
              pathname === `/applications/${appId}/containers` ? 'link active' : 'link'
            }
          >Containers</a>
        </Link>
      </li>
      <li>
        <Link prefetch route="applicationConstraints" params={{ id: appId }}>
          <a
            className={
              pathname === '/applicationConstraints' ||
              pathname === `/applications/${appId}/constraints` ? 'link active' : 'link'
            }
          >Constraints</a>
        </Link>
      </li>
      {/* <li>
        <Link prefetch route="applicationTags" params={{ id: appId }}>
          <a
            className={
              pathname === '/applicationTags' ||
              pathname === `/applications/${appId}/tags` ? 'link active' : 'link'
            }
          >Tags</a>
        </Link>
      </li> */}
      <li>
        <Link prefetch route="applicationEnvVars" params={{ id: appId }}>
          <a
            className={
              pathname === '/applicationEnvVars' ||
              pathname === `/applications/${appId}/variables` ? 'link active' : 'link'
            }
          >Environment Variables</a>
        </Link>
      </li>
      <li>
        <Link prefetch route="applicationVolumes" params={{ id: appId }}>
          <a
            className={
              pathname === '/applicationVolumes' ||
              pathname === `/applications/${appId}/volumes` ? 'link active' : 'link'
            }
          >Volumes</a>
        </Link>
      </li>
      <li>
        <Link prefetch route="applicationSettings" params={{ id: appId }}>
          <a
            className={
              pathname === '/applicationSettings' ||
              pathname === `/applications/${appId}/settings` ? 'link active' : 'link'
            }
          >Settings</a>
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
        margin: 0 1rem;
        color: ${vars.lightBlue};
        width: auto;
        padding: 12px;
        height: 4rem;
        display: flex;
        justify-content: center;
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

TopNavAppDetail.propTypes = {
  appId: React.PropTypes.string.isRequired,
  pathname: React.PropTypes.string.isRequired,
};

export default TopNavAppDetail;
