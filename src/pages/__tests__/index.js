
import React from "react"
import renderer from "react-test-renderer"
import BlogIndex from "../index"
import { StaticQuery } from "gatsby"

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      wpgraphql: wpgraphql
    })
  )
})

describe("BlogIndex", () =>
  it("renders correctly", () => {
    const data = {
      wpgraphql: wpgraphql
    }
    const tree = renderer.create(<BlogIndex data={data}/>).toJSON()
    expect(tree).toMatchSnapshot()
  }))