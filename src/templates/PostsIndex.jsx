import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import FluidImage from '../components/FluidImage';
import EntryMeta from '../components/Shared/EntryMeta';
import PageSelectionButtons from '../components/Shared/PageSelectionButtons';


const PostsIndex = ({ data, pageContext }) => {
  const currentPage = pageContext.pageNum;
  const { totalPages } = pageContext;
  const posts = data.wpgraphql.posts.edges;
  return (
    <Layout>
      <SEO title="Home" />

      {posts.map((post) => {
        console.log(post)
        const postTitle = post.node.title;
        const postExcerpt = post.node.excerpt;
        const tags = post.node.tags.edges;

        const categories = post.node.categories.edges[0].node;
        const { slug, date } = post.node;

        let name;
        let avatar;
        if (data.wpgraphql.post && data.wpgraphql.post.author) {
          name = data.wpgraphql.post.author.name;
          avatar = data.wpgraphql.post.author.avatar.url;
        } else {
          name = 'Christina'
          avatar = ''
        }

        // const { name } = post.node.author;
        // const avatar = post.node.author.avatar.url;

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
      <PageSelectionButtons currentPage={currentPage} totalPages={totalPages} />
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
