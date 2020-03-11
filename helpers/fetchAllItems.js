module.exports = async function(graphql, initialCallPageInfo, initialCallData, itemName, queryFields) {
  let resultsArr = [];
  console.log('Hello from fetchAllItems');

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