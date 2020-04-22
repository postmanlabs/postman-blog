import React from 'react';

const HeroResults = ({
  title, totalPosts,
}) => {
  return (
    <div className="row hero-results__container">
      <div className="col-12">
        <h1 className="h2 mb-0">{`Postman ${title[0].toUpperCase()}${title.slice(1)}`}</h1>
      </div>
    </div>
  );
};

export default HeroResults;
