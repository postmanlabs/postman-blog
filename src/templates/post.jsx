import React from "react"
import { graphql } from "gatsby"
import '../components/_layout.scss'
import './_post.scss'

import parse from 'html-react-parser';
import Layout from '../components/layout';
import EntryMeta from '../components/Shared/EntryMeta';
import SEO from '../components/seo';
import FluidImage from '../components/FluidImage';

// import parse from 'html-react-parser';
// import PostForm from '../components/Shared/PostForm';

import JustComments from 'gatsby-plugin-just-comments';


export const postPageQuery = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        featuredImage {
          sourceUrl
          altText
        }
        id
        uri
        title
        content 
        author {
          avatar {
            url
          }
          name
        }
        date
        tags {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
        categories {
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
  }
`;

const BlogPostTemplate = ({ data }) => {
  const { post } = data.wpgraphql;

  const { title } = data.wpgraphql.post;
  const { content } = data.wpgraphql.post;
  const { name } = data.wpgraphql.post.author;
  const avatar = data.wpgraphql.post.author.avatar.url;
  const { date } = data.wpgraphql.post;
  const { featuredImage } = data.wpgraphql.post;

  const tags = post.tags.edges;

    return (
      <Layout>
        <SEO title="post"/>
        <JustComments
              className="just-comments myTheme"
              data-recaptcha="true"
              apikey="1836ae93-bc53-4655-a563-21a17d7e691c"
            />
        <div className="indexPost">
          <FluidImage image={featuredImage} />
          <h1 dangerouslySetInnerHTML={{ __html: title }} />
          <EntryMeta name={name} avatar={avatar} date={date} tags={tags}/>

          <div>{parse(content, {
            replace: (domNode) => {

            if (domNode.attribs && domNode.attribs['data-src']) {
              console.log(domNode);
              return <img src={domNode.attribs['data-src']} alt={domNode.attribs.alt} />
            }
            }
          })}</div>

          
    
          {/* <PostForm />   */}
        </div>   
      </Layout>
    )
  }

export default BlogPostTemplate;
