import React from "react"
import { graphql } from "gatsby"
// import PropTypes from 'prop-types';

import Layout from "../components/layout"
import EntryMeta from '../components/Shared/EntryMeta';
import SEO from "../components/seo";
import FluidImage from '../components/FluidImage';

// import contentParser from 'gatsby-wpgraphql-inline-images';
import parse from 'html-react-parser';
// import parse, { domToReact } from 'html-react-parser';

// import ReactHtmlParser from 'html-react-parser';



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

  // plugin is parsing the post content to grab the URL
  // const pluginOptions = {
  //   wordPressUrl: `https://blog.postman.com`,
  //   uploadsUrl: `https://blog.postman.com/wp-content/uploads/`,
  // };
  
    return (
      <Layout>
        <SEO title="post"/>
        <FluidImage image={featuredImage} />
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <EntryMeta name={name} avatar={avatar} date={date}/>
        {/* <div>{contentParser({ content },  pluginOptions )}</div> */}
        {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
        {/* <p>{ReactHtmlParser(content)}</p> */}

        <div>{parse(content, {
          replace: (domNode) => {

           let imageUrl = domNode.name === 'img' && domNode.attribs["data-src"];
           let name = document.getElementsByTagName("img");
    
           // forEach / map refine . filter only for images that have a data-src
        
       
          
            if (imageUrl) {
              console.log("//////////I grabbed the image BOOOMMMM  //////////////////", name)
              console.log('type of name:', typeof(name))
              // console.log('dataset:', name[dataset])
              
              // for (let i in name) {
              //   // if (name[i].getAttribute("img")) {
              //   //   console.log('got the image')
              //   // }
              //   console.log('in for:', name[i])
              //   // name[i].setAttribute("src", name[i].getAttribute("data-src"));
              // }

              //  name[i].setAttribute("src", name[i].getAttribute("data-src"));
            }
 
          
          
          
          
          // name.setAttribute("src", name.getAttribute("data-src")); 
          }
        })}</div>
   
             
      </Layout>
    )
  }

  // BlogPostTemplate.propTypes = {
  //   id: PropTypes.string.isRequired,
  //   content: PropTypes.node.isRequired,
  //   title: PropTypes.string,
  // }


export default BlogPostTemplate;
