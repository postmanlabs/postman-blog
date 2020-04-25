import React from 'react';
// import { graphql } from 'gatsby';
// import { useStaticQuery, graphql } from "gatsby"

const Comment = ({ comments }) => {
  // const data = useStaticQuery(graphql`
  // query($postID: ID!) {
  //   comments(where: { contentId: $postId, contentStatus: PUBLISH }) {
  //     nodes {
  //       content
  //       author {
  //         name
  //         url
  //       }
  //     }
  //   }
  // }`);
  console.log('commentlist comment data', comments);
  // const { author } = comments;
  return (
    <div>
      {comments.edges && comments.edges.map((comment) => {
        const commentAuthor = comment.node.author.name || 'Till';
        const commentContent = comment.node.content;
        return (
          <div className="list-wrapper">
            <div className="container">
              <div>{commentAuthor}</div>
              <div dangerouslySetInnerHTML={{ __html: commentContent }} />
            </div>
          </div>
        );
      })}
    </div>

  );
};

export default Comment;

// graphql
//   query($postID: ID!) {
//     comments(where: { contentId: $postId, contentStatus: PUBLISH }) {
//       nodes {
//         content
//         author {
//           name
//           url
//         }
//       }
//   }
//   }
