import React, { Component } from 'react';
import Header from '../components/Header';

export default class extends Component {
  static async getInitialProps({ query }) {
    return {
      id: query.id,
      name: query.name,
    };
  }

  render() {
    return (
      <div>
        <Header />
        <p>Host ID: {this.props.id}</p>
        <p>Host Name: {this.props.name}</p>
      </div>
    );
  }

}
