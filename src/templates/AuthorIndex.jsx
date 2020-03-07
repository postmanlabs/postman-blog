import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import EntryMeta from '../components/Shared/EntryMeta';
import PageSelectionButtons from '../components/Shared/PageSelectionButtons';
import SEO from '../components/seo';
import FluidImage from '../components/FluidImage';
import HeroResults from '../components/Shared/HeroResults';

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
              author {
                name
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

const authorPostsList = ({ data, pageContext }) => {
  const { user } = data.wpgraphql;
  const { totalAuthorPages, authorPageNum, totalNumberOfPosts } = pageContext;
  const posts = data.wpgraphql.user.posts.edges;
  const authorSlug = data.wpgraphql.user.slug;
  const title = user.firstName || 'The Postman Team';

  let fullName;
  fullName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : title;

  return (
    <Layout>
      <SEO title={fullName} />
      <HeroResults title={title} totalPosts={totalNumberOfPosts}/>
      <div className="container">
        {posts.map((post) => {
          const postTitle = post.node.title;
          const postExcerpt = post.node.excerpt;
          const { featuredImage, slug, date } = post.node;
          const name = post.node.author.name || 'The Postman Team';
          const avatar = post.node.author.avatar.url || '';

          return (
            <div key={post.node.id} className="post">
              <FluidImage image={featuredImage} />
              <Link to={slug}>
                <h1 dangerouslySetInnerHTML={{ __html: postTitle }} />
              </Link>
              <EntryMeta
                authorSlug={authorSlug}
                name={name}
                avatar={avatar}
                date={date}
              />
              <p dangerouslySetInnerHTML={{ __html: postExcerpt }} />
            </div>
          );
        })}
        {totalAuthorPages > 1 && (
          <PageSelectionButtons currentPage={authorPageNum} totalPages={totalAuthorPages} prefix={`${user.slug}`} />
        )}
      </div>
    </Layout>
  );
};

export default authorPostsList;
