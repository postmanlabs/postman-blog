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

const proxyForm = ({
  track, id, className, description, form,
}) => {
  if (typeof document === 'object' && munchkinId && formid) {
    let e;
    let initializedForm;

    const delay = 1000;
    const loadForm = () => {
      if (!initializedForm) {
        initializedForm = true;
        window.MktoForms2.loadForm('//pages.getpostman.com', munchkinId, formid);
      }
    };

    setTimeout(() => {
      const hasDependencies = window && window.pm && window.pm.cache;
      if (hasDependencies) {
        e = document.createElement('script');
        e.src = `/${window.pm.cache}/forms2.js`;
        e.onload = () => loadForm();
        document.head.appendChild(e);
      }
    }, delay);
  }

  return track && id && (
    <div className={className}>
      {description}
      {form}
      <form id={id} />
      <style>
        {`
        #${id} {
          display: none !important;
        }
      `}
      </style>
    </div>
  );
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
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
        <div className="col-lg-8 offset-lg-2">
          {proxyForm({
            track: munchkinId,
            id: mktoFormId,
            className: 'form-container',
            description: (
              <div className="col-sm-12 col-md-10 offset-md-1 text-center">
                <h2>Newsletter signup</h2>
                <p className="mb-4"><em>Like this post? We&#39;ve got plenty more in our monthly newsletter. Have it automatically delivered to your inbox.</em></p>
              </div>
            ),
            form: (
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
            ),
          })}
        </div>
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
