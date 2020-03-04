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
import { render } from 'react-dom';

function SEO({
  lang, meta, title,
}) {
  const { site, wpgraphql } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        wpgraphql {
          posts {
            edges {
              node {
                seo {
                  metaDesc
                  opengraphDescription
                  opengraphTitle
                  title
                  twitterDescription
                  twitterTitle
                  opengraphImage {
                    altText
                    mediaItemUrl
                  }
                  twitterImage {
                    altText
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
      }
    `,
  );

  const posts = wpgraphql.posts.edges;

  {posts.map((post) => {
      const { metaDesc } = post.node.seo;
      // const { twitterTitle } = post.node.twitterTitle;
      const metaDescription = metaDesc || site.siteMetadata.description;
      // const twitterTitle = twitterTitle || site.siteMetadata.title;
      // const twitterDescription = twitterDescription || site.siteMetadata.description;
    console.log(metaDescription)
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
              content: metaDescription,
            },
            {
              property: 'og:title',
              content: title,
            },
            {
              property: 'og:description',
              content: metaDescription,
            },
            {
              property: 'og:type',
              content: 'blog',
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
              content: metaDescription,
            },
          ].concat(meta)}
        > {console.log('//////////////////',metaDescription)}
          {/* fonts */}
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap" rel="stylesheet" />
          {/* Bootstrap */}
          <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
          {/* Algolia IE11 support */}
          <script src="https://polyfill.io/v3/polyfill.min.js?features=default,Array.prototype.find,Array.prototype.includes" />
        </Helmet>
      );
    });
  };
};

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
