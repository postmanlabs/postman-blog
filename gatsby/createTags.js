const path = require('path');
const fetchAllItems = require('../helpers/fetchAllItems');


module.exports = async ({ actions, graphql }) => {
  const allTagsResults = await graphql(`
  {
    wpgraphql {
      tags(first: 100) {
        edges {
          node {
            id
            name
            slug
            posts(first:100) {
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
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }`);

  if (allTagsResults.errors) {
    console.error(allTagsResults.errors);
  }
  const tags = allTagsResults.data.wpgraphql.tags.edges;
  const tagsPageInfo = allTagsResults.data.wpgraphql.tags.pageInfo;

  const allTagsArray = await fetchAllItems(graphql, tagsPageInfo, tags, 'tags', 'id name slug posts(first: 100) { edges { node { title id } cursor } }');
  const { createPage } = actions;

  const TagsIndex = path.resolve('./src/templates/TagsIndex.jsx');
  const tagsPostsPerPage = 10;
  const pageIncrement = tagsPostsPerPage - 1;

  // eslint-disable-next-line array-callback-return
  allTagsArray.map((tag) => {
    let tagsPageNum = 1;
    const tagPosts = tag.node.posts;
    const tagPostsLength = tagPosts.edges.length;
    const totalTagsPages = Math.ceil((tagPostsLength / tagsPostsPerPage));
    // Loop through array of tags, check to make sure it actually has posts
    if (tag.node.posts.edges.length !== 0) {
      // if so, set first curosr as empty string to include first post
      // eslint-disable-next-line no-param-reassign
      tag.node.posts.edges[0].cursor = '';
      // If only a single pagination page is needed, make it
      if (tag.node.posts.edges.length <= tagsPostsPerPage) {
        createPage({
          path: `tags/${tag.node.slug}/page/${tagsPageNum}`,
          component: TagsIndex,
          context: {
            id: tag.node.id,
            startCursor: tag.node.posts.edges[0].cursor,
            tagsPageNum,
            totalTagsPages,
            totalNumberOfPosts: tag.node.posts.edges.length,
          },
        });
      } else {
        let count = 0;
        let adjustEdges = 0;

        // Else, there we will need multiple pagination pages
        // Loop over tags 10 at a time, 1 page for each 10 posts
        for (let i = 0; i < tagPostsLength; i += pageIncrement) {
          // First pass (only)
          if (!i) {
            // account for (messy) divison rounding
            adjustEdges = (Math.floor((tagPostsLength / tagsPostsPerPage)) + i) - 1;
          }
          // Last pass (only)
          if (Math.floor((tag.node.posts.edges.length / tagsPostsPerPage)) === count) {
            // make edge adjustments
            for (let j = 0; j < adjustEdges; j += 1) {
              tag.node.posts.edges.shift();
            }
          }

          createPage({
            path: `tags/${tag.node.slug}/page/${tagsPageNum}`,
            component: TagsIndex,
            context: {
              id: tag.node.id,
              // eslint-disable-next-line no-mixed-operators
              startCursor: tagPosts.edges[i] && tagPosts.edges[i].cursor || '',
              tagsPageNum,
              totalTagsPages,
              totalNumberOfPosts: tagPostsLength,
            },
          });
          tagsPageNum += 1;
          count += 1;
        }
        // console.log(`Tag page for ${tag.node.name} has pagination.`);
      }
    }
  });
  // console.log(`Created ${allTagsArray.length} tag pages`)
};
