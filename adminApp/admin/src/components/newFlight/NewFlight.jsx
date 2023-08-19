import React from 'react';
import './newFlight.css';
import { connect } from 'react-redux';
import { fetchAirports, fetchAirliners, createFlight } from '../../action';
import { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, Button, InputAdornment, Select, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import { cabinFuselage } from '../../dummyData';


const renderSelect = ({ input,
  label,
  meta: { touched, error },
  children,
  ...custom }) => {
  return (
    <FormControl error={touched && error} style={{ width: '100%', marginTop: 15 }}>
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

const renderDateTime = ({ input, label, meta }) => {
  return (
    <TextField
      {...input}
      label={label}
      error={meta.touched && meta.invalid}
      type="datetime-local"
      InputLabelProps={{
        shrink: true,
      }}
      style={{ width: '100%', marginTop: 15 }}
    />
  )
}

const renderInputAdornment = ({ input, label, meta }) => {
  return (
    <TextField
      label="With normal TextField"
      id="standard-start-adornment"
      {...input}
      Label={label}
      error={meta.touched && meta.invalid}
      InputProps={{
        startAdornment: <InputAdornment position="start">BDT</InputAdornment>,
      }}
      style={{ width: '100%', marginTop: 15 }}
    />
  )
}

function NewFlight(props) {
  useEffect(() => {
    props.fetchAirports();
    props.fetchAirliners();
  }, []);

  const onSubmit = (formValues) => {
    props.createFlight({...formValues, price: {
      Eco: { value: formValues.Eco, tax: formValues.tax },
      Deluxe: { value: formValues.Deluxe, tax: formValues.tax },
      SkyBOSS: { value: formValues.SkyBOSS, tax: formValues.tax }
    }, cabinFuselage: cabinFuselage});
  }

  if (!props.airports)
    return <div>Loading...</div>
  return (
    <div className="newFlight">
      <div className="newFlightTitleContainer">
        <h1 className="newFlightTitle">New flight</h1>
      </div>
      <div className="newFlightFormWrapper">
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <div className="formSubmit">
            <div className="left">
              <Field name="startFrom" component={renderSelect} label="Start from">
                <option value=''></option>
                {props.airports.map(airport => <option key={airport._id} value={airport._id}>{airport.name}</option>
                )}
              </Field>
              <Field name="destination" component={renderSelect} label="Destination">
                <option value=''></option>
                {props.airports.map(airport => <option key={airport._id} value={airport._id}>{airport.name}</option>
                )}
              </Field>
              <Field name="takeOffTime" component={renderDateTime} label="Take-off time" />
              <Field name="landingTime" component={renderDateTime} label="Landing time" />
              <Field name="airliner" component={renderSelect} label="Airliner">
                <option value=''></option>
                {props.airliners.map(airliner =>
                  <option key={airliner._id} value={airliner._id}>{airliner.manufacturer + airliner.model}</option>
                )}
              </Field>
              <Field name="type" component={renderSelect} label="Type">
                <option value=''></option>
                <option value='domestic'>Domestic</option>
                <option value='international'>International</option>
              </Field>
            </div>
            <div className="right">
              <Field name="Eco" component={renderInputAdornment} label="Eco" />
              <Field name="Deluxe" component={renderInputAdornment} label="Deluxe" />
              <Field name="SkyBOSS" component={renderInputAdornment} label="SkyBOSS" />
              <Field name="tax" component={renderInputAdornment} label="Tax" />
            </div>
          </div>
          
          <Button type="submit" className="buttonCreateFlight" variant="contained" color="primary">
            Create flight
          </Button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    airports: Object.values(state.airports),
    airliners: Object.values(state.airliners)
  }
}

const validate = (formValues) => {
  const errors = {};
  const requiredFields = [
    'type',
    'startFrom',
    'destination',
    'takeOffTime',
    'landingTime',
    'airliner',
    'Eco',
    'Deluxe',
    'SkyBOSS',
    'tax'
  ];

  requiredFields.forEach(field => {
    if (!formValues[field]) {
      errors[field] = 'Do not leave blank';
    }
  })

  if (formValues['startFrom'] === formValues['destination']) {
    errors['destination'] = 'The destination cannot be the same as the departure point';
  }

  if(formValues['takeOffTime'] && formValues['landingTime']) {
    const takeOffTime = new Date(formValues['takeOffTime']);
    const landingTime = new Date(formValues['landingTime']);
    if(takeOffTime.getTime() > landingTime.getTime()) 
      errors['landingTime'] = 'Landing time must be after take-off time';
  }
  return errors;
}

const newFlightForm = reduxForm({
  form: 'newFlightForm',
  validate: validate
})(NewFlight);

export default connect(mapStateToProps, { fetchAirports, fetchAirliners, createFlight })(newFlightForm)
