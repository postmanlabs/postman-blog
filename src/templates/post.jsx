import React from 'react';
import { graphql } from 'gatsby';
import '../components/_layout.scss';
import './_post.scss';

import parse from "html-react-parser";
import Layout from '../components/layout';
import EntryMeta from '../components/Shared/EntryMeta';
import SEO from '../components/seo';
import FluidImage from '../components/FluidImage';
// import PostForm from '../components/Shared/PostForm';

import JustComments from "gatsby-plugin-just-comments";


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
  console.log('==============================')
  console.log('AUTHOR DATA COMING INTO POST.JSX', data.wpgraphql.post.author)
  console.log('==============================')

  const { post } = data.wpgraphql;

  const { title } = data.wpgraphql.post;
  const { content } = data.wpgraphql.post;
  let name;
  let avatar;
  if ( data.wpgraphql.post.author) {
    name = data.wpgraphql.post.author.name;
    avatar = data.wpgraphql.post.author.avatar.url;
  } else {
    name = 'Christina'
    avatar = ''
  }

  const { date } = data.wpgraphql.post;
  const { featuredImage } = data.wpgraphql.post;

  const tags = post.tags.edges;

  return (
    <Layout>
      <SEO title="post" />
      <div className="indexPost">
        <FluidImage image={featuredImage} />
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <EntryMeta name={name} avatar={avatar} date={date} tags={tags} />

        <div>
          {parse(content, {
            replace: (domNode) => {
              if (domNode.attribs && domNode.attribs['data-src']) {
                return <img src={domNode.attribs['data-src']} alt={domNode.attribs.alt} />;
              }
            },
          })}</div>

          <JustComments
            className="just-comments myTheme"
            data-recaptcha="true"
            apikey="process.env.JUST_COMMENTS_API"
          />

          {/* <PostForm />   */}
        </div>   
      </Layout>
    )
  }

export default BlogPostTemplate;
