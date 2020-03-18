import React from 'react';
import { Link } from 'gatsby';
import ReturnDateString from './ReturnDateString';

const EntryMeta = ({
  name, avatar, authorSlug, date,
}) => (
  <div className="row">
    <div className="col-12">
      <div className="row entry-meta">
        <div className="col-1 entry-meta-col">
          <img className="entry-meta-img" src={avatar} alt={name} />
        </div>
        <div className="col-11 entry-meta-data">
          <Link to={`/${authorSlug}/page/1`}>{name}</Link>
          {' '}
          <ReturnDateString data={date} />
        </div>
      </div>
    </div>
  </div>
);

export default EntryMeta;
