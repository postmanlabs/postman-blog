/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import sanitizeHTML from 'sanitize-html';
import socialDefault from '../../static/social-default.jpg';

function SEO({
  description, lang, meta, title, image, canonical,
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  );


  const metaDescription = description || site.siteMetadata.description;
  const siteName = 'Postman Blog';
  const previewImage = image || socialDefault;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: sanitizeHTML(metaDescription),
        },
        {
          property: 'og:title',
          content: sanitizeHTML(title),
        },
        {
          property: 'og:description',
          content: sanitizeHTML(metaDescription),
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:site_name',
          content: siteName,
        },
        {
          property: 'og:image',
          content: previewImage,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: sanitizeHTML(metaDescription),
        },
        {
          name: 'twitter:image',
          content: previewImage,
        },
      ].concat(meta)}
    >
      {/* canonical url */}
      <link rel="canonical" href={canonical} />
      {/* fonts */}
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap" rel="stylesheet" />
      {/* Algolia IE11 support */}
      <script src="https://polyfill.io/v3/polyfill.min.js?features=default,Array.prototype.find,Array.prototype.includes" />
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  description: '',
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
