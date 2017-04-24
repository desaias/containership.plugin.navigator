import React from 'react';
import PropTypes from 'prop-types';

const NumberStepper = ({
    changeCallback,
    quantity,
}) => (
  <article className="number-stepper">
    <div className="stepper">
      <button
        className="btn quantity-down"
        name="quantity down"
        onClick={() => changeCallback(quantity === 0 ? quantity : quantity - 1)}
      >-</button>
      <input
        value={quantity}
        name="quantity"
        readOnly
        type="number"
      />
      <button
        className="btn quantity-up"
        name="quantity up"
        onClick={() => changeCallback(quantity + 1)}
      >+</button>
    </div>
    <style jsx>{`
      .stepper {
        display: flex;
        align-items: stretch;
      }

      input {
        flex: 1;
        text-align: center;
        background: #f5f5f5;
        font-size: 1.6rem;
        font-family: $font-semi;
        color: $dark-grey;
        border: 0 none !important;
        border-radius: 0 !important;
      }

      button {
        width: 8rem;
        height: 4.8rem;
        font-size: 3rem;
        font-family: $font-regular;
        text-align: center;
        user-select: none;
        padding-bottom: 12px;
        line-height: 42px;
        transition: transform 100ms cubic-bezier(0.42, 0, 0.57, 0.99);
      }
      button.quantity-up {
        background-color: $dark-blue;
        color: #fff;
        border-radius: 0 4px 4px 0;
      }
      button.quantity-down {
        background-color: $light-grey;
        color: $dark-grey;
        border-radius: 4px 0 0 4px;
      }
      button:active {
          transform: scale(1.06);
      }

    `}</style>
  </article>
);

NumberStepper.defaultProps = {
  quantity: 0,
};

NumberStepper.propTypes = {
  changeCallback: PropTypes.func.isRequired,
  quantity: PropTypes.number,
};

export default NumberStepper;
