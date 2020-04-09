const uuidv4 = require('uuid/v4');
// const path = require('path');
// const slash = require('slash');
const HeaderJson = require('./src/components/Header/Header.data.json');
const FooterJson = require('./src/components/Footer/Footer.data.json');

const createPosts = require('./gatsby/createPosts');
const createTags = require('./gatsby/createTags');
const createCategories = require('./gatsby/createCategories');
const createAuthors = require('./gatsby/createAuthors');


/* Create Header and Footer
/****************************** */
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


/* Create Pages for Posts, Author, Categories, Tags 
*********************************************************/

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  await createPosts({actions, graphql});
  await createTags({actions, graphql});
  await createCategories({actions, graphql});
  await createAuthors({actions, graphql});
};
