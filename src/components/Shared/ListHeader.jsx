// Header used for Blog list view in index and page 2
import React from 'react';
import EntryMeta from '../Shared/EntryMeta';
import FluidImage from '../FluidImage';
import TagsMeta from '../Shared/Tags';


const ListHeader = ({
  featuredImage, slug, name, avatar, date, postTitle, authorSlug, postExcerpt, tags, categories
}) => (
  <div className="row header-line">
    <div className="col-8">
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
        <a href={`/${slug}`}>
          <h2 dangerouslySetInnerHTML={{ __html: postTitle }} />
        </a>
        {/* tags */}
        <TagsMeta tags={tags} categories={categories} />
        {/* excerpt */}
        <div dangerouslySetInnerHTML={{ __html: postExcerpt }} />
    </div>
    <div className="col-4">
      <FluidImage image={featuredImage} />
    </div>    
        
  </div> // end of row
)

export default ListHeader;

