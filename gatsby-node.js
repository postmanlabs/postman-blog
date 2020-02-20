const uuidv4 = require('uuid/v4');
const path = require('path');
const slash = require('slash');
const HeaderJson = require('./src/components/Header/Header.data.json');
const FooterJson = require('./src/components/Footer/Footer.data.json');

// const { fetchAllItems } = require('./src/helpers/fetchAllItems');
// Can't import this correctly from a helper folder because of build time issues?
// Defining this funciton in this file for now.


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
  const { createPage } = actions; // The “graphql” function allows us to run arbitrary queries against the local Gatsby GraphQL schema. Think of it like the site has a built-in database constructed from the fetched data that you can run queries against

  // ////////////////////
  // Creating Blog Post pages
  // ////////////////////
  const postTemplate = path.resolve('./src/templates/post.jsx');

  const postsResults = await graphql(`
  {
    wpgraphql {
      posts(first: 1000) {
        edges {
          node {
            slug
            id
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

  if (postsResults.errors) {
    console.error(postsResults.errors);
  }

  const PostsIndex = path.resolve('./src/templates/PostsIndex.jsx');

  // Am I right in thinking the total number of blog index pages is the total number of articles, divided by the postsPerPage, rounded down?
  // For example, if it's 27.1, we only need 27 pages?

  // Access query results via object destructuring
  const posts = postsResults.data.wpgraphql.posts.edges;
  const postsPageInfo = postsResults.data.wpgraphql.posts.pageInfo;

  const allPostsArray = await fetchAllItems(postsPageInfo, posts, 'posts', 'id slug');

  const postsPerPage = 10;
  let pageNum = 1;
  const totalPages = Math.floor((allPostsArray.length / postsPerPage));

  console.log('total number of index pages, allPostsArray.length / postsPerPage');
  console.log(allPostsArray.length / postsPerPage);
  console.log('current blog has 28 pages');
  console.log(Math.floor(allPostsArray.length / postsPerPage));
  console.log(totalPages);

  // We want to create a detailed page for each post node. We'll just use the WordPress Slug for the slug. The Post ID is prefixed with 'POST_'
  allPostsArray.map((edge) => {
    // Each page is required to have a `path` as well as a template component. The `context` is optional but is often necessary so the template can query data specific to each page.
    createPage({
      path: `/${edge.node.slug}/`,
      component: slash(postTemplate),
      context: {
        id: edge.node.id,
      },
    });
  });
  console.log(`Blog post pages created: ${allPostsArray.length}`);

  // /////////////////////
  // Pagination for blog index
  // ////////////////////


  for (let i = 0; i < allPostsArray.length; i += postsPerPage) {
    // console.log('in For loop, article as starting point', allPostsArray[i]);
    createPage({
      path: `page/${pageNum}`,
      component: slash(PostsIndex),
      context: {
        startCursor: allPostsArray[i].cursor,
        pageNum,
        totalPages,
      },
    });
    pageNum += 1;
  }

  // ////////////////////
  // Creating TAGS pages
  // ////////////////////

  const tagsResults = path.resolve('./src/templates/tagResults.jsx');
  // Below makes pages to display all posts of a given tag

  // For some reason, only the first 100 tags are being returned from query?
  // Answer: The max you can get is 100 per query - https://github.com/wp-graphql/wp-graphql/issues/261
  // Of coure we can't get all the tags at once...
  // We have more than 100 tags.. We need to make multiple graphQL calls, 100 tags at a time, to get them all.
  // We make our initial call to get the first 100 tags
  const getTagsResults = await graphql(`
  {
    wpgraphql {
      tags(first: 100) {
        edges {
          node {
            id
            name
            slug
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
  const tags = getTagsResults.data.wpgraphql.tags.edges;
  const tagsPageInfo = getTagsResults.data.wpgraphql.tags.pageInfo;


  const allTagsArray = await fetchAllItems(tagsPageInfo, tags, 'tags', 'id name slug');

  allTagsArray.map((tag) => {
    createPage({
      path: `tags/${tag.node.slug}`,
      component: slash(tagsResults),
      context: {
        id: tag.node.id,
      },
    });
  });

  console.log(`Tag pages created: ${allTagsArray.length}`);

  // ////////////////////
  // Creating Categories pages
  // ////////////////////

  const categoriesResults = path.resolve('./src/templates/categoriesResults.jsx');

  const getCategoriesResults = await graphql(`
  {
    wpgraphql {
      categories(first:100) {
        edges {
          node {
            id
            name
            slug
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


  const allCategoriesArray = await fetchAllItems(categoriesPageInfo, categories, 'categories', 'id name slug');

  allCategoriesArray.map((cat) => {
    createPage({
      path: `category/${cat.node.slug}`,
      component: slash(categoriesResults),
      context: {
        id: cat.node.id,
      },
    });
  });

  console.log(`Categories pages created: ${allCategoriesArray.length}`);

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
