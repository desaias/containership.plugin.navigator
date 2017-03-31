import React, { PropTypes } from 'react';

import vars from '../styles/vars';

const TagListItem = ({
  deleteTag,
  name,
  userTag,
  value,
}) => (
  <div className="tag-wrapper">
    <p>{name}</p>
    <p>{value}</p>
    {userTag && (
      <button className="delete" onClick={deleteTag}>
        <svg viewBox="0 0 12 16" width="12" height="16" aria-hidden="true">
          <path d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z" />
        </svg>
      </button>
    )}
    <style jsx>{`
      .tag-wrapper {
        display: flex;
        align-items: center;
        border-top: 1px solid #e8e8e8;
        height: 4rem;
        padding-left: 2rem;
      }
      p {
        font-size: 1.5rem;
        width: 35rem;
      }
      .delete {
        width: auto;
        fill: ${vars.red};
        cursor: pointer;
        display: flex;
        align-items: center;
        border: 0;
        background: white;
      }
      .delete svg {
        margin-right: 1rem;
      }
    `}</style>
  </div>
);

TagListItem.propTypes = {
  deleteTag: PropTypes.func,
  name: PropTypes.string.isRequired,
  userTag: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

export default TagListItem;
