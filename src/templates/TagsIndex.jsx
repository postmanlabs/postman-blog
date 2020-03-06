import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import EntryMeta from '../components/Shared/EntryMeta';
import PageSelectionButtons from '../components/Shared/PageSelectionButtons';
import SEO from '../components/seo';
import FluidImage from '../components/FluidImage';
import HeroResults from '../components/Shared/HeroResults';


export const tagsPostsQuery = graphql`
  query GET_PAGE_POSTS_OF_TAG($id: ID!, $startCursor: String!) {
    wpgraphql {
      tag(id: $id) {
        name
        slug
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
                avatar {
                  url
                }
              }
              featuredImage {
                sourceUrl
                altText
              }
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
      }
    } 
  }`;

  // tags {
  //   edges {
  //     node {
  //       id
  //       name
  //       slug
  //     }
  //   }
  // }
  // categories {
  //   edges {
  //     node {
  //       id
  //       name
  //       slug
  //     }
  //   }
  // }
const TagsPostsList = ({ data, pageContext }) => {
  const { tag } = data.wpgraphql;
  const title = tag.name;
  const posts = tag.posts.edges;
  const { totalTagsPages, tagsPageNum, totalNumberOfPosts } = pageContext;

  return (
    <Layout>
      <SEO title={title} />
      <HeroResults title={title} totalPosts={totalNumberOfPosts}/>
      <div className="container">
        <div className="row">
          {posts.map((post) => {
            const postTitle = post.node.title;
            const postExcerpt = post.node.excerpt;
            // const tags = post.node.tags.edges;
            // const category = post.node.categories;
            const { slug, date } = post.node;
            // const { name } = post.node.author;
            // const avatar = post.node.author.avatar.url;
            const { featuredImage } = post.node;
            let name;
            let avatar;
            if (post.node.author) {
              name = post.node.author.name;
              avatar = post.node.author.avatar.url;
            } else {
              name = 'Christina';
              avatar = '';
            }
            return (
              <div key={post.node.id} className="post">
                <FluidImage image={featuredImage} />
                <Link to={slug}>
                  <h1 dangerouslySetInnerHTML={{ __html: postTitle }} />
                </Link>
                {/* <EntryMeta name={name} avatar={avatar} date={date} tags={tags} categories={category} /> */}
                <EntryMeta name={name} avatar={avatar} date={date}/>
                <p dangerouslySetInnerHTML={{ __html: postExcerpt }} />
              </div>
            );
          })}
        </div>
        {totalTagsPages > 1 && (
          <PageSelectionButtons currentPage={tagsPageNum} totalPages={totalTagsPages} prefix={`/tags/${tag.slug}`} />
        )}
      </div>
    </Layout>
  );
};

export default TagsPostsList;
