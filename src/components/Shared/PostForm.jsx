import React, {Component} from 'react';


// export default class PostForm extends React.Component {
//   state = {
//     firstName: "",
//     email: "",
//     message:""
//   }
class PostForm extends Component {
  constructor() {
    super();

    this.state = {
      formIsSubmitting: false,
      formSubmittedSuccessfully: false,
      formSubmittedFailed: false,
      formErrorMessage: null,
      textAreaValue: '',
    }
  }  
  
  
  render() {
    const { postId } = this.props;
    const {
      formIsSubmitting,
      formSubmittedSuccessfully,
      formSubmittedFailed,
      formErrorMessage,
      textAreaValue,
    } = this.state;

    const successMessageMarkup = formSubmittedSuccessfully ? (
      <p>
        Thanks for your comment! It will appear once approved.
      </p>
    ) : null;

    const errorMessageMarkup =
      formSubmittedFailed && formSubmittedSuccessfully === false ? (
        <p className>uups, something went wrong.</p>
      ) : null;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3>Comments</h3>
        </div>
        
        {successMessageMarkup}
        {errorMessageMarkup}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="hidden" id="postId" value={postId} />
          <div>
            <label htmlFor="name">Name*</label>
            <input id="name" type="text" required disabled={formIsSubmitting}/>
          </div>
          <div>
            <label htmlFor="email">Email*</label>
            <input
              id="email"
              type="email"
              required
              disabled={formIsSubmitting}
            />
          </div>
          <div>
            <label htmlFor="comment">Comment*</label>
            <textarea
              id="comment"
              rows="10"
              required
              disabled={formIsSubmitting}
              onChange={evt => {
                this.setState({textAreaValue: evt.target.value});
              }}
              value={textAreaValue}
            />
          </div>
          <input type="submit" value="Post comment!" />
        </form>
      </div>
    </div>
    );
  };
  handleSubmit(e) {
    e.preventDefault();
    const [postId, name, email, comment] = e.target.elements;
    const sendData = JSON.stringify({
      post: postId.value,
      author_name: name.value,
      author_email: email.value,
      content: comment.value,
    });

    fetch('https://blog.postman.com/wp-json/wp/v2/comments', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: sendData,
    })
    .then(response => {
      if (response.ok === true) {
        this.setState({
          formIsSubmitting: false,
          formSubmittedSuccessfully: true,
          textAreaValue: '',
        });
      }

      return response.json();
    })
    .then(object => {
      this.setState({
        formIsSubmitting: false,
        formSubmittedFailed: true,
        formErrorMessage: object.message,
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  } 
};

export default PostForm;
