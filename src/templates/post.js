import React from "react"
import { graphql } from "gatsby"
// import PropTypes from 'prop-types';

import Layout from "../components/layout"
import EntryMeta from '../components/Shared/EntryMeta';
import SEO from "../components/seo";
import FluidImage from '../components/FluidImage';


export const postPageQuery = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        featuredImage {
          sourceUrl
          altText
        }
        id
        title
        content
        author {
          avatar {
            url
          }
          name
        }
        date
      }
    }
  }
`

const BlogPostTemplate = ({ data }) => {
  // const { post: post } = data
  const title = data.wpgraphql.post.title;
  const content = data.wpgraphql.post.content;
  const name = data.wpgraphql.post.author.name;
  const avatar = data.wpgraphql.post.author.avatar.url;
  const date = data.wpgraphql.post.date
  const featuredImage = data.wpgraphql.post.featuredImage;
  console.log('///////////constent', data.wpgraphql.post.content)

    return (
      <Layout>
        <SEO title="post"/>
        <FluidImage image={featuredImage} />
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <EntryMeta name={name} avatar={avatar} date={date}/>
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
