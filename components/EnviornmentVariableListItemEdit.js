import React, { PropTypes } from 'react';

const EnvironmentVariableListItem = ({
  updateBtnFunc,
  cancelBtnFunc,
  changeKeyFunc,
  changeValFunc,
  envKey,
  envValue,
}) => (
  <div className="tag-wrapper">
    <input
      className="env-input"
      onChange={changeKeyFunc}
      placeholder="key"
      type="text"
      value={envKey}
    />
    <input
      className="env-input"
      onChange={changeValFunc}
      placeholder="value"
      type="text"
      value={envValue}
    />
    <button
      className="btn red"
      onClick={cancelBtnFunc}
    >Cancel</button>
    <button
      className="btn blue"
      onClick={updateBtnFunc}
    >Update</button>

    <style jsx>{`
      .tag-wrapper {
        display: flex;
        border-top: 1px solid #e8e8e8;
        height: 6rem;
        padding-left: 2rem;
        align-items: center;
      }
      .env-input {
        font-size: 1.5rem;
        width: 33rem;
        margin-right: 2rem;
      }
      .btn {
        width: 10rem;
        height: 3rem;
        font-size: 1.5rem;
        margin-right: 1rem;
      }
    `}</style>
  </div>
);

EnvironmentVariableListItem.propTypes = {
  updateBtnFunc: PropTypes.func.isRequired,
  cancelBtnFunc: PropTypes.func.isRequired,
  changeKeyFunc: PropTypes.func.isRequired,
  changeValFunc: PropTypes.func.isRequired,
  envKey: PropTypes.string.isRequired,
  envValue: PropTypes.string.isRequired,
};

export default EnvironmentVariableListItem;
