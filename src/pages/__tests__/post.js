// import React from "react"
// import renderer from "react-test-renderer"
// import BlogPostTemplate from "../../templates/post"
// import { StaticQuery } from "gatsby"

// beforeEach(() => {
//   StaticQuery.mockImplementationOnce(({ render }) =>
//     render({
//       wpgraphql
//     })
//   )
// })


// this stores the graphql call in a snapshot, does not test rendering?
import postPageQuery from '../../templates/post'
describe("BlogPostTemplate", () => {
  it("it should be the correct query", () => {
    // const tree = renderer.create(<BlogPostTemplate />).toJSON()
    expect(postPageQuery).toMatchSnapshot()
  })
})