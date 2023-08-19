import React from 'react';
import './editAirport.css';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField, Select, Button, FormControl, InputLabel, FormHelperText} from '@material-ui/core';
import { countryOptions } from '../../dummyData';
import { editAirport, fetchAirport } from '../../action';
import { useEffect } from 'react';

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

function EditAirport(props) {
  useEffect(() => {
    props.fetchAirport(props.match.params.id);
  }, [])

  const onSubmit = (formValues) => {
    props.editAirport(props.airport._id, formValues);
  }

  if(!props.airport) 
    return <div>Loading...</div>

  return (
    <div className="newAirport">
      <div className="newAirportTitleContainer">
        <h1 className="newAirportTitle">Edit airport</h1>
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
            Update
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
})(EditAirport)

const mapStateToProps = (state, ownProps) => {
  const airport = state.airports[ownProps.match.params.id]
  return {
    airport: airport,
    initialValues: {
      name: airport.name,
      location: airport.location,
      nation: airport.nation
    }
  }
}

export default connect(mapStateToProps, { editAirport, fetchAirport })(newAirportForm)
