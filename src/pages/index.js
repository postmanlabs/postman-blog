import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
// import Image from "../components/image";
import SEO from "../components/seo";

import EntryMeta from '../components/Shared/EntryMeta'


const BlogIndex = ({data}) => {

  const posts = data.wpgraphql.posts.edges;

  return (
    <Layout>
      <SEO title="Home" />

      {posts.map(post => {
        const postTitle = post.node.title;
        const postExcerpt = post.node.excerpt;
        const slug = post.node.slug;

        return (
          <article key={post.node.id} className={"post"}>
            <Link to={slug}>
            <h1 dangerouslySetInnerHTML={{__html: postTitle}} />
            </Link>
            <EntryMeta />
            <p dangerouslySetInnerHTML={{__html: postExcerpt}} />
          </article>
        )
      })}
    </Layout>

  )
}

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
          }
        }
      }
    }
  }
`