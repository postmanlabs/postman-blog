// Header used for Blog list view in index and page 2
import React from 'react';
import EntryMeta from './EntryMeta';
import FluidImage from '../FluidImage';
import TagsMeta from './Tags';


const ListHeader = ({
  featuredImage, slug, name, avatar, date, postTitle, authorSlug, postExcerpt, tags, categories,
}) => (
  <div className="row header-wrapper">
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
      <FluidImage image={featuredImage} />
    </div>
  </div>
);

export default ListHeader;
