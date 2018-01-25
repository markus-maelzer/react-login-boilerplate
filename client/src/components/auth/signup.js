import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { signupUser } from '../../actions';

class Signup extends Component {
  onSubmit = (values) => {

    this.props.signupUser(values, () => {
      this.props.history.push('/feature');
    })
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          className="form-control"
          name="email"
          label="Email:"
          type="email"
          component={renderField}
        />
        <Field
          className="form-control"
          name="password"
          label="Password:"
          type="password"
          component={renderField}
        />
        <Field
          className="form-control"
          name="passwordConfirm"
          label="Confirm Passwod:"
          type="password"
          component={renderField}
        />
        <button type="submit" className="btn btn-primary">Sign Up!</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  const { email, password, passwordConfirm } = values;

  if(!email) {
    errors.email = 'Please enter an email';
  }
  if(!password) {
    errors.password = 'Please enter a password';
  }
  if(!passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if(password !== passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'signup'
})(
  connect(null, { signupUser })(Signup)
);

const renderField = field => {

  const { touched, error } = field.meta;
  const className = `form-group ${touched && error ? 'has-danger': ''}`;

  return (
    <fieldset className={className}>
      <label>{field.label}</label>
      <input
        className='form-control '
        type={field.type || "text"}
        // es6 to get field.input event handelers as props
        {...field.input}
      />
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </fieldset>
  );
}
