import React from 'react';
import { Link } from 'gatsby';

const Bio = ({ authorBio, avatar, name, authorSlug }) => (
  <div className="row bio">
    <div className="col-1">
      <img className="entry-meta-img" src={avatar} alt={name} />
    </div>
    <div className="col-11">
      <div className="row">
        <div className="col-12">
          {name} 
        </div>
        <div className="col-12 v5-link">
          {authorBio}
          <Link to={`/${authorSlug}/page/1`}> See more posts of {name}</Link>
        </div>
      </div>
    </div>
  </div>
);

export default Bio;