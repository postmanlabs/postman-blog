import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"


export const pageQuery = graphql`
{ wpgraphql {
  pages {
    edges {
      node {
        uri
        title
        slug
        content
        featuredImage {
          altText
          sourceUrl
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
  posts (first: 30) {
    edges {
      node {
        uri
        id
        title
        content
        featuredImage {
          sourceUrl
          mediaDetails {
            file
          }
          altText
        }
        date
        author {
          name
          slug
          username
        }
        comments {
          edges {
            node {
              date
              content
              id
            }
          }
          nodes {
            content
          }
        }
        commentCount
      }
    }
  }
}
}
`

const IndexPage = ({data}) => {
  const sections = data.wpgraphql.pages.edges;
  const posts = data.wpgraphql.posts.edges;
  return (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <pre>{JSON.stringify(data, null, 4)}</pre>
    {sections.map(section => {
      const title = section.node.title;
      return <h1>Page Title: {title}</h1>
    })}

    {posts.map(post => {
      const comment = post.node.commentCount;
      const commentTitle = post.node.title
      const photo = post.node.featuredImage; 
      if (comment) {
      return <h3>The post: '{commentTitle}' has {comment} comments.</h3>;
      }
      if (photo) {
        return <img src={photo.sourceUrl} alt={photo.altText} />
      }
      return <div> </div>
    })}

    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
  )
}

export default IndexPage
