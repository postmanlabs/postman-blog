import React from 'react';
import { Link } from 'gatsby';

const Breadcrumbs = ({ category, title, slug }) => (
  <div className="row">
    <div className="col-12">
      <div className="entry-meta">
        <div className="col-11 entry-meta-data">
          <p>
            <Link to="/">Home</Link>
            {category && (
              <span>
                {' '}
                /
                {' '}
                <Link to={`/${category.slug}/page/1/`}>{category.name}</Link>
              </span>
            )}
            {' '}
            /
            {' '}
            <Link to={`${slug}/`}>{title}</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Breadcrumbs;
