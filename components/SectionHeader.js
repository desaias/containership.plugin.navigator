import React from 'react';
import PropTypes from 'prop-types';

const SectionHeader = props => (
  <div>
    <h2 className="section-header">{props.title}</h2>
    <style jsx>{`
      .section-header {
        border-bottom: 1px solid #e8e8e8;
        margin: 6rem 0 0 0;
        padding-bottom: 1rem;
        text-transform: capitalize;
      }
    `}</style>
  </div>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionHeader;
