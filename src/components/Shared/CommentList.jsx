import React, { Component } from 'react';
import ReturnDateString from './ReturnDateString';

class Comment extends Component {

    constructor(props) {
      super(props);
      
    }

    componentDidMount() {
      const newItem = document.createElement('div');
      const list = document.querySelector('.list-wrapper');

      newItem.innerHtml =  `
      <div data-sanatize="a<script>alert(123)</script>b">
       loading...
       </div>
      `;
      list.insertBefore(newItem, list.childNodes[0])

      setTimeout(() => {
        window.pm.sanatizeContent();

      }, 2000);
    }


    render() {
      const { comments } = this.props;

      return(
        <div className="list-wrapper">
          {comments.edges && comments.edges.map((comment) => {
            const commentAuthor = comment.node.author.name;
            const commentContent = comment.node.content;
            const commentDate = comment.node.date;
            const commentAuthorUrl = comment.node.author.url;

            /* answers to comments
            ******************************************************************************* */
            let answerList;
            if (comment.node.children && comment.node.children.edges) {
              answerList = comment.node.children.edges.map((answer) => (
                <div className="comments__answers ml-4">
                  {/* {console.log('answer', answer.node.author)} */}
                  <div data-sanatize={`${answer.node.author.name}`} className="bio-author"></div>
                  <div className="comments__date">
                    <ReturnDateString data={answer.node.date} />
                  </div>
                  <div data-sanatize={`${answer.node.content}`}></div>
                </div>
              ));
            }
            return (
              <>
                <div className="col-12">
                  {
                    commentAuthorUrl 
                    ? null 
                    : (
                    <div className="comments__approved">
                        <div data-sanatize={`${commentAuthor}`} className="bio-author"></div>
                        <div className="comments__date">       
                          <ReturnDateString data={commentDate} />
                        </div>  
                        <div data-sanatize={`${commentContent}`}></div>
                    </div>
                    )
                  }
                </div>
               { answerList }
              </>
            )
          })
        }
       
    </div>
    )
  }
}

export default Comment; 
