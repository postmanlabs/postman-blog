import React from 'react';
// import { Link } from 'gatsby';
import './_entry-meta.scss';

// receive id as prop? and match the id of the post with the author
// and print author gravatar, name and published date in this component
// on index page and the blog page

// useStaticQuery is used in components

import PropTypes from 'prop-types';

const EntryMeta = ({
  name, avatar, date, tags, categories,
}) => {
  let tagsList;

  const category = categories;
  // Are there tags?
  // If so lets map through them and stash them in this tagsList var

  if (tags && tags.length > 0) {
    tagsList = tags.map((tag) => <a key={tag.node.id} src={`tags/${tag.node.slug}/page/1`}>{tag.node.name}</a>);
  }

  return (
    <div className="row">
      <img className="entry-meta-img" src={avatar} alt={name} />
      <p className="entry-meta-data">
        <span className="author">Author: </span>
        {name}
        {' '}
        on
        {' '}
        { date }
      </p>
      {category && (
        <p>
          category:
          {' '}
          <a href={`categories/${category.slug}/page/1`}>{category.name}</a>
          {' '}
        </p>
      )}
      {tagsList && (
      <p>
        #
        {' '}
        {tagsList}
      </p>
      )}
    </div>
  );
};

// EntryMeta.propTypes = {
//   name: PropTypes.string,
//   avatar: PropTypes.string,
//   date: PropTypes.string,
// };

export default EntryMeta;
