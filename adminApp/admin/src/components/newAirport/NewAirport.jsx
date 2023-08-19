import React from 'react';
import './newAirport.css';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField, Select, Button, FormControl, InputLabel, FormHelperText} from '@material-ui/core';
import { countryOptions } from '../../dummyData';
import { createAirport } from '../../action';

const renderSelect = ({ input,
  label,
  meta: { touched, error },
  children,
  ...custom }) => {
  return (
    <FormControl error={touched && error} style={{width: '100%', marginTop: '20px'}}>
      <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
      <Select
        native
        {...input}
        {...custom}
        inputProps={{
          name: 'age',
          id: 'age-native-simple'
        }}
      >
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  )
}

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

const renderTextField = ({ input, label, meta }) => {
  return (
    <TextField 
      {...input} 
      label={label}
      error={meta.touched && meta.invalid} 
      style={{width: '100%', marginTop: '20px'}}
    />
  )
}

function NewAirport(props) {

  const onSubmit = (formValues) => {
    props.createAirport(formValues);
  }

  return (
    <div className="newAirport">
      <div className="newAirportTitleContainer">
        <h1 className="newAirportTitle">New airport</h1>
      </div>
      <div className="newAirportFormWrapper">
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <Field name="name" component={renderTextField} label="Name" />
          <Field name="location" component={renderTextField} label="Location" />
          <Field name="nation" component={renderSelect} label="Nation">
            <option value=''></option>
            {countryOptions.map(country => <option value={country.text}>{country.text}</option>)}
          </Field>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '30px'}}>
            Create
          </Button>
        </form>
      </div>
    </div>
  )
}

const validate = (formValues) => {
  const error = {};
  const requiredFields = [
    'name',
    'location',
    'nation'
  ];

  requiredFields.forEach(field => {
    if(!formValues[field]) {
      error[field] = 'Do not leave blank'
    }
  });
  return error;
}

const newAirportForm =  reduxForm({
  form: 'newAirport',
  validate: validate
})(NewAirport)

export default connect(null, { createAirport })(newAirportForm)
