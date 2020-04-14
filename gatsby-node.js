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
/************************************************************************ */
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
******************************************************************************/

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  await createPosts({actions, graphql});
  await createTags({actions, graphql});
  await createCategories({actions, graphql});
  await createAuthors({actions, graphql});
};


/* Create Algolia index 
*********************************************************************************/

const algoliasearch = require('algoliasearch');
const chunk = require('lodash.chunk');
const report = require('gatsby-cli/lib/reporter');

const queries = require('./src/utils/algolia');
const appId = process.env.GATSBY_ALGOLIA_APP_ID;
const apiKey = process.env.ALGOLIA_ADMIN_KEY;


/* Production build
********************************************/
require('dotenv').config({
  path: `.env.${process.env.GATSBY_ACTIVE_ENV}`,
});

/**
 * give back the same thing as this was called with.
 *
 * @param {any} obj what to keep the same
 */

const identity = obj => obj;

exports.onPostBuild = async function(
  { graphql, appId, apiKey, queries, indexName: mainIndexName, chunkSize = 1000 }
) {
  const activity = report.activityTimer(`index to Algolia`);
  activity.start();
  // appId = process.env.GATSBY_ALGOLIA_APP_ID;
  // apiKey = process.env.ALGOLIA_ADMIN_KEY;
  const client = algoliasearch(appId, apiKey);



  setStatus(activity, `${queries.length} queries to index`);

  const jobs = queries.map(async function doQuery(
    { indexName = mainIndexName, query, transformer = identity, settings },
    i
  ) {
    if (!query) {
      report.panic(
        `failed to index to Algolia. You did not give "query" to this query`
      );
    }
    const index = client.initIndex(indexName);
    const mainIndexExists = await indexExists(index);
    const tmpIndex = client.initIndex(`${indexName}_tmp`);
    const indexToUse = mainIndexExists ? tmpIndex : index;

    if (mainIndexExists) {
      setStatus(activity, `query ${i}: copying existing index`);
      await scopedCopyIndex(client, index, tmpIndex);
    }

    setStatus(activity, `query ${i}: executing query`);
    
    // const result = await graphql(query);
    // if (result.errors) {
    //   report.panic(`failed to index to Algolia`, result.errors);
    // }
    // const objects = await transformer(result);

    let go = true;
    while (go) {
      const result = await graphql(query, variables);
      if (result.errors) {
        report.panic(`failed to index to Algolia`, result.errors);
      }
      const objects = await transformer(result)

      allObjects = allObjects.concat(objects.nodes)

      if (objects.pageInfo && objects.pageInfo.hasNextPage) {
        variables.after = objects.pageInfo.endCursor
      } else {
        go = false
      }
    }

    const chunks = chunk(objects, chunkSize);
    setStatus(activity, `query ${i}: splitting in ${chunks.length} jobs`);

    const chunkJobs = chunks.map(async function(chunked) {
      const { taskID } = await indexToUse.addObjects(chunked);
      return indexToUse.waitTask(taskID);
    });

    await Promise.all(chunkJobs);

    if (settings) {
      const { taskID } = await indexToUse.setSettings(settings);
      await indexToUse.waitTask(taskID);
    }

    if (mainIndexExists) {
      setStatus(activity, `query ${i}: moving copied index to main index`);
      return moveIndex(client, tmpIndex, index);
    }
  });

  try {
    await Promise.all(jobs);
  } catch (err) {
    report.panic(`failed to index to Algolia`, err);
  }
  activity.end();
}; // end of function

/**
 * Copy the settings, synonyms, and rules of the source index to the target index
 * @param client
 * @param sourceIndex
 * @param targetIndex
 * @return {Promise}
 */
async function scopedCopyIndex(client, sourceIndex, targetIndex) {
  const { taskID } = await client.copyIndex(
    sourceIndex.indexName,
    targetIndex.indexName,
    ['settings', 'synonyms', 'rules']
  );
  return targetIndex.waitTask(taskID);
}

/**
 * moves the source index to the target index
 * @param client
 * @param sourceIndex
 * @param targetIndex
 * @return {Promise}
 */
async function moveIndex(client, sourceIndex, targetIndex) {
  const { taskID } = await client.moveIndex(
    sourceIndex.indexName,
    targetIndex.indexName
  );
  return targetIndex.waitTask(taskID);
}

/**
 * Does an Algolia index exist already
 *
 * @param index
 */
async function indexExists(index) {
  try {
    const { nbHits } = await index.search();
    return nbHits > 0;
  } catch (e) {
    return false;
  }
}

/**
 * Hotfix the Gatsby reporter to allow setting status (not supported everywhere)
 *
 * @param {Object} activity reporter
 * @param {String} status status to report
 */
function setStatus(activity, status) {
  if (activity && activity.setStatus) {
    activity.setStatus(status);
  } else {
    console.log('Algolia:', status);
  }
}
