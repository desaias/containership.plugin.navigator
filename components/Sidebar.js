import React, { PropTypes } from 'react';

import { Link } from '../routes';

import vars from '../styles/vars';

const hostPaths = [
  '/host',
  '/hostsDetail',
  '/hostTags',
  '/hostContainers',
];

const appPaths = [
  '/application',
  '/applicationsDetail',
  '/applicationContainers',
  '/applicationTags',
  '/applicationConstraints',
  '/applicationSettings',
  '/applicationEnvVars',
];

const Sidebar = ({ pathname }) => {
  const hostsRE = new RegExp(hostPaths.join('|'), 'i');
  const appRE = new RegExp(appPaths.join('|'), 'i');

  return (
    <div className="sidebar">
      <img src="/static/containership.png" alt="Containership" />
      <Link prefetch route="overview">
        <a className={pathname === '/' || pathname === '/index' ? 'link active' : 'link'}>Cluster Overview</a>
      </Link>
      <Link prefetch route="hosts">
        <a className={pathname.match(hostsRE) !== null ? 'link active' : 'link'}>Hosts</a></Link>
      <Link prefetch route="applications">
        <a className={pathname.match(appRE) !== null ? 'link active' : 'link'}>Applications</a>
      </Link>

      <footer>
        <a href="https://docs.containership.io/docs" rel="noopener noreferrer" target="_blank" className="link">Documentation</a>
      </footer>
      <style jsx>{`
        .sidebar {
          background-color: ${vars.darkBlue};
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          width: 250px;
        }

        img {
          align-self: center;
          margin: 2.5rem 0;
        }

        footer {
          margin-top: auto;
          margin-bottom: 2rem;
        }

        .link {
          display: flex;
          align-items: center;
          color: #fff;
          height: 5rem;
          padding-left: 2rem;
          border-right: 0;
          transition-property: all;
          transition: cubic-bezier(.17,.67,.83,.67) 150ms;
        }

        .link:first-of-type {
          border-top: 0px;
        }

        .link:last-of-type {
          border-bottom: 0px;
        }

        footer .link:last-of-type {
          border-bottom: 0px;
        }

        .link:hover {
          color: #fff;
          text-decoration: none;
          background-color: #3f4554;
          border-right: 5px solid ${vars.green}
        }

        .link.active {
          color: ${vars.darkBlue};
          text-decoration: none;
          background-color: #fff;
          border-left: .5rem solid ${vars.green};
          padding-left: 1.5rem;
        }
        .link.active:hover {
          border-right: 0;
          border-left: .5rem solid ${vars.green};
        }

      `}</style>
    </div>
  );
};

Sidebar.propTypes = {
  pathname: PropTypes.string,
};

export default Sidebar;
