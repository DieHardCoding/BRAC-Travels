import React from 'react';
import { matchPath } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

const renderError = ({ error, touched}) => {
  if(touched && error) {
    return <div className="ui error message">
      <div className="header">{error}</div>
    </div>
  }
}

const renderInput = ({ input, label, meta}) => {
  const className = `field ${meta.error && meta.touched ? 'error': ''}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} type="text" autoComplete="new-password" />
      {renderError(meta)}
    </div>
  )
}

const renderPassword = ({ input, label, meta}) => {
  const className = `field ${meta.error && meta.touched ? 'error': ''}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} type="password" autoComplete="new-password" />
      {renderError(meta)}
    </div>
  )
}

const renderNumber = ({ input, label, meta}) => {
  const className = `field ${meta.error && meta.touched ? 'error': ''}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} type="number" autoComplete="new-password" />
      {renderError(meta)}
    </div>
  )
}

function newUserForm(props) {
  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  }
  
  return (
    <form onSubmit={props.handleSubmit(onSubmit)} autoComplete="off" className="ui form error newUserForm">
      <Field name="email" component={renderInput} label="Email" />
      <Field name="fullName" component={renderInput} label="Full Name" />
      <Field name="phoneNumber" component={renderNumber} label="Phone Number" />
      <Field name="password" component={renderPassword} label="Password" />
      <Field name="checkpass" component={renderPassword} label="Re-enter password" />
      <button className="ui primary button" type="submit">Submit</button>
    </form>
  )
}

const validate = formValues => {
  const error = {};
  if(!formValues.email) {
    error.email = 'You must enter email';
  }
  if(!formValues.fullName) {
    error.fullName = 'You must enter full name';
  }
  if(!formValues.phoneNumber) {
    error.phoneNumber = 'You must enter phone number';
  }

  if(!formValues.password) {
    error.password = 'You must enter password';
  } else if(formValues.password.length < 8){
    error.password = 'Password must be at least 8 characters';
  } else if(formValues.checkpass && formValues.checkpass !== formValues.password)  {
    error.checkpass = "Password didn't match"
  }
  

  return error;
}


export default reduxForm({
  form: 'newUserForm',
  validate: validate
})(newUserForm)
