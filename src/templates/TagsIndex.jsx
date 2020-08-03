import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PageSelectionButtons from '../components/Shared/PageSelectionButtons';
import SEO from '../components/seo';
import HeroResults from '../components/Shared/HeroResults';
import ListHeader from '../components/Shared/ListHeader';


const TagsPostsList = ({ data, pageContext }) => {
  const { tag } = data.wpgraphql;
  const title = tag.name;
  const posts = tag.posts.edges;
  const { link } = tag;
  const { totalTagsPages, tagsPageNum, totalNumberOfPosts } = pageContext;

  return (
    <Layout>
      <SEO title={title} canonical={link} />
      <HeroResults title={title} totalPosts={totalNumberOfPosts} />
      <div className="list-wrapper">
        <div className="container">
          <div className="row">
            {Array.isArray(posts) && posts.map((post) => {
              const postTitle = post.node.title;
              const postExcerpt = post.node.excerpt;
              const { slug, date, featuredImage } = post.node;
              const name = post.node.author.name || 'The Postman Team';
              const avatar = post.node.author.avatar.url || '';
              const authorSlug = post.node.author.slug;
              const keyPostId = post.node.id;
              return (
                <div key={keyPostId} className="post">
                  <ListHeader
                    authorSlug={authorSlug}
                    name={name}
                    avatar={avatar}
                    date={date}
                    slug={slug}
                    featureImage={featuredImage}
                    postTitle={postTitle}
                    postExcerpt={postExcerpt}
                  />
                </div>
              );
            })}
          </div>
          {totalTagsPages > 1 && (
            <PageSelectionButtons currentPage={tagsPageNum} totalPages={totalTagsPages} prefix={`/tags/${tag.slug}`} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TagsPostsList;


export const tagsPostsQuery = graphql`
  query GET_PAGE_POSTS_OF_TAG($id: ID!, $startCursor: String!) {
    wpgraphql {
      tag(id: $id) {
        name
        slug
        link
        posts(first: 10, after: $startCursor) {
          edges {
            node {
              tags {
                edges {
                  node {
                    id
                    
                  }
                }
              }
              id
              title
              excerpt
              date
              slug
              uri
              author {
                name
                slug
                avatar {
                  url
                }
              }
              featuredImage {
                sourceUrl
                altText
              }
              
            }
          }
        }
      }
    } 
  }`;
