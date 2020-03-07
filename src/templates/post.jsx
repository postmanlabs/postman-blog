import React from 'react';
import { graphql } from 'gatsby';
import '../components/_layout.scss';
import './_post.scss';
import parse from 'html-react-parser';
import JustComments from 'gatsby-plugin-just-comments';
import Layout from '../components/layout';
import EntryMeta from '../components/Shared/EntryMeta';
import SEO from '../components/seo';
import FluidImage from '../components/FluidImage';
// import PostForm from '../components/Shared/PostForm';


export const postPageQuery = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        featuredImage {
          sourceUrl
          altText
        }
        id
        uri
        title
        content 
        author {
          avatar {
            url
          }
          name
          slug
        }
        date
        tags {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
        categories {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`;

const BlogPostTemplate = ({ data }) => {
  const { post } = data.wpgraphql;
  const {
    title, content, date, featuredImage, slug,
  } = data.wpgraphql.post;
  const authorSlug = data.wpgraphql.post.author.slug;

  const name = data.wpgraphql.post.author.name || 'The Postman Team';
  const avatar = data.wpgraphql.post.author.avatar.url || '';
  const tags = post.tags.edges;
  const categories = data.wpgraphql.post.categories.edges[0].node;

  return (
    <Layout>
      <SEO title={title} />
      <div className="indexPost container post-body-container">
        <FluidImage image={featuredImage} />
        <a href={slug}>
          <h1 className="h2" dangerouslySetInnerHTML={{ __html: title }} />
        </a>
        <EntryMeta
          name={name}
          authorSlug={authorSlug}
          avatar={avatar}
          date={date}
          tags={tags}
          categories={categories}
        />
        <div>
          {parse(content, {
            replace: (domNode) => {
              if (domNode.attribs && domNode.attribs['data-src']) {
                // '?format=pjpg&quality=60&auto=webp' is
                // appended to img src for Fastly image optimization
                return (
                  <img
                    src={`${domNode.attribs['data-src']}?format=pjpg&quality=60&auto=webp`}
                    alt={domNode.attribs.alt}
                  />
                );
              }
            },
          })}
        </div>
        <JustComments
          className="just-comments myTheme"
          data-recaptcha="true"
          apikey="process.env.JUST_COMMENTS_API"
          hideattribution="true"
        />
        {/* <PostForm />   */}
      </div>
    </Layout>
  );
};

export default BlogPostTemplate;
