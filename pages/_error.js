import React from 'react';
import PropTypes from 'prop-types';

import Page from '../layouts/main';

export default class Error extends React.Component {
  static getInitialProps({ res, jsonPageRes }) {
    const statusCode = res ? res.statusCode : (jsonPageRes ? jsonPageRes.status : null);
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    const errorText = statusCode === 404 ? 'This page could not be found.' : 'An error occured on the server.';
    return (
      <Page pathname="404">
        <div className="error-wrapper">
          <h1>{statusCode}</h1>
          <div>
            <h2>{errorText}</h2>
          </div>
        </div>
        <style jsx>{`
          .error-wrapper {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .error-wrapper h1 {
            display: flex;
            border-right: 1px solid rgba(0, 0, 0,.3);
            margin: 0;
            margin-right: 20px;
            padding: 10px 23px 10px 0;
            font-size: 2.4rem;
            font-weight: 500;
            align-items: flex-start;
          }
          .error-wrapper div {
            display: flex;
            text-align: left;
            align-items: center;
          }
          .error-wrapper div h2 {
            font-size: 1.4rem;
            font-weight: normal;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </Page>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number,
};
