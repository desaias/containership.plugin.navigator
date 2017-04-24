import React from 'react';
import PropTypes from 'prop-types';

import vars from '../styles/vars';

const Checkbox = ({
  changeFunc,
  isChecked,
  labelText,
  name,
}) => (
  <div>
    <input
      checked={isChecked}
      className="checkbox-custom"
      id={name}
      name={name}
      onChange={changeFunc}
      type="checkbox"
    />
    <label htmlFor={name} className="checkbox-custom-label">{labelText}</label>

    <style jsx>{`
      .checkbox-custom {
        opacity: 0;
        position: absolute;
      }
      .checkbox-custom, .checkbox-custom-label {
        display: flex;
        align-items: center;
        margin: .5rem 0;
        cursor: pointer;
        font-size: 1.4rem;
      }
      .checkbox-custom-label {
        position: relative;
      }
      .checkbox-custom + .checkbox-custom-label:before {
        content: '';
        background: #fff;
        border: 2px solid #e8e8e8;
        display: inline-block;
        vertical-align: middle;
        width: 25px;
        height: 25px;
        padding: 2px;
        margin-right: 10px;
        text-align: center;
        transition-property: all;
        transition: cubic-bezier(.17,.67,.83,.67) 150ms;
      }
      .checkbox-custom:hover + .checkbox-custom-label:before {
        border: 2px solid ${vars.lightBlue};
      }
      .checkbox-custom:checked + .checkbox-custom-label:before {
        background: ${vars.lightBlue};
        border: 2px solid ${vars.lightBlue};
      }
      .checkbox-custom:focus + .checkbox-custom-label {
        outline: 0px;
      }
    `}</style>
  </div>
);

Checkbox.propTypes = {
  changeFunc: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  labelText: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default Checkbox;
