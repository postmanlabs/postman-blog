const uuidv4 = require('uuid/v4');
const path = require('path');
const slash = require('slash');
const HeaderJson = require('./src/components/Header/Header.data.json');
const FooterJson = require('./src/components/Footer/Footer.data.json');

const createPosts = require('./gatsby/createPosts');
const createTags = require('./gatsby/createTags');


exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const prepareNode = (obj, name) => {
    const data = {
      key: uuidv4(),
      value: JSON.stringify(obj),
    };
    const node = JSON.stringify(data);
    const nodeMeta = {
      id: createNodeId(`my-data-${data.key}`),
      parent: null,
      children: [],
      internal: {
        type: name,
        mediaType: 'text/json',
        content: node,
        contentDigest: createContentDigest(data),
      },
    };

    const output = { ...data, ...nodeMeta };
    return output;
  };

  const { createNode } = actions;

  createNode(prepareNode(HeaderJson, 'headerLinks'));
  createNode(prepareNode(FooterJson, 'FooterLinks'));
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // The “graphql” function allows us to run arbitrary
  // queries against the local Gatsby GraphQL schema.
  // Think of it like the site has a built-in database
  // constructed from the fetched data that you can run
  // queries against

  await createPosts({actions, graphql});
  await createTags({actions, graphql});

  // ////////////////////
  // Creating Categories pages
  // ////////////////////

  const getCategoriesResults = await graphql(`
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

  const categories = getCategoriesResults.data.wpgraphql.categories.edges;
  const categoriesPageInfo = getCategoriesResults.data.wpgraphql.categories.pageInfo;


  const allCategoriesArray = await fetchAllItems(categoriesPageInfo, categories, 'categories', 'id name slug posts(first: 100) { edges { node { title id } cursor } }');

  const CatsIndex = path.resolve('./src/templates/CategoryIndex.jsx');
  const catPostsPerPage = 10;
  

  allCategoriesArray.map((cat) => {
    let catsPageNum = 1;
    const totalCatsPages = Math.ceil((cat.node.posts.edges.length / catPostsPerPage));

    // Currently only paginations over first 100 posts within category.
    // Would need to make multiple graphql calls to get all posts if more than 100

    if (cat.node.posts.edges.length !== 0) {
      cat.node.posts.edges[0].cursor = '';
      if (cat.node.posts.edges.length <= catPostsPerPage) {
        createPage({
          path: `${cat.node.slug}/page/${catsPageNum}`,
          component: slash(CatsIndex),
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
            component: slash(CatsIndex),
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
      }
    }
  });

  // /////////////////////
  // Author Page 
  // /////////////////////

  const getAuthorsResults = await graphql(`
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

  const authors = getAuthorsResults.data.wpgraphql.users.edges;
  const authorPageInfo = getAuthorsResults.data.wpgraphql.users.pageInfo;
  
  const allAuthorArray = await fetchAllItems(authorPageInfo, authors, 'users', 'id name slug posts(first: 100) { edges { node { title id } cursor } }');

  const authorIndex = path.resolve('./src/templates/AuthorIndex.jsx');
  const authorPostsPerPage = 10;

  allAuthorArray.map((author) => {
    let authorPageNum = 1;
    const totalAuthorPages = Math.ceil((author.node.posts.edges.length / authorPostsPerPage));
    const authorPosts = author.node.posts
    let authorPostsLength = author.node.posts.edges.length;

    if (authorPostsLength !== 0) {
      authorPosts.edges[0].cursor = '';
      if (authorPostsLength <= authorPostsPerPage) {
        createPage({
          path: `/${author.node.slug}/page/${authorPageNum}`,
          component: slash(authorIndex),
          context: {
            id: author.node.id,
            startCursor: authorPosts.edges[0].cursor,
            authorPageNum,
            totalAuthorPages,
            totalNumberOfPosts: authorPostsLength
          },
        });
      } else {
        for (let i = 0; i < authorPostsLength; i+= authorPostsPerPage) {
          createPage({
            path: `${author.node.slug}/page/${authorPageNum}`,
            component: slash(authorIndex),
            context: {
              id: author.node.id,
              startCursor: authorPosts.edges[0].cursor,
              authorPageNum,
              totalAuthorPages,
              totalNumberOfPosts: authorPostsLength
            },
          });
          authorPageNum += 1
        }
      }
    }
  })

  // ////////////////////
  // Helper functions
  // ////////////////////

  async function fetchAllItems(initialCallPageInfo, initialCallData, itemName, queryFields) {
    let resultsArr = [];

    const recurssiveFetcher = async (pageInfo, edgesArray) => {
      resultsArr = [...resultsArr, ...edgesArray];
      if (pageInfo.hasNextPage) {
        const nextCall = await graphql(`
            {
              wpgraphql {
                ${itemName}(first: 100 after: "${pageInfo.endCursor}") {
                  edges {
                    node {
                      ${queryFields}
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

        const edgeArr = nextCall.data.wpgraphql[itemName].edges;
        const nextPageInfo = nextCall.data.wpgraphql[itemName].pageInfo;

        await recurssiveFetcher(nextPageInfo, edgeArr);
      }
    };

    await recurssiveFetcher(initialCallPageInfo, initialCallData);
    return resultsArr;
  }
};
