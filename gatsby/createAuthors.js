const path = require('path');
const fetchAllItems = require('../helpers/fetchAllItems');


module.exports = async ({ actions, graphql }) => {
  const allAuthorResults = await graphql(`
  {
    wpgraphql {
      users(first: 100) {
        edges {
          node {
            avatar {
              url
            }
            id
            firstName
            lastName
            username
            name
            slug
            posts(first: 100) {
              edges {
                node {
                  id
                }
                cursor
              }
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }`);

  const authors = allAuthorResults.data.wpgraphql.users.edges;
  const authorPageInfo = allAuthorResults.data.wpgraphql.users.pageInfo;

  const allAuthorArray = await fetchAllItems(graphql, authorPageInfo, authors, 'users', 'id name slug posts(first: 100) { edges { node { title id } cursor } }');

  const { createPage } = actions;

  const authorIndex = path.resolve('./src/templates/AuthorIndex.jsx');
  const authorPostsPerPage = 10;
  const pageIncrement = authorPostsPerPage - 1;

  allAuthorArray.map((author) => {
    let authorPageNum = 1;
    const totalAuthorPages = Math.ceil((author.node.posts.edges.length / authorPostsPerPage));

    const authorPosts = author.node.posts;
    const authorPostsLength = authorPosts.edges.length;

    if (authorPostsLength !== 0) {
      authorPosts.edges[0].cursor = '';
      if (authorPostsLength <= authorPostsPerPage) {
        createPage({
          path: `author/${author.node.slug}/page/${authorPageNum}`,
          component: authorIndex,
          context: {
            id: author.node.id,
            startCursor: authorPosts.edges[0].cursor,
            authorPageNum,
            totalAuthorPages,
            totalNumberOfPosts: authorPostsLength,
          },
        });
      } else {
        let count = 0;
        let adjustEdges = 0;

        for (let i = 0; i < authorPostsLength; i+= pageIncrement) {
          // First pass (only)
          if (!i) {
            // account for (messy) divison rounding
            adjustEdges = (Math.floor((authorPostsLength / authorPostsPerPage)) + i) - 1;
          }
          // Last pass (only)
          if (Math.floor((authorPostsLength / authorPostsPerPage)) === count) {
            // make edge adjustments
            for (let j = 0; j < adjustEdges; j += 1) {
              author.node.posts.edges.shift();
            }
          }
          const startCursorPage = authorPosts.edges[i] && authorPosts.edges[i].cursor;

          const cursorPage = startCursorPage || '';
          createPage({
            path: `author/${author.node.slug}/page/${authorPageNum}`,
            component: authorIndex,
            context: {
              id: author.node.id,
              startCursor: cursorPage,
              authorPageNum,
              totalAuthorPages,
              totalNumberOfPosts: authorPostsLength,
            },
          });
          authorPageNum += 1;
          count += 1;
        }
        // console.log(`Author page for ${author.node.name} has pagination.`);
      }
    }
  });
  // console.log(`Created ${allAuthorArray.length} author pages`);
};
