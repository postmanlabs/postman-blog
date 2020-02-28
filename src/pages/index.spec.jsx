import React from 'react';
import renderer from 'react-test-renderer';
import BlogIndex from './index';

describe('BlogIndex', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<BlogIndex data={
        {
        "wpgraphql": 
          {
          "posts": 
            {
            "edges": [
              {
              "node": {
                "title": "Syncing Your OpenAPI, RAML, and GraphQL Schema to GitHub with Postman",
                "author": {
                  "id": "dXNlcjo0MA==",
                  "avatar": {
                    "default": "mm",
                    "extraAttr": null,
                    "forceDefault": false,
                    "foundAvatar": true,
                    "height": 96,
                    "isRestricted": false,
                    "rating": "g",
                    "scheme": null,
                    "size": 96,
                    "url": "https://secure.gravatar.com/avatar/ed54d92bd77d089c151d051263140274?s=96&d=mm&r=g",
                    "width": 96
                  }
                },
                "categories": {
                  "edges": [
                    {
                      "node": {
                        "id": "Y2F0ZWdvcnk6Mw=="
                      }
                    }
                  ]
                },
                "tags": {
                  "edges": [
                    {
                      "node": {
                        "id": "cG9zdF90YWc6MTUw"
                      },
                    },
                  ]
                },
              },
              }
            ]
          },
       
          },
        }
      }/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
