import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import EntryMeta from '../components/Shared/EntryMeta';
import SEO from '../components/seo';
import FluidImage from '../components/FluidImage';


export const tagsPostsQuery = graphql`
  query GET_POSTS_OF_TAG ($id: ID!) {
    wpgraphql {
        tag(id: $id){
            name
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
const TagsPostsList = ({ data }) => {
//   const { post } = data.wpgraphql
  console.log(data.wpgraphql.tag);
  const { tag } = data.wpgraphql;
  const title = tag.name;
  const posts = tag.posts.edges;
  console.log(posts);

  return (
    <Layout>
      <SEO title="post" />
      <h1>
#
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
            <EntryMeta name={name} avatar={avatar} date={date} tags={tags} />
            <p dangerouslySetInnerHTML={{ __html: postExcerpt }} />
          </div>
        );
      })}
    </Layout>
  );
};

export default TagsPostsList;
