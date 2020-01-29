import React from "react"
import { graphql } from "gatsby"
// import PropTypes from 'prop-types';

import Layout from "../components/layout"
import EntryMeta from '../components/Shared/EntryMeta';
import SEO from "../components/seo";


export const postPageQuery = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        id
        title
        content
      }
    }
  }
`

const BlogPostTemplate = ({ data }) => {
  // const { post: post } = data
  const title = data.wpgraphql.post.title;
  const content = data.wpgraphql.post.content;
    return (
      <Layout>
        <SEO title="post"/>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <p dangerouslySetInnerHTML={{ __html: content}} />
        <EntryMeta />
      </Layout>
    )
  }

  // BlogPostTemplate.propTypes = {
  //   id: PropTypes.string.isRequired,
  //   content: PropTypes.node.isRequired,
  //   title: PropTypes.string,
  // }


export default BlogPostTemplate;
