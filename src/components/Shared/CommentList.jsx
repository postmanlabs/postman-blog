import React from 'react';
import ReturnDateString from './ReturnDateString';
import EntryMeta from './EntryMeta';

const Comment = ({ comments }) => {

  console.log('commentlist comments', comments);

  return (
    <div>
      {comments.edges && comments.edges.map((comment) => {
        const commentAuthor = comment.node.author.name;
        const commentContent = comment.node.content;
        const commentDate = comment.node.date;

        return (
          <div>
            <div className="comments__approved">
              <div className="col-12">
                {commentAuthor}
              </div>
              <div className="col-12">
                <ReturnDateString data={commentDate} />
              </div>
              <div className="col-12" dangerouslySetInnerHTML={{ __html: commentContent }} />
            </div>
            {comment.node.children.edges.map((answer) => {
              return (
                <div className="col-12 comments__answers">

              <EntryMeta
                // authorSlug={authorSlug}
                name={answer.node.author.name}
                // avatar={'avatar'}
                date={answer.node.date}
                // tags={tags}
                // categories={categories}
              />
                  {/* <div className="col-12">
                    {answer.node.author.name}
                  </div>
                  <div className="col-12">
                    <ReturnDateString data={answer.node.date} />
                  </div> */}
                  <div className="col-12" dangerouslySetInnerHTML={{ __html: answer.node.content }} />
                </div>
              )
            })}
          </div>
          
        );
      })} 
    </div>
  );
};

export default Comment;

