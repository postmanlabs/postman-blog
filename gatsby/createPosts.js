const fetchAllItems = require('../helpers/fetchAllItems');
const path = require('path')

module.exports = async ({ actions, graphql }) => {
  //  Initial GraphQL query.  Returns first 100 posts.
  const allPostsResults = await graphql(`
  {
    wpgraphql {
      posts(first: 100) {
        edges {
          node {
            slug
            id
            title
            excerpt
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
  `);

  if (allPostsResults.errors) {
    console.error(postsResults.errors);
  }
  const posts = allPostsResults.data.wpgraphql.posts.edges;
  const postsPageInfo = allPostsResults.data.wpgraphql.posts.pageInfo;
  // Puts initial call into array, makes as many additional GraphQL calls as needed to get the rest
  const allPostsArray = await fetchAllItems(graphql, postsPageInfo, posts, 'posts', 'id slug');
  // Grab createPage function from Gatsby's actions object.
  const {createPage} = actions;

  const postTemplate = path.resolve('./src/templates/PostPage.jsx');  

  allPostsArray.map((edge) => {
    createPage({
      path: `/${edge.node.slug}/`,
      component: postTemplate,
      context: {
        id: edge.node.id,
      },
    });
  });
  console.log(`Created ${allPostsArray.length} pages for each blog post`);
  
  const postsPerPage = 10;
  let pageNum = 1;

  const totalPages = Math.ceil((allPostsArray.length / postsPerPage));

  const PostsIndex = path.resolve('./src/templates/PostsIndex.jsx');

  for (let i = 0; i < allPostsArray.length; i += postsPerPage) {
    createPage({
      path: `page/${pageNum}`,
      component: PostsIndex,
      context: {
        startCursor: allPostsArray[i].cursor,
        pageNum,
        totalPages,
      },
    });
    pageNum += 1;
  }
  console.log(`Created ${pageNum - 1} number of pages for post pagination`);
}