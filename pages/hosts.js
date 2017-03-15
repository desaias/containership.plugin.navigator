import React, { Component } from 'react';
import { Link } from '../routes';
import Header from '../components/Header';

const hosts = [
  { id: 1, name: 'host 1' },
  { id: 2, name: 'host 2' },
  { id: 3, name: 'host 3' },
  { id: 4, name: 'host 4' },
  { id: 5, name: 'host 5' },
];

export default class extends Component {
  static async getInitialProps() {
    return {
      hosts,
    };
  }

  render() {
    return (
      <div>
        <Header />
        <p>Hosts...</p>
        <ul>
          {this.props.hosts.map(host => (
            <li key={`host-id-${host.id}`}>
              <Link route="hostsDetail" params={{ ...host }}><a className="link">{host.name}</a></Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
