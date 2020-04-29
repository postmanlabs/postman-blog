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
        <div className="col-md-8 blog-header-title">
          {/* title */}
          <h2 dangerouslySetInnerHTML={{ __html: postTitle }} />
        </div>
        <div className="col-md-4 text-lg-right">
          <div className={`${featuredImage ? 'img-wrapper-square mb-3' : 'img-wrapper-square-no-image mb-3'}`}>
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
