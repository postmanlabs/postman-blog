const uuidv4 = require('uuid/v4');
const HeaderJson = require('./src/components/Header/Header.data.json');
const FooterJson = require('./src/components/Footer/Footer.data.json');

const path = require(`path`);
const slash = require(`slash`)


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



exports.createPages = async({ graphql, actions }) => {
  const { createPage } = actions // The “graphql” function allows us to run arbitrary queries against the local Gatsby GraphQL schema. Think of it like the site has a built-in database constructed from the fetched data that you can run queries against

  const postTemplate = path.resolve(`./src/templates/post.js`);
  const tagsResults = path.resolve('./src/templates/tagResults.js');

  const result = await graphql(`
  {
    wpgraphql {
      posts {
        edges {
          node {
            slug
            id
          }
        }
      }
      tags(first: 500) {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
    }
  }
  `)

  if (result.errors) {
    console.error(result.errors)
  }
  
  // Access query results via object destructuring
  const wpgraphql = result.data.wpgraphql.posts.edges

  // We want to create a detailed page for each post node. We'll just use the WordPress Slug for the slug. The Post ID is prefixed with 'POST_'
  wpgraphql.map(edge => {
    // Each page is required to have a `path` as well as a template component. The `context` is optional but is often necessary so the template can query data specific to each page.
    createPage({
      path: `/${edge.node.slug}/`,
      component: slash(postTemplate),
      context: {
        id: edge.node.id,
      },
    })
  })

  // Below makes pages to display all posts of a given tag

  const tags = result.data.wpgraphql.tags.edges;

  tags.map(tag => { 
    createPage({
      path:`tags/${tag.node.slug}`,
      component: slash(tagsResults),
      context: {
        id: tag.node.id
      }
    })
  })

}