import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PageSelectionButtons from '../components/Shared/PageSelectionButtons';
import SEO from '../components/seo';
import HeroResults from '../components/Shared/HeroResults';
import ListHeader from '../components/Shared/ListHeader';

export const catsPostsQuery = graphql`
  query GET_PAGE_POSTS_OF_CATEGORY($id: ID!, $startCursor: String!) {
    wpgraphql {
        category(id: $id){
            name
            slug
            posts (first: 10, after: $startCursor) {
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
                  
                }
              }
            }
          }
        }
      }`;

// tags {
//   edges {
//     node {
//       id
//       name
//       slug
//     }
//   }
// }
// categories {
//   edges {
//     node {
//       id
//       name
//       slug
//     }
//   }
// }

const CatsPostsList = ({ data, pageContext }) => {
  const { category } = data.wpgraphql;
  const title = category.name;
  const posts = category.posts.edges;
  const { totalCatsPages, catsPageNum, totalNumberOfPosts } = pageContext;

  return (
    <Layout>
      <SEO title={title} />
      <HeroResults title={title} totalPosts={totalNumberOfPosts} />
      <div className="list-wrapper">
        <div className="container">
          {posts.map((post) => {
            const postTitle = post.node.title;
            const postExcerpt = post.node.excerpt;
            // const tags = post.node.tags.edges;
            // const category = post.node.categories;
            const { slug, date, featuredImage } = post.node;
            const authorSlug = post.node.author.slug || 'thepostmanteam';
            const name = post.node.author.name || 'The Postman Team';
            const avatar = post.node.author.avatar.url || '';

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
                />
              </div>
            );
          })}
          {totalCatsPages >= 1 && (
            <PageSelectionButtons currentPage={catsPageNum} totalPages={totalCatsPages} prefix={`${category.slug}`} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CatsPostsList;
