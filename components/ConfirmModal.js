import React, { PropTypes } from 'react';

import vars from '../styles/vars';

const ConfirmModal = ({
  changeInputFunc,
  closeModal,
  confirmBtnFunc,
  deleteBtnText,
  inputPlaceholder,
  inputText,
  isVisible,
  title,
}) => (
  <div id="confirm-modal" className={isVisible ? 'modal visible' : 'modal'}>
    <div className="modal-content">
      <header className="modal-header">
        <h3>{title}</h3>
      </header>
      <div className="modal-body">
        <p>This action cannot be undone.</p>
        <input
          className="delete-input"
          onChange={changeInputFunc}
          placeholder={`Type "${inputPlaceholder}" to confirm`}
          type="text"
          value={inputText}
        />
      </div>
      <div className="modal-actions">
        <button className="btn" onClick={closeModal}>Cancel</button>
        <button className="btn red" onClick={confirmBtnFunc}>{deleteBtnText}</button>
      </div>
    </div>
    <style jsx>{`
      .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.2);
      }

      .modal.visible {
        display: block;
      }

      .modal-content {
        background-color: #fefefe;
        border: 1px solid ${vars.red};
        border-radius: 4px;
        margin: 10rem auto;
        width: 60rem;
      }

      .modal-header {
        background-color: ${vars.red};
        color: #fff;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
      }

      .close {
        color: ${vars.red};
        filter: brightness(50%);
        float: right;
        font-size: 28px;
        font-weight: bold;
      }

      .close:hover,
      .close:focus {
        color: #fff;
        filter: brightness(100%);
        text-decoration: none;
        cursor: pointer;
      }

      .modal-body {
        padding: 2rem 2rem 0 2rem;
      }

      .modal-body p {
        font-size: 1.6rem;
        text-align: center;
      }

      .delete-input {
        width: 100%;
        font-size: 2rem;
        margin-top: 1.5rem;
        text-align: center;
      }

      .modal-actions {
        display: flex;
        padding: 2rem;
      }

      .btn:first-of-type {
        margin-right: 1rem;
      }
      .btn:last-of-type {
        margin-left: 1rem;
      }
    `}</style>
  </div>
);

ConfirmModal.propTypes = {
  changeInputFunc: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  confirmBtnFunc: PropTypes.func.isRequired,
  deleteBtnText: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  inputText: PropTypes.string,
  isVisible: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default ConfirmModal;
