import React, { PropTypes, PureComponent } from 'react';
import flat from 'flat';
import 'isomorphic-fetch';

import { API } from '../utils/config';

import Page from '../layouts/main';
import SectionHeader from '../components/SectionHeader';
import TagListItem from '../components/TagListItem';
import TopNav from '../components/TopNavHostDetail';

export default class HostTags extends PureComponent {
  static async getInitialProps({ pathname, req, query }) {
    const res = await fetch(`${API}/hosts/${query.id}`);
    const json = await res.json();
    return {
      host: { ...json },
      pathname: (req && req.url) || pathname,
    };
  }

  constructor() {
    super();
    this.addHostTag = this.addHostTag.bind(this);
    this.sendPayload = this.sendPayload.bind(this);

    this.state = {
      tagName: '',
      tagValue: '',
    };
  }

  addHostTag() {
    const { host } = this.props;
    const flatTags = flat.flatten(host.tags);
    flatTags[this.state.tagName] = this.state.tagValue;
    this.sendPayload(host.id, flat.unflatten(flatTags));
  }

  deleteTag(tag) {
    const { host } = this.props;
    const flatTags = flat.flatten(host.tags);
    delete flatTags[tag];
    this.sendPayload(host.id, flat.unflatten(flatTags));
  }

  sendPayload(hostId, unflattenedTags) {
    fetch(`${API}/hosts/${hostId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tags: unflattenedTags }),
    })
    .then(() => this.setState({
      tagName: '',
      tagValue: '',
    }))
    .then(() => window.location.reload());
  }

  render() {
    const { host, pathname } = this.props;
    const flatTags = flat.flatten(host.tags);
    const parsedTags = Object.keys(flatTags).map(key => ({
      name: key,
      value: flatTags[key],
    }));

    const csTags = parsedTags
      .map(tag => (tag.name.match(/^system.|host_name|host|cloud.|metadata./gi) ? tag : false))
      .filter(Boolean);

    const userTags = parsedTags
      .map(tag => (!tag.name.match(/^system.|host_name|host|cloud.|metadata./gi) ? tag : false))
      .filter(Boolean);


    return (
      <Page pathname={pathname}>
        <TopNav hostId={host.id} isFollower={host.mode === 'follower'} pathname={pathname} />

        {host.mode === 'follower' && (
          <div>
            <SectionHeader title={`Add Tag: ${host.id}`} />
            <div className="add-tag-wrapper">
              <input
                className="tag-input"
                onChange={e => this.setState({ tagName: e.target.value })}
                placeholder="tag.name"
                type="text"
                value={this.state.tagName}
              />
              <input
                className="tag-input"
                onChange={e => this.setState({ tagValue: e.target.value })}
                placeholder="tag value"
                type="text"
                value={this.state.tagValue}
              />
              <button
                className="btn blue"
                onClick={() => this.addHostTag()}
              >Add Tag</button>
            </div>
          </div>
        )}

        {host.mode === 'follower' && userTags.length > 0 && (
          <section className="tag-wrapper">
            <SectionHeader title="User Added Tags" />
            <div className="list-header">
              <p>Tag Name</p>
              <p>Tag Value</p>
            </div>
            {userTags.length > 0 && (
              userTags.map(tag => (
                <TagListItem
                  deleteTag={() => this.deleteTag(tag.name)}
                  key={`tag-${tag.name}`}
                  name={tag.name}
                  userTag
                  value={tag.value}
                />
              ))
            )}
          </section>
        )}

        <section className="tag-wrapper">
          <SectionHeader title="ContainerShip Tags" />
          <div className="list-header">
            <p>Tag Name</p>
            <p>Tag Value</p>
          </div>
          {csTags.length > 0 && (
            csTags.map((tag) => {
              if (tag.value === '' || tag.value === undefined) {
                return null;
              }
              return (
                <TagListItem
                  key={`tag-${tag.name}`}
                  name={tag.name}
                  value={tag.value}
                />
              );
            })
          )}
        </section>

        <style jsx>{`
          .add-tag-wrapper {
            display: flex;
            align-items: center;
            margin-top: 2rem;
          }
          .add-tag-wrapper .tag-input {
            width: 33rem;
            margin-right: 2rem;
            font-size: 1.5rem;
          }
          .add-tag-wrapper .btn {
            width: 20rem;
          }

          .list-header {
            display: flex;
            margin-left: 2rem;
            margin-top: 1rem;
          }
          .list-header p {
            width: 35rem;
            font-size: 1.2rem;
            color: #bfbfbf;
            margin: 0;
          }
        `}</style>
      </Page>
    );
  }
}

HostTags.propTypes = {
  host: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
};
