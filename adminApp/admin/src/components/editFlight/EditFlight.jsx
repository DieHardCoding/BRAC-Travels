import React from 'react';
import './editFlight.css'
import { connect } from 'react-redux';
import { fetchAirports, fetchAirliners, fetchFlight, editFlight } from '../../action';
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
        startAdornment: <InputAdornment position="start">VND</InputAdornment>,
      }}
      style={{ width: '100%', marginTop: 15 }}
    />
  )
}

function EditFlight(props) {
  useEffect(() => {
    props.fetchAirports();
    props.fetchAirliners();
    props.fetchFlight(props.match.params.id);
  }, []);

  const onSubmit = (formValues) => {
    props.editFlight(props.flight._id, {...formValues, price: {
      Eco: { value: formValues.Eco, tax: formValues.tax },
      Deluxe: { value: formValues.Deluxe, tax: formValues.tax },
      SkyBOSS: { value: formValues.SkyBOSS, tax: formValues.tax }
    }, cabinFuselage: cabinFuselage});
  }

  

  if (!props.flight)
    return <div>Loading...</div>
  return (
    <div className="newFlight">
      <div className="newFlightTitleContainer">
        <h1 className="newFlightTitle">Edit flight</h1>
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
            Update
          </Button>
        </form>
      </div>
    </div>
  )
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

const editFlightForm = reduxForm({
  form: 'editFlightForm',
  validate: validate
})(EditFlight);

const mapStateToProps = (state, ownProps) => {
  const flights = Object.values(state.flights);
  const matchedflight = flights.find(flight => {
    if(flight._id === ownProps.match.params.id) {
      return flight;
    }
  });
  //console.log(matchedflight.takeOffTime.slice(0, 16));
  return {
    airports: Object.values(state.airports),
    airliners: Object.values(state.airliners),
    flight: matchedflight,
    initialValues: {
      'startFrom': matchedflight.startFrom._id,
      'destination': matchedflight.destination._id,
      'airliner': matchedflight.airliner._id,
      'type': matchedflight.type,
      'takeOffTime': matchedflight.takeOffTime.slice(0, 16),
      'landingTime': matchedflight.landingTime.slice(0, 16),
      'Eco' : matchedflight.price.Eco.value,
      'Deluxe': matchedflight.price.Deluxe.value,
      'SkyBOSS': matchedflight.price.SkyBOSS.value,
      'tax': matchedflight.price.Eco.tax
    }
  }
}

export default connect(mapStateToProps, { fetchAirports, fetchAirliners, fetchFlight, editFlight })(editFlightForm)
