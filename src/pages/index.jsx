import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import FluidImage from '../components/FluidImage';
import EntryMeta from '../components/Shared/EntryMeta';


const BlogIndex = ({ data }) => {
  const posts = data.wpgraphql.posts.edges;
  return (
    <Layout>
      <SEO title="Home" />

      {posts.map((post) => {
        const postTitle = post.node.title;
        const postExcerpt = post.node.excerpt;
        const tags = post.node.tags.edges;

        const categories = post.node.categories.edges[0].node;
        console.log('CATEGORIES :::::::::::::', categories);
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
            <EntryMeta name={name} avatar={avatar} date={date} tags={tags} categories={categories} />
            <p dangerouslySetInnerHTML={{ __html: postExcerpt }} />
          </div>
        );
      })}
    </Layout>

  );
};

export default BlogIndex;


export const AllPostQuery = graphql`
  {
    wpgraphql {
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
