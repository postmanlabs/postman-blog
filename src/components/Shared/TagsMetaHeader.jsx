import React from 'react';
// import './_tags.scss';
import { Link } from 'gatsby';

const TagsMetaHeader = ({
  tags, categories,
}) => {
  let tagsList;
  const category = categories;

  if (tags && tags.length > 0) {
    tagsList = tags.map((tag) => <Link className="tags" key={tag.node.id} to={`/tags/${tag.node.slug}/page/1`}>{tag.node.name}</Link>);
  }
  return (
    <div className="col-12">
      <div className="row">
      <div className="col-sm-8 text-md-left text-lg-right">
          {tagsList && (
            <div className="tags-wrapper">
              Tags:
              {tagsList}
            </div>
          )}
        </div>

        <div className="col-sm-4 text-md-left text-lg-right">
          {category && (
            <p className="tags-wrapper">
              Category:
              {' '}
              <a className="tags" href={`/${category.slug}/page/1`}>{category.name}</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagsMetaHeader;
