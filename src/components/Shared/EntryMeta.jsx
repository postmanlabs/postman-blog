import React from 'react';
import { Link } from 'gatsby';
import TagsMeta from './Tags';

import ReturnDateString from './ReturnDateString';

const EntryMeta = ({
  name, avatar, authorSlug, date, tags, categories,
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
          {/* <span style={{ marginLeft: '16px' }}>{ moment(date).format('MMM D, YYYY') }</span> */}
          <ReturnDateString data={date}/>
        </div>
      </div>
    </div>
    <TagsMeta tags={tags} categories={categories} />
  </div>
);

export default EntryMeta;
