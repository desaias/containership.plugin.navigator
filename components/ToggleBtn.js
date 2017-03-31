import React, { PropTypes } from 'react';
import vars from '../styles/vars';

const ToggleBtn = ({ text, toggle }) => (
  <div className="tgl-wrapper">
    <input onChange={toggle} className="tgl tgl-light" id="cb1" type="checkbox" />
    <label className="tgl-btn" htmlFor="cb1" />
    <p className="tgl-text">{text}</p>

    <style jsx>{`
      .tgl-wrapper {
        display: flex;
        justify-content: inherit;
      }
      .tgl {
        display: none;
      }
      .tgl-text {
        margin-left: 1rem;
      }
      .tgl,
      .tgl:after,
      .tgl:before,
      .tgl *,
      .tgl *:after,
      .tgl *:before,
      .tgl + .tgl-btn {
        box-sizing: border-box;
      }
      .tgl::-moz-selection,
      .tgl:after::-moz-selection,
      .tgl:before::-moz-selection,
      .tgl *::-moz-selection,
      .tgl *:after::-moz-selection,
      .tgl *:before::-moz-selection,
      .tgl + .tgl-btn::-moz-selection {
        background: none;
      }
      .tgl::selection,
      .tgl:after::selection,
      .tgl:before::selection,
      .tgl *::selection,
      .tgl *:after::selection,
      .tgl *:before::selection,
      .tgl + .tgl-btn::selection {
        background: none;
      }
      .tgl + .tgl-btn {
        outline: 0;
        display: block;
        width: 3em;
        height: 1.5em;
        position: relative;
        cursor: pointer;
        -webkit-user-select: none;
           -moz-user-select: none;
            -ms-user-select: none;
                user-select: none;
      }
      .tgl + .tgl-btn:after,
      .tgl + .tgl-btn:before {
        position: relative;
        display: block;
        content: "";
        width: 50%;
        height: 100%;
      }
      .tgl + .tgl-btn:after {
        left: 0;
      }
      .tgl + .tgl-btn:before {
        display: none;
      }
      .tgl:checked + .tgl-btn:after {
        left: 50%;
      }

      .tgl-light + .tgl-btn {
        background: #f0f0f0;
        border-radius: 2em;
        padding: 2px;
        -webkit-transition: all .4s ease;
        transition: all .4s ease;
      }
      .tgl-light + .tgl-btn:after {
        border-radius: 50%;
        background: #fff;
        -webkit-transition: all .2s ease;
        transition: all .2s ease;
      }
      .tgl-light:checked + .tgl-btn {
        background: ${vars.green};
      }
    `}</style>
  </div>
);


ToggleBtn.propTypes = {
  text: PropTypes.string.isRequired,
  toggle: PropTypes.func,
};

export default ToggleBtn;
