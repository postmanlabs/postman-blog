// this is the blog list view page 2 - n
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PageSelectionButtons from '../components/Shared/PageSelectionButtons';
import ListHeader from '../components/Shared/ListHeader';

const PostsIndex = ({ data, pageContext }) => {
  const currentPage = pageContext.pageNum;
  const { totalPages } = pageContext;
  const posts = data.wpgraphql.posts.edges;
  return (
    <Layout>
      <SEO title="Home" />
      <div className="list-wrapper">
        <div className="container">
          {posts && posts.map((post) => {
            const postTitle = post.node.title;
            const postExcerpt = post.node.excerpt;
            const tags = post.node.tags.edges;
            const categories = post.node.categories.edges[0].node;
            const { slug, date, featuredImage } = post.node;


            const name = post.node.author.name || 'The Postman Team';
            const avatar = post.node.author.avatar.url || '';
            const authorSlug = post.node.author.slug;
            const keyPostId = post.node.id;
            return (
              <div key={keyPostId} className="post">
               
                <ListHeader
                  authorSlug={authorSlug}
                  name={name}
                  avatar={avatar}
                  date={date}
                  slug={slug}
                  featuredImage={featuredImage}
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

export default PostsIndex;


export const getNextPosts = graphql`
  query GET_NEXT_POSTS($startCursor: String!){
    wpgraphql {
      posts(first: 10, after: $startCursor) {
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
