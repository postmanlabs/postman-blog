const uuidv4 = require('uuid/v4');
// const path = require('path');
// const slash = require('slash');
const HeaderJson = require('./src/components/Header/Header.data.json');
const FooterJson = require('./src/components/Footer/Footer.data.json');

const createPosts = require('./gatsby/createPosts');
const createTags = require('./gatsby/createTags');
const createCategories = require('./gatsby/createCategories');
const createAuthors = require('./gatsby/createAuthors');


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
  await createCategories({actions, graphql});
  await createAuthors({actions, graphql});
};
