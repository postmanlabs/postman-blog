const fetchAllItems = require('../helpers/fetchAllItems');
const path = require('path')

module.exports = async ({ actions, graphql }) => {
  const allCategoriesResults = await graphql(`
  {
    wpgraphql {
      categories(first:100) {
        edges {
          node {
            id
            name
            slug
            count
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
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }`);
  if (allCategoriesResults.errors) {
    console.error(allCategoriesResults.errors);
  }
  const categories = allCategoriesResults.data.wpgraphql.categories.edges;
  const categoriesPageInfo = allCategoriesResults.data.wpgraphql.categories.pageInfo;

  const allCategoriesArray = await fetchAllItems(graphql, categoriesPageInfo, categories, 'categories', 'id name slug posts(first: 100) { edges { node { title id } cursor } }');
  const {createPage} = actions;

  const CatsIndex = path.resolve('./src/templates/CategoryIndex.jsx');
  const catPostsPerPage = 10;
  const pageIncrement = catPostsPerPage - 1;

  allCategoriesArray.map((cat) => {
    let catsPageNum = 1;
    const catPosts = cat.node.posts;
    const catPostsLength = catPosts.edges.length;
    const totalCatsPages = Math.ceil((catPostsLength / catPostsPerPage));

    if (cat.node.posts.edges.length !== 0) {
      cat.node.posts.edges[0].cursor = '';
      if (cat.node.posts.edges.length <= catPostsPerPage) {
        createPage({
          path: `${cat.node.slug}/page/${catsPageNum}`,
          component: CatsIndex,
          context: {
            id: cat.node.id,
            startCursor: cat.node.posts.edges[0].cursor,
            catsPageNum,
            totalCatsPages,
            totalNumberOfPosts: cat.node.posts.edges.length
          },
        });
      } else {
        let count = 0;
        let adjustEdges = 0;

        for (let i = 0; i < catPostsLength; i += pageIncrement) {
          // First pass (only)
          if (!i) {
            // account for (messy) divison rounding
            adjustEdges = (Math.floor((catPostsLength / catPostsPerPage)) + i) - 1;
          }
          // Last pass (only)
          if (Math.floor((catPostsLength / catPostsPerPage)) === count) {
            // make edge adjustments
            for (let j = 0; j < adjustEdges; j += 1) {
              cat.node.posts.edges.shift();
            }
          }

          createPage({
            path: `${cat.node.slug}/page/${catsPageNum}`,
            component: CatsIndex,
            context: {
              id: cat.node.id,
              startCursor: catPosts.edges[i] && catPosts.edges[i].cursor || '',
              catsPageNum,
              totalCatsPages,
              totalNumberOfPosts: catPostsLength
            },
          });
          catsPageNum += 1;
          count += 1;
        }
        console.log(`Categories page for ${cat.node.name} has pagination.`);
      }
    }
  });
  console.log(`Created ${allCategoriesArray.length} category pages`);
}