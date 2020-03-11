const fetchAllItems = require('../helpers/fetchAllItems');
const path = require('path')

module.exports = async ({ actions, graphql }) => {
  console.log('Hello from createTags')
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
  const {createPage} = actions;

  const TagsIndex = path.resolve('./src/templates/TagsIndex.jsx');

  allTagsArray.map((tag) => {
    let tagsPageNum = 1;
    const tagsPostsPerPage = 10;
    const totalTagsPages = Math.ceil((tag.node.posts.edges.length / tagsPostsPerPage));
    // Loop through array of tags, check to make sure it actually has posts
    if (tag.node.posts.edges.length !== 0) {
      // if so, set first curosr as empty string to include first post
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
            totalNumberOfPosts: tag.node.posts.edges.length
          },
        });
      } else {
        // Else, there we will need multiple pagination pages
        // Loop over tags 10 at a time, 1 page for each 10 posts
        for (let i = 0; i < tag.node.posts.edges.length; i += tagsPostsPerPage) {
          createPage({
            path: `tags/${tag.node.slug}/page/${tagsPageNum}`,
            component: TagsIndex,
            context: {
              id: tag.node.id,
              startCursor: tag.node.posts.edges[i].cursor,
              tagsPageNum,
              totalTagsPages,
              totalNumberOfPosts: tag.node.posts.edges.length
            },
          });
          tagsPageNum += 1;
        }
        console.log(`Tag page for ${tag.node.name} has pagination.`)
      }
    }
  });
  console.log(`Created ${allTagsArray.length} tag pages`)
}