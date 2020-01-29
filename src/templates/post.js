import React, { Component } from "react"
import { graphql } from "gatsby"
import PropTypes from 'prop-types';

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

const BlogPostTemplate = ({title, content, id}) => {
  // const { post: post } = data

   console.log('////////blog page slug', title);
    return (
      <Layout>
        <SEO />
        <h1>{title}</h1>
        <h2>{id}</h2>
        <EntryMeta />
        <p>{content}</p>
      </Layout>
    )
  }

  BlogPostTemplate.propTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    title: PropTypes.string,
  }


export default BlogPostTemplate;

// class Post extends Component {
//   render() {

//     return (
//       <div>
//         <Layout>
//         <SEO />
//         <h1>it is linked up</h1>
//          <h1 dangerouslySetInnerHTML={{ __html: wpgraphql.post.title }} />
//          {/* <p dangerouslySetInnerHTML={{ __html: post.content}} /> */}
//          <EntryMeta />
//       </Layout>
//       </div>
//     )
//   }
// }

// export default Post; 

// export const postQuery = graphql`
//   query GET_POST($id: ID!) {
//       wpgraphql {
//         post(id: $id) {
//           id
//           title
//           content
//         }
//       }
//     }
//   `