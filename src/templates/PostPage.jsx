// Template for the Blog Post
import React from 'react';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Bio from '../components/Shared/Bio';
import BlogHeader from '../components/Shared/BlogHeader';
import PostForm from '../components/Shared/PostForm';
import CommentList from '../components/Shared/CommentList';
import Tags from '../components/Shared/Tags';

const BlogPostTemplate = ({ data }) => {
  const { post } = data.wpgraphql;
  const {
    title, content, date, featuredImage, slug, excerpt, seo, comments, postId,
  } = data.wpgraphql.post;
  const authorSlug = data.wpgraphql.post.author.slug;
  const authorBio = data.wpgraphql.post.author.description || '';

  const name = data.wpgraphql.post.author.name || 'The Postman Team';
  const avatar = data.wpgraphql.post.author.avatar.url || '';
  const tags = post.tags.edges;
  const categories = data.wpgraphql.post.categories.edges[0].node;

  const excerptText = excerpt.replace(/<(.|\n)*?>/g, '');
  /*  Below creates a string from the 'sanitized' excerpt string.
    Grabs everything before the index of '. '
    (end of sentence) after 100th char.
    Adds one to include the '. ' */
  const excerptTrimmed = excerptText.slice(0, (excerptText.indexOf('. ', 100) + 1));

  /* data from yoast is coming from 'seo' field that is called
     in the context of createPage. Yoast plugin for WPGraphQL */
  const seoTitle = seo.title || title;
  const seoDescription = seo.metaDesc || excerptTrimmed;
  const seoImage = (seo.opengraphImage && seo.opengraphImage.mediaItemUrl)
    ? seo.opengraphImage.mediaItemUrl
    : featuredImage;

  return (
    <Layout>
      <SEO title={seoTitle} description={seoDescription} image={seoImage} />
      <BlogHeader
        name={name}
        authorSlug={authorSlug}
        avatar={avatar}
        date={date}
        tags={tags}
        categories={categories}
        slug={slug}
        featuredImage={featuredImage}
        postTitle={title}
      />
      <div className="container">
        <div className="post-body-container">
          <div className="post-content">
            {parse(content, {
              replace: (domNode) => {
                if (domNode.attribs && domNode.attribs['data-src']) {
                  return (
                    <img
                      src={`${domNode.attribs['data-src']}`}
                      alt={domNode.attribs.alt}
                    />
                  );
                }
              },
            })}
          </div>
          <div className="pt-5 tags__post">
            <Tags tags={tags} categories={categories} />
          </div>
          
          <Bio authorBio={authorBio} name={name} avatar={avatar} authorSlug={authorSlug} />
          <PostForm postId={postId} />
          <CommentList comments={comments} />
        </div>
      </div>
    </Layout>
  );
};

export default BlogPostTemplate;

export const postPageQuery = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        comments(where: {status: "approved"}) {
          edges {
            node {
              approved
              content
              author {
                ... on WPGraphQL_CommentAuthor {
                  id
                  name
                }
              }
            }
          }
        }
        seo {
          metaDesc
          title
          opengraphImage {
            mediaItemUrl
          }
          twitterDescription
          twitterTitle
          twitterImage {
            mediaItemUrl
          }
          opengraphTitle
        }
        featuredImage {
          sourceUrl
          altText
        }
        id
        postId
        uri
        title
        slug
        content 
        excerpt
        author {
          avatar {
            url
          }
          name
          description
          slug
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
