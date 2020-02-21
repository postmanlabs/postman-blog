import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import EntryMeta from '../components/Shared/EntryMeta';
import SEO from '../components/seo';
import FluidImage from '../components/FluidImage';

export const categoriesPostQuery = graphql`
  query GET_POSTS_OF_CATEGORY ($id: ID!) {
    wpgraphql {
      category(id: $id){
        id
        name
        slug
        posts {
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
            }
          }
        }
      }
    }
  }
`;
// { data }
const categoriesPostsList = ({ data }) => {
  const { category } = data.wpgraphql;
  const title = category.name;
  const posts = category.posts.edges;

  return (
    <Layout>
      <SEO title="Category" />
      <h1>
        {title}
      </h1>
      {posts.map((post) => {
        const postTitle = post.node.title;
        const postExcerpt = post.node.excerpt;
        const tags = post.node.tags.edges;

        const { slug, date } = post.node;

        const { name } = post.node.author;
        const avatar = post.node.author.avatar.url;

        const { featuredImage } = post.node;

        return (
          <div key={post.node.id} className="post">
            <FluidImage image={featuredImage} />
            <Link to={slug}>
              <h1 dangerouslySetInnerHTML={{ __html: postTitle }} />
            </Link>
            <EntryMeta name={name} avatar={avatar} date={date} tags={tags} categories={category} />
            <p dangerouslySetInnerHTML={{ __html: postExcerpt }} />
          </div>
        );
      })}
    </Layout>
  );
};

export default categoriesPostsList;
