import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export default () => (
  <div style={{ marginBottom: 20 }}>
    <Head>
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    </Head>

    <Link href="/"><a className="link">Cluster Overview</a></Link>
    <Link href="/hosts"><a className="link">Hosts</a></Link>
    <Link href="/applications"><a className="link">Applications</a></Link>
    <Link href="/non-existing"><a className="link">Non Existing Page</a></Link>

    <style jsx>{`
      .link {
        margin: 0 10px 0 0;
        text-decoration: none;
      }

      .link:hover {
        text-decoration: underline;
      }

    `}</style>
  </div>
);
