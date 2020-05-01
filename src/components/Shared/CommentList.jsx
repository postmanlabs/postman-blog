import React from 'react';
import ReturnDateString from './ReturnDateString';
import DOMPurify from 'dompurify';

const Comment = ({ comments }) => (
  <div>
    {comments.edges && comments.edges.map((comment) => {
      const commentAuthor = comment.node.author.name;
      const commentDate = comment.node.date;
      const commentAuthorUrl = comment.node.author.url;
      let cleanComment = DOMPurify.sanitize(comment.node.content);
      console.log('cleanComment', cleanComment)
      

      /* answers to comments
      ******************************************************************************* */
      let answerList;
      if (comment.node.children && comment.node.children.edges) {
        answerList = comment.node.children.edges.map((answer) => {
          let cleanAnswer = DOMPurify.sanitize(answer.node.content);
          return (
          <div className="col-11 comments__answers ml-4">
            <div className="col-12">
              {answer.node.author.name}
            </div>
            <div className="col-12 comments__date">
              <ReturnDateString data={answer.node.date} />
            </div>
            <div className="col-12 mt-3" dangerouslySetInnerHTML={{ __html: cleanAnswer }} />
            {/* <div className="col-12 mt-3">{clean}</div> */}
          </div>
        )});
      }

      return (
        <>
          <div className="col-12">
            {
              commentAuthorUrl
                ? null
                : (
                  <div className="comments__approved">
                    <div className="bio-author col-12">
                      {commentAuthor}
                    </div>
                    <div className="col-12 comments__date">
                      <ReturnDateString data={commentDate} />
                    </div>
                    <div className="col-12 mt-3" dangerouslySetInnerHTML={{ __html: cleanComment }} />
                  </div>
                )
                }
          </div>
          { answerList }
        </>
      );
    })}
  </div>
);

export default Comment;
