import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import NProgress from 'nprogress';

import Sidebar from '../components/Sidebar';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const MainLayout = ({ children, pathname }) => (
  <div className="wrapper">
    <Sidebar pathname={pathname} />
    <div className="main">
      { children }
    </div>
    <style jsx>{`
      .wrapper {
        display: flex;
        height: 100%
      }
      .main {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 0 2rem 4rem 2rem;
        overflow-y: scroll;
        position: relative;
      }
    `}</style>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
  pathname: PropTypes.string,
};

export default MainLayout;
