import React from 'react';


// export default class PostForm extends React.Component {
//   state = {
//     firstName: "",
//     email: "",
//     message:""
//   }
const Postform = ({ name, email, message }) => {
  // render() {
  return (
    <form method="POST" action="https://dev.staticman.net/v2/entry/github/postmanlabs/postman-blog">
      <input name="options[redirect]" type="hidden" value="https://my-site.com" />
      {/* <input name="options[slug]" type="hidden" value="{{ page.slug }}"></input> */}
      <label>
          Name
        <input name="fields[name]" type="text">{name}</input>
      </label>
      <label>
          Email
        <input name="fields[email]" type="text">{email}</input>
      </label>
      <label>
          Message
        <input name="fields[message]" type="text">{message}</input>
      </label>

      <button type="submit">Go!</button>
    </form>
  );
};
// }

export default Postform;

// const Postform = ({ name, email, message}) => {

//   return (
//     <form method="POST" action="https://dev.staticman.net/v2/entry/postmanlabs/postman-docs/staticman/comments" />
//         <input name="options[redirect]" type="hidden" value="https://my-site.com">

//         <input name="options[slug]" type="hidden" value="{{ page.slug }}" />
//         <label><input name="fields[name]" type="text">Name</label>
//         <label><input name="fields[email]" type="email">E-mail</label>
//         <label><textarea name="fields[message]"></textarea>Message</label>

//         <button type="submit">Go!</button>
//     {/* </form> */}
//   );
// };

// export default Postform;
