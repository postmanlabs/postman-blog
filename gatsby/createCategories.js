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

  allCategoriesArray.map((cat) => {
    let catsPageNum = 1;
    const totalCatsPages = Math.ceil((cat.node.posts.edges.length / catPostsPerPage));

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
        for (let i = 0; i < cat.node.posts.edges.length; i += catPostsPerPage) {
          createPage({
            path: `${cat.node.slug}/page/${catsPageNum}`,
            component: CatsIndex,
            context: {
              id: cat.node.id,
              startCursor: cat.node.posts.edges[i].cursor,
              catsPageNum,
              totalCatsPages,
              totalNumberOfPosts: cat.node.posts.edges.length
            },
          });
          catsPageNum += 1;
        }
        console.log(`Categories page for ${cat.node.name} has pagination.`);
      }
    }
  });
  console.log(`Created ${allCategoriesArray.length} category pages`);
}