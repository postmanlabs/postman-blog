import React from 'react';
// import { Link } from 'gatsby';
import './_entry-meta.scss';
import moment from "moment/moment";
import TagsMeta from '../Shared/Tags';

const EntryMeta = ({
  name, avatar, date, tags, categories,
}) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="row entry-meta">
          <div className="col-1 entry-meta-col">
            <img className="entry-meta-img" src={avatar} alt={name} />
          </div>
          <div className="col-11 entry-meta-data">
            {name}
            {' '}
            <span style={{"marginLeft": "16px"}}>{ moment(date).format(`MMM D, YYYY`) }</span>
          </div>
        </div>
      </div>
 
      <TagsMeta tags={tags} categories={categories} />
    </div>
  );
};

export default EntryMeta;
