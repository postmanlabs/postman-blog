import React from 'react';
import './_tags.scss';
import { Link } from 'gatsby';

const TagsMeta = ({
  tags, categories,
}) => {
  let tagsList;
  const category = categories;

  if (tags && tags.length > 0) {
    tagsList = tags.map((tag) => <Link key={tag.node.id} to={`/tags/${tag.node.slug}/page/1`}>{tag.node.name}</Link>);
  }
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-sm-4 v5-link">
          {category && (
            <p className="categories">
              Categories:
              {' '}
              <a href={`/${category.slug}/page/1`}>{category.name}</a>
            </p>
          )}
        </div>

        <div className="col-sm-8">
          {tagsList && (
            <p className="tags">
              Tags: #
              {tagsList}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagsMeta;
