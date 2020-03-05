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
  let title;
  if (user.firstName) {
    title = user.firstname
  } else {
    title = 'The Postman Team'
  }
  const { totalAuthorPages, authorPageNum, totalNumberOfPosts } = pageContext;
  const posts = data.wpgraphql.user.posts.edges;

  return (
    <Layout>
      <SEO title="author" />
      <HeroResults title={title} totalPosts={totalNumberOfPosts}/>
      <div className="container">
        {posts.map((post) => {
          const postTitle = post.node.title;
          const postExcerpt = post.node.excerpt;
          const { featuredImage, slug, date } = post.node;

          let name;
          let avatar;
          if (post.node.author) {
            name = post.node.author.name;
            avatar = post.node.author.avatar.url;
          } else {
            name = 'The Postman Team';
            avatar = '';
          }
          return (
            <div key={post.node.id} className="post">
              <FluidImage image={featuredImage} />
              <Link to={slug}>
                <h1 dangerouslySetInnerHTML={{ __html: postTitle }} />
              </Link>
              <EntryMeta name={name} avatar={avatar} date={date}/>
              <p dangerouslySetInnerHTML={{ __html: postExcerpt }} />
            </div>
          )
        })}
        {totalAuthorPages > 1 && (
          <PageSelectionButtons currentPage={authorPageNum} totalPages={totalAuthorPages} prefix={`${category.slug}`} />
        )}
      </div>
    </Layout>
  )
}

export default authorPostsList;