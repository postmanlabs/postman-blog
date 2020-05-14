import React from 'react';

const munchkinId = process.env.MUNCHKIN_ID || '';
const formid = process.env.NEWSLETTER_FORM_ID || 0;
const mktoFormId = `mktoForm_${formid}`;

const handleSubmit = (e) => {
  e.preventDefault();

  const form = e.target;
  const formSubmit = [...form.querySelectorAll('button')].pop();
  const mktoForm = document.getElementById(mktoFormId);
  const mktoSubmit = [...mktoForm.querySelectorAll('button')].pop();
  const mktoEmail = mktoForm.Email;

  mktoEmail.value = form.user_mail.value;

  mktoSubmit.click();

  form.user_mail.disabled = true;

  formSubmit.disabled = true;

  formSubmit.innerHTML = 'Thank you';

  form.className += 'submitted';
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  componentDidMount() {
    if (munchkinId && formid) {
      let initializedForm = false;

      const loadForm = () => {
        if (initializedForm === false) {
          initializedForm = true;
          window.MktoForms2.loadForm('//pages.getpostman.com', munchkinId, formid);
        }
      };
      const s = document.createElement('script');

      s.type = 'text/javascript';
      s.async = true;
      s.src = '//pages.getpostman.com/js/forms2/js/forms2.min.js';
      s.onreadystatechange = () => {
        if (this.readyState === 'complete' || this.readyState === 'loaded') {
          loadForm();
        }
      };
      s.onload = loadForm;

      document.getElementsByTagName('head')[0].appendChild(s);
    }
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  resetForm() {
    this.setState({ email: '' });
  }

  render() {
    const { email } = this.state;

    return (
      <div className="row">
        {
          munchkinId && formid && (
            <div className="col-lg-8 offset-lg-2">
              <div className="col-sm-12 col-md-10 offset-md-1 text-center">
                <h2>Newsletter signup</h2>
                <p className="mb-4"><em>Like this post? We&#39;ve got plenty more in our monthly newsletter. Have it automatically delivered to your inbox.</em></p>
              </div>
              <div className="form-container">
                <form id="contactForm" method="POST" onSubmit={handleSubmit}>
                  <ul className="inline-form">
                    <li className="form-field">
                      <input
                        id="user_mail"
                        className="form_input"
                        type="email"
                        placeholder="Work Email"
                        name="user_mail"
                        maxLength="100"
                        required
                        value={email}
                        onChange={this.onEmailChange.bind(this)}
                      />
                    </li>
                    <li className="button-wrap">
                      <button className="form-submit-button" type="submit">Submit</button>
                    </li>
                  </ul>
                </form>
                <form id={mktoFormId} />
                <style>
                  {`
                  #${mktoFormId} {
                    display: none !important;
                  }
                `}
                </style>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

const NewsLetterForm = () => (
  <div>
    <Form />
  </div>
);

export default NewsLetterForm;
