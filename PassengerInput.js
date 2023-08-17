import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Dropdown, Input } from 'semantic-ui-react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import './PassengerInput.css';

const countryOptions = [
  { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
  { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
  { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
  { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
  { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
  { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
  { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
  { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
  { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
  { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
  { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
  { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
  { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
  { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
  { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
  { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
  { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
  { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
  { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
  { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
  { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
  { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
  { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
  { key: 'vn', value: 'vn', flag: 'vn', text: 'Viet Nam' }
]


const renderTextField = ({ input, placeholder, label, meta }) => {
  return (
    <Form.Field className={`${meta.touched && meta.invalid ? 'error': ''}`}>
      <label>{label}</label>
      <Input type="text"
        {...input}
        
        placeholder={placeholder}
        />
    </Form.Field>
  )
}

const renderSelectField = ({ input, label, placeholder }) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Dropdown
        selection
        value={input.value}
        onChange={(param, data) => input.onChange(data.value)}
        placeholder={placeholder}
        fluid
        search
        options={countryOptions}
      />
    </Form.Field>
  )
}

const renderDatePicker = ({ input, label, meta }) => {
  console.log(input);
  return (
    <Form.Field className={`customDatePickerWidth ${meta.touched && meta.invalid ? ' error' : ''}`}>
      <label>{label}</label>
      <DatePicker 
        selected={input.value} 
        onChange={input.onChange}
        placeholderText="Date of birth" />
    </Form.Field>
  )
}


function PassengerInput() {
  return (
    <Form>
      <h4 class="ui dividing header">Passenger information</h4>
      <label>First and Last Name</label>
      <Form.Group widths="equal">
        <Field name="firstName" placeholder="firstName" component={renderTextField} />
        <Field name="lastName" placeholder="lastName" component={renderTextField} />
      </Form.Group>
      <Form.Group widths="equal">
        <Field name="birthDay" label="birthDay" placeholder="Date of birth" component={renderDatePicker} />
        <Field name="country" label="country" placeholder="Choose a country" component={renderSelectField} />
      </Form.Group>
      <Form.Group widths="equal">
        <Field name="address" label="address" placeholder="address" component={renderTextField} />
      </Form.Group>
      <Form.Group widths="equal">
        <Field name="email" label="Email" placeholder="Email Address" component={renderTextField} />
      </Form.Group>
      <Form.Group widths="equal">
        <Field name="passengerId" label="CMND" placeholder="CMND" component={renderTextField} />
      </Form.Group>
      <Form.Group widths="equal">
        <Field name="phone" label="Phone Number" placeholder="Phone Number" component={renderTextField} />
      </Form.Group>
      
    </Form>
  )
}

const validate = (formValues) => {
  const errors = {};
  const requiredField = [
    'firstName',
    'lastName',
    'birthDay',
    'country',
    'address',
    'email',
    'phone',
    'passengerId'
  ];
  requiredField.forEach(field => {
    if(!formValues[field]) {
      errors[field] = 'Do Not Leave Blank'
    }
  })
  return errors;
}


const wrapper = reduxForm({
  form: 'passenger',
  validate: validate,
  destroyOnUnmount: false,
})(PassengerInput);

export default connect(null)(wrapper);