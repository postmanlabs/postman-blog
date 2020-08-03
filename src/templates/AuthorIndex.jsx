import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PageSelectionButtons from '../components/Shared/PageSelectionButtons';
import SEO from '../components/seo';
import HeroResultsAuthor from '../components/Shared/HeroResultsAuthor';
import ListHeader from '../components/Shared/ListHeader';


const authorPostsList = ({ data, pageContext }) => {
  const { user } = data.wpgraphql;
  const { totalAuthorPages, authorPageNum, totalNumberOfPosts } = pageContext;
  const posts = data.wpgraphql.user.posts.edges;
  const title = user.firstName || 'The Postman Team';

  const fullName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : title;

  return (
    <Layout>
      <SEO title={fullName} />
      <HeroResultsAuthor title={title} totalPosts={totalNumberOfPosts} />
      <div className="list-wrapper">
        <div className="container">
          {Array.isArray(posts) && posts.map((post) => {
            const postTitle = post.node.title;
            const postExcerpt = post.node.excerpt;
            const { featuredImage, slug, date } = post.node;
            const authorSlug = post.node.author.slug || 'thepostmanteam';
            const name = post.node.author.name || 'The Postman Team';
            const avatar = post.node.author.avatar.url || '';
            const keyPostId = post.node.id;
            return (
              <div key={keyPostId} className="post">
                <ListHeader
                  authorSlug={authorSlug}
                  name={name}
                  avatar={avatar}
                  date={date}
                  slug={slug}
                  featureImage={featuredImage}
                  postTitle={postTitle}
                  postExcerpt={postExcerpt}
                />
              </div>
            );
          })}
          {totalAuthorPages > 1 && (
            <PageSelectionButtons currentPage={authorPageNum} totalPages={totalAuthorPages} prefix={`/author/${user.slug}`} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default authorPostsList;

export const authorPostsQuery = graphql`
  query GET_PAGE_POSTS_OF_AUTHOR($id: ID!,  $startCursor: String!) {
    wpgraphql {
      user(id: $id){
        avatar {
          url
        }
        firstName
        lastName
        username
        slug
        posts (first: 10, after: $startCursor) {
          edges {
            node {
              id
              excerpt
              title
              slug
              date
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
            }
          }
        }
      }
    }
}`;
