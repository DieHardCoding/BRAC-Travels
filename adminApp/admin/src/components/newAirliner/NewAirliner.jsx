import React from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import './newAirliner.css';
import { Field, reduxForm } from 'redux-form';
import { createAirliner } from '../../action';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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

const DateField = props => {
  const {
    meta: { submitting, error, touched },
    input: { onBlur, value, ...inputProps },
    ...others
  } = props;

  const onChange = date => {
    Date.parse(date) ? inputProps.onChange(date.toISOString()) : inputProps.onChange(null);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker disableFuture style={{width: '100%', marginTop: 10}}
        {...inputProps}
        {...others}
        format="dd/MM/yyyy"
        value={value ? new Date(value) : null}
        disabled={submitting}
        onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
        error={error && touched}
        onChange={onChange}
      />
    
    </MuiPickersUtilsProvider>
  );
};


function NewAirliner(props) {

  const onSubmit = (formValues) => {
    props.createAirliner({...formValues, passengerCapacity: [
      { seatType: 'Eco', amount: formValues.Eco },
      { seatType: 'Deluxe', amount: formValues.Deluxe },
      { seatType: 'SkyBOSS', amount: formValues.SkyBOSS }
    ]});
  }

  return (
    <div className="newAirliner">
      <div className="newAirlinerTitleContainer">
        <h1 className="newAirlinerTitile">New airliner</h1>
      </div>
      <div className="newAirlinerWrapper">
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <Field name="model" component={renderTextField} label="Model" />
          <Field name="manufacturer" component={renderTextField} label="Manufacturer" />
          <Field name="dateOfCommissioning" component={DateField} label="Date of Commissioning"/>
          <Field name="Eco" component={renderTextField} label="ECO capacity"/>
          <Field name="Deluxe" component={renderTextField} label="Deluxe capacity"/>
          <Field name="SkyBOSS" component={renderTextField} label="SkyBOSS capacity"/>
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
    'model',
    'manufacturer',
    'dateOfCommissioning',
    'Eco',
    'Deluxe',
    'SkyBOSS'
  ]
  requiredFields.forEach(field => {
    if(!formValues[field]) {
      error[field] = 'Do not leave blank'
    }
  });

  return error;
}


const newAirlinerForm = reduxForm({
  form: 'newAirlinerForm',
  validate: validate
})(NewAirliner)


export default connect(null, { createAirliner })(newAirlinerForm);
