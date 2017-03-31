import React, { PropTypes } from 'react';

const OverviewBox = props => (
  <div className="box">
    <p className="count">{props.count}</p>
    <p className="title">{props.title}</p>
    <p className="meta">{props.meta}</p>
    <style jsx>{`
      .box {
        width: 18rem;
        height: 18rem;
        border: 1px solid #e8e8e8;
        border-radius: 4px;
        margin-right: 3rem;
        margin-top: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .box:last-of-type {
        margin-right: 0;
      }
      .count {
        text-align: center;
        font-size: 3.2rem;
        margin-top: 2rem;
      }
      .title {
        text-align: center;
        font-size: 1.6rem;
        margin-top: 1rem;
      }
      .meta {
        text-align: center;
        font-size: 1.2rem;
        font-weight: lighter;
        margin-top: 2rem;
      }
    `}</style>
  </div>
);

OverviewBox.propTypes = {
  count: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  meta: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default OverviewBox;
