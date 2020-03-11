import React from 'react';
import { Link } from 'gatsby';

const Bio = ({ authorBio, avatar, name, authorSlug }) => (
  <div className="row bio">
    <div className="col-2">
      <img className="bio-img" src={avatar} alt={name} />
    </div>
    <div className="col-10">
      <div className="row">
        <div className="col-12">
          {name} 
        </div>
        <div className="col-12 v5-link">
          <p>
            {authorBio}
            <Link to={`/${authorSlug}/page/1`}> See more posts of {name}</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Bio;