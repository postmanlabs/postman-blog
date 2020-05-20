// Header used for Blog page
import React from 'react';
import EntryMeta from './EntryMeta';
import FluidImage from '../FluidImage';

import BreadCrumbs from './Breadcrumbs';
import TagsMetaHeader from './TagsMetaHeader';

const BlogHeader = ({
  featuredImage, name, avatar, date, postTitle, authorSlug, tags, categories, slug,
}) => (
  <div className="blog-header-wrapper">
    <div className="container">
      <BreadCrumbs title={postTitle} slug={slug} />
      <div className="row blog-header">
        <div className={`${featuredImage ? 'col-md-8 blog-header-title' : 'col-md-12 blog-header-title'}`}>
          {/* title */}
          <h1 dangerouslySetInnerHTML={{ __html: postTitle }} />
        </div>
        <div className={`${featuredImage ? 'col-md-4 text-lg-right' : 'img-wrapper-square-no-image'}`}>
          <div className="img-wrapper-square mb-3">
            <div className="img-wrapper-alignment">
              <FluidImage image={featuredImage} className="img-positioning" />
            </div>
          </div>
        </div>

      </div>

      <div className="row blog-header-border">
        <div className="col-sm-12 col-lg-5 blog-header-entry">
          <EntryMeta
            authorSlug={authorSlug}
            name={name}
            avatar={avatar}
            date={date}
            tags={tags}
            categories={categories}
          />
        </div>
        {/* tags */}
        <div className="col-sm-12 col-lg-7 blog-tags">
          <TagsMetaHeader tags={tags} />
        </div>
      </div>
    </div>
  </div>
);


export default BlogHeader;
