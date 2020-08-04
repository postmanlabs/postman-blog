// Header used for Blog list view in index and page 2
import React from 'react';
import { Link } from 'gatsby';
import uuidv4 from 'uuid/v4';
import EntryMeta from './EntryMeta';
import FluidImage from '../FluidImage';
import TagsMeta from './Tags';


const ListHeader = ({
  featuredImage,
  slug,
  name,
  avatar,
  date,
  postTitle,
  authorSlug,
  postExcerpt,
  tags,
  categories,
  key,
}) => (
  <div className="row header-wrapper" key={uuidv4()}>
    <div className="col-lg-8">
      {/* entry meta */}
      <EntryMeta
        authorSlug={authorSlug}
        name={name}
        avatar={avatar}
        date={date}
        tags={tags}
        categories={categories}
      />
      {/* title */}
      <a className="header-linked" href={`/${slug}`}>
        <h2 dangerouslySetInnerHTML={{ __html: postTitle }} />
      </a>
      {/* tags */}
      <TagsMeta tags={tags} />
      {/* excerpt */}
      <div dangerouslySetInnerHTML={{ __html: postExcerpt }} />
    </div>

    <div className="col-lg-4 feature-image">
      <div className={`${featuredImage ? 'img-wrapper-square mb-3' : 'img-wrapper-square-no-image'}`}>
        <Link to={`/${slug}`} className="img-wrapper-alignment">
          <FluidImage image={featuredImage} className="img-positioning" />
        </Link>
      </div>
    </div>
  </div>
);

export default ListHeader;
