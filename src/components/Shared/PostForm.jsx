// import React, { Component } from 'react';


// class PostForm extends Component {
//   constructor() {
//     super();

//     this.state = {
//       formIsSubmitting: false,
//       formSubmittedSuccessfully: false,
//       formSubmittedFailed: false,
//       formErrorMessage: null,
//       textAreaValue: '',
//     };
//   }


//   render() {
//     const { postId } = this.props;
//     const {
//       formIsSubmitting,
//       formSubmittedSuccessfully,
//       formSubmittedFailed,
//       formErrorMessage,
//       textAreaValue,
//     } = this.state;

//     const successMessageMarkup = formSubmittedSuccessfully ? (
//       <p className="comment-success">
//         Thanks for your comment! It will appear once approved.
//       </p>
//     ) : null;

//     const errorMessageMarkup = formSubmittedFailed && formSubmittedSuccessfully === false ? (
//       <p className>uups, something went wrong.</p>
//     ) : null;

//     return (
//       <div className="container">
//         <div className="row">
//           <div className="col-12">
//             <h3 className="comments">Comments</h3>
//           </div>
//           <div className="col-12">
//             {successMessageMarkup}
//             {errorMessageMarkup}
//           </div>
//           <div className="col-12">
//             <form onSubmit={this.handleSubmit.bind(this)}>
//               <input type="hidden" id="postId" value={postId} />
//               <div className="form-group">
//                 <label htmlFor="name">Your name</label>
//                 <input
//   className="form-control"
//   id="name"
//   type="text"
//   required disabled={formIsSubmitting}
// />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Your email</label>
//                 <input
//                   className="form-control"
//                   id="email"
//                   type="email"
//                   required
//                   disabled={formIsSubmitting}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="comment">Write a public comment</label>
//                 <textarea
//                   className="form-control"
//                   id="comment"
//                   rows="7"
//                   required
//                   disabled={formIsSubmitting}
//                   onChange={(evt) => {
//                     this.setState({ textAreaValue: evt.target.value });
//                   }}
//                   value={textAreaValue}
//                 />
//               </div>
//               <input className="btn btn__primary" type="submit" value="Post comment!" />
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     const [postId, name, email, comment] = e.target.elements;
//     const sendData = JSON.stringify({
//       post: postId.value,
//       author_name: name.value,
//       author_email: email.value,
//       content: comment.value,
//     });

//     fetch('', {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: sendData,
//     })
//       .then((response) => {
//         if (response.ok === true) {
//           this.setState({
//             formIsSubmitting: false,
//             formSubmittedSuccessfully: true,
//             textAreaValue: '',
//           });
//         }

//         return response.json();
//       })
//       .then((object) => {
//         this.setState({
//           formIsSubmitting: false,
//           formSubmittedFailed: true,
//           formErrorMessage: object.message,
//         });
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }
// }

// export default PostForm;
