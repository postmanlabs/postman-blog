import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import FluidImage from '../components/FluidImage';
import EntryMeta from '../components/Shared/EntryMeta';
import PageSelectionButtons from '../components/Shared/PageSelectionButtons';


const BlogIndex = ({ data }) => {
  const currentPage = 1;
  const { totalPages } = 28;
  const posts = data.wpgraphql.posts.edges;
  return (
    <Layout>
      <SEO title="Home" />
      <div className="container" style={{ paddingTop: '120px' }}>
        {posts.map((post) => {
          const postTitle = post.node.title;
          const postExcerpt = post.node.excerpt;
          const authorSlug = post.node.author.slug;
          const { slug, date, featuredImage } = post.node;

          const name = post.node.author.name || 'The Postman Team';
          const avatar = post.node.author.avatar.url || '';

          return (
            <div key={post.node.id} className="post">
              <FluidImage image={featuredImage} />
              <a href={slug} style={{ color: '#282828' }}>
                <h2 dangerouslySetInnerHTML={{ __html: postTitle }} />
              </a>
              <EntryMeta
                authorSlug={authorSlug}
                name={name}
                avatar={avatar}
                date={date}
              />
              <div dangerouslySetInnerHTML={{ __html: postExcerpt }} />
            </div>
          );
        })}
        <PageSelectionButtons currentPage={currentPage} totalPages={totalPages} />
      </div>
    </Layout>
  );
};

export default BlogIndex;


export const First10Posts = graphql`
  query GET_FIRST_10_POSTS{
    wpgraphql {
      posts(first: 10) {
        edges {
          node {
            id
            title
            excerpt
            date
            slug
            uri
            author {
              name
              slug
              avatar {
                url
              }
            }
            featuredImage {
              sourceUrl
              altText
            }
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
    }
  }
`;
