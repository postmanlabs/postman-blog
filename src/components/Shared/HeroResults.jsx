import React from 'react';

import PropTypes from 'prop-types';

import './_heroResults.scss';

const HeroResults = ({
  title, totalPosts, color
}) => {
  const height = 100;
  
  return (
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-center align-items-center hero-results" style={{backgroundColor: color, height: height}}>
            <h2>{`Now viewing ${totalPosts} posts for ${title.name[0].toUpperCase()}${title.name.slice(1)}`}</h2>
          </div>
        </div>
      </div>
  );
};

export default HeroResults;
