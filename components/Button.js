import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text }) => (
  <div>
    <button
      className="btn"
    >
      {text} test
    </button>
    <style jsx>{`
      .btn {
        display: flex;
        overflow: hidden;

        margin: 10px;
        padding: 12px 12px;

        cursor: pointer;
        user-select: none;
        transition: all 60ms ease-in-out;
        text-align: center;
        white-space: nowrap;
        text-decoration: none !important;
        text-transform: none;
        text-transform: capitalize;

        color: #fff;
        border: 0 none;
        border-radius: 4px;

        font-size: 14px;
        font-weight: 500;
        line-height: 1.3;

        appearance:         none;

        justify-content: center;
        align-items: center;
        flex: 0 0 160px;
      }
    `}</style>
  </div>
);

Button.propTypes = {
  text: PropTypes.string.isRequried,
};

export default Button;
