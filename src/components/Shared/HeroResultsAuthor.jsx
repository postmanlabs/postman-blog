import React from 'react';

const HeroResultsAuthor = ({
  title,
}) => (
  <div className="row hero-results__container">
    <div className="col-12">
      <h1 className="h2 mb-0">{`Blog Posts by ${title[0].toUpperCase()}${title.slice(1)}`}</h1>
    </div>
  </div>
);

export default HeroResultsAuthor;
