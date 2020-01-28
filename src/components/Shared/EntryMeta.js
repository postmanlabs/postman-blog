import React from "react"
import { useStaticQuery, graphql } from "gatsby"
// import Image from "gatsby-image"

// receive id as prop? and match the id of the post with the author and print author gravatar, name and published date in this component on index page and the blog page

// useStaticQuery is used in components


const EntryMeta = () => {
  const data = useStaticQuery(graphql`
    {
      wpgraphql {
        posts {
          edges {
            node {
              author {
                avatar {
                  url
                }
                name
              }
              date
            }
          }
        }
      }
    }
  `)
  const authors = data.wpgraphql.posts.edges;
  console.log('////////////////data authors', authors)
   
    //  <img src={author.node.url} alt={author.node.name} />
    // {authors.map(author => {
    //   const authorName = author.node.author.name;
    //   return (
    //     <h2>{authorName}</h2>
    //   )
    // })}

    return (
      <div>This is the Entry Meta</div>
    )
}

export default EntryMeta;