import React from 'react';
import ReturnDateString from './ReturnDateString';


const Comment = ({ comments }) => (
  <div>
    {comments.edges && comments.edges.map((comment) => {      
      const commentAuthor = comment.node.author.name;
      const commentContent = comment.node.content;
      const commentDate = comment.node.date;
      const commentAuthorUrl = comment.node.author.url;
      console.log('commentauthor url', commentAuthorUrl)
      let answerList;

      if (comment.node.children && comment.node.children.edges) {
        answerList = comment.node.children.edges.map((answer) => (
          <div className="col-12 comments__answers">
            <div className="col-12">
              {answer.node.author.name}
            </div>
            <div className="col-12">
              <ReturnDateString data={answer.node.date} />
            </div>
            <div className="col-12" dangerouslySetInnerHTML={{ __html: answer.node.content }} />
          </div>
        ))
      }

      return (
        <>
          <div className="comments__approved">
            <div className="col-12">
              {
                commentAuthor && commentAuthorUrl ? <a href={commentAuthorUrl} className="comment author with url">{commentAuthorUrl}</a> : <div className="comment author without url">{commentAuthor}</div>
              }
            </div>
            <div className="col-12">
              <ReturnDateString data={commentDate} />
            </div>
            <div className="col-12" dangerouslySetInnerHTML={{ __html: commentContent }} />
          </div>
          { answerList }
        </>
      );
    })}
  </div>
);

export default Comment;
