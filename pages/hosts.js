import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';

export default () => (
  <div>
    <Header />
    <Link href="/hosts/1"><a className="link">Host Details</a></Link>
    <p>Hosts...</p>
  </div>
);
