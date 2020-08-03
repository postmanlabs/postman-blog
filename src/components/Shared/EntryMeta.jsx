import React from 'react';
import { Link } from 'gatsby';
import uuidv4 from 'uuid/v4';
import ReturnDateString from './ReturnDateString';


const EntryMeta = ({
  name, avatar, authorSlug, date,
}) => (
  <div className="entry-meta" key={uuidv4()}>
    <div className="entry-meta-col">
      <span><img className="entry-meta-img" src={avatar} alt={name} /></span>
      <span><Link to={`/author/${authorSlug}/page/1`}>{name}</Link></span>
      <span><ReturnDateString data={date} /></span>
    </div>
  </div>
);


export default EntryMeta;
