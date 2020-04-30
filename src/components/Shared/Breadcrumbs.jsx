import React from 'react';
import { Link } from 'gatsby';

const Breadcrumbs = ({ title }) => (
  <nav className="mb-4 pm-breadcrumb" aria-label="You are here:">
    <span>
      <Link to="/">Home</Link>
      {' '}
      /
      <span>
        {/* {category && (
        <span>
          <Link to={`/${category.slug}/page/1/`}>
            {' '}
            {category.name}
          </Link>
        </span>
        )}
        {' '}
        /
        {' '} */}
        <span className="breadcrumb_last" aria-current="page">{title}</span>
      </span>
    </span>
  </nav>
);

export default Breadcrumbs;
