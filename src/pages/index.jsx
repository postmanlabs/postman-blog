// this is the index blog list view 

import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

import PageSelectionButtons from '../components/Shared/PageSelectionButtons';
import ListHeader from '../components/Shared/ListHeader';


const BlogIndex = ({ data }) => {
  const currentPage = 1;
  const { totalPages } = 28;
  const posts = data.wpgraphql.posts.edges;
  return (
    <Layout>
      <SEO title="Home" />
      <div className="list-wrapper">
        <div className="container">
          {posts.map((post) => {
            const postTitle = post.node.title;
            const postExcerpt = post.node.excerpt;
            const { slug, date, featuredImage } = post.node;
            const tags = post.node.tags.edges;
            const categories = post.node.categories.edges[0].node;
            
            const name = post.node.author.name || 'The Postman Team';
            const avatar = post.node.author.avatar.url || '';
            const authorSlug = post.node.author.slug;

            return (
              <div key={post.node.id} className="post">
                <ListHeader 
                  authorSlug={authorSlug}
                  name={name}
                  avatar={avatar}
                  date={date}
                  slug={slug}
                  featureImage={featuredImage}
                  postTitle={postTitle}
                  postExcerpt={postExcerpt}
                  tags={tags}
                  categories={categories}
                />
              </div>
            );
          })}
          <PageSelectionButtons currentPage={currentPage} totalPages={totalPages} />
        </div>
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
