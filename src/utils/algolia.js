
// The queries allow you to grab the data you want Algolia to index
// directly from Gatsby's GraphQL layer by exporting from src/utils/algolia.js
// an array of objects, each containing a required GraphQL query and an optional
// index name, transformer function and settings object.

//  the query property is a GraphQL query string.
// The transformer is a function that takes the data retrieved by the query and
// transforms it into the array of objects that will become
// your Algolia index records.


// const algoliaPostQuery = `query($after:String){
//   wpgraphql {
//     posts (first: 100 after: $after) {
//       pageInfo {
//         endCursor
//         hasNextPage
//       }
//       edges {
//         node {
//           id
//           title
//           excerpt
//           date
//           slug
//           uri
//           author {
//             name
//             avatar {
//               url
//             }
//           }
//           featuredImage {
//             sourceUrl
//             altText
//           }
//         }
//       }
//     }
//   }
// }`;

// const flatten = (arr) => arr.map(({ node: { ...rest } }) => ({
//   ...rest,
// }));

// const settings = { attributesToSnippet: ['excerpt:20'] };

// const queries = [
//   {
//     query: algoliaPostQuery,
//     transformer: ({ data }) => flatten(data.wpgraphql.posts.edges),
//     indexName: 'blog',
//     settings,
//   },
// ];

// module.exports = queries;

/******************************************************************************************* */
/* Lightweight Algolia entries
**********************************************************************************************/

const postQuery = `query($after:String){
  wpgraphql {
    posts(first: 100 after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        title
        excerpt
        date
        slug
      }
    }
  }
}
`
const settings = { attributesToSnippet: ['excerpt:20'] };
const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => {
      data.wpgraphql.posts.nodes.forEach(el => {
        el.content = el.content
      })
      return data.wpgraphql.posts
    },
    indexName: 'blog',
    settings
  }
]
module.exports = queries
