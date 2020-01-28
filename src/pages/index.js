import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
// import Image from "../components/image";
import SEO from "../components/seo";

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
            author {
              avatar {
                url
              }
              name
            }
          }
        }
      }
    }
  }
`
const BlogIndex = ({data}) => {

  const posts = data.wpgraphql.posts.edges;


  return (
    <Layout>
      <SEO title="Home" />
      {posts.map(post => {
        const postTitle = post.node.title;
        const authorName = post.node.author.name;
        const postExcerpt = post.node.excerpt
        
        return (
          <article key={post.node.id}>
            <h1>
              <Link to={postTitle}>{postTitle}</Link>
            </h1>
            <h3>{authorName}</h3>
            <p dangerouslySetInnerHTML={{__html: postExcerpt}} />
          </article>
        )
      })}
    </Layout>

  )


}


export default BlogIndex;