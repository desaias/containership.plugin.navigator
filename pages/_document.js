import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

import reset from '../styles/reset';
import global from '../styles/global';
import nprogress from '../styles/nprogress';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head } = renderPage();
    const styles = flush();
    return { html, head, styles };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <title>ContainerShip</title>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta name="msapplication-TileImage" content="https://cdn.containership.io/images/favicon.png" />
          <link rel="fluid-icon" href="https://cdn.containership.io/images/favicon.png" title="ContainerShip" />
          <link rel="icon" href="https://cdn.containership.io/images/favicon.png" />
          <style type="text/css">{reset}</style>
          <style type="text/css">{global}</style>
          <style type="text/css">{nprogress}</style>
        </Head>
        <body>
          <Main className="test" />
          <NextScript />
        </body>
      </html>
    );
  }
}
