import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { fetchAirports } from '../actions';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { searchFlights } from '../actions';
import history from '../history';


const startFrom = [
  { title: 'Ho Chi Minh City', value: 'HCM' },
  { title: 'Hanoi', value: 'HaNoi' },
  { title: 'Kien Giang', value: 'KienGiang'}
];

const destinations = [
  { title: 'TP Hồ Chí Minh', value: 'HCM' },
  { title: 'Hà Nội', value: 'HaNoi' },
  { title: 'Kiên Giang', value: 'KienGiang'}
]

function FormBooking(props) {

  // useEffect(() => {
  //   props.fetchAirports();
  // }, [])

  const onSubmit = (formValues) => {
    history.push('/select-flight');
  }
  if(!props.airports)
    return <div>Loading...</div>
  return (
    <div>
      <form onSubmit={props.handleSubmit(onSubmit)}>
        <div className="field">
          <Field name="type" component={renderRadio} label="" />
        </div>
        <div className="field">
          <Field name="startFrom" component={renderSelect}
          label="Departure"
           options={props.airports}
          />
        </div>
        <div className="field">
          <Field name="departureDay" component={DateField} label="Departure date" />
        </div>
        <div className="field">
          <Field name="destination" component={renderSelect} 
          options={props.airports}
          label="Destination" />
        </div>
        { props.type === 'roundtrip' && (
          <div className="field">
          <Field name="returnDay" component={DateField} label="Return Date" />
        </div>
        )}
        <div style={{ textAlign: 'center'}}>
          <Button type="submit" size="large" style={{ marginTop: 25 }} variant="contained" color="secondary">
            Find Flights
            <i className="fas fa-plane-departure" style={{marginLeft: 6}}></i>
          </Button>
        </div>
      </form>
    </div>
  )
}

const renderRadio = ({ input }) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup row {...input} >
        <FormControlLabel value="roundtrip" control={<Radio />} label="Round-trip
" />
        <FormControlLabel value="oneway" control={<Radio />} label="One-way" />
      </RadioGroup>
    </FormControl>
  )
}

const renderSelect = ({ input, options, label, meta }) => {
  let error = false;
  if(meta.error && meta.touched) {
    error = true;
  }
  return (
    <FormControl variant="outlined" error={error} style={{ width: '100%', marginTop: 15}}>
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        {...input}
        label="Departure"
      >
        
        {options.map((item) => {
          return <MenuItem key={item._id} value={item}>{item.name}</MenuItem>
        })}
      </Select>
      {error && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
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
      <KeyboardDatePicker disablePast style={{width: '100%', marginTop: 10}}
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

const validate = (formValues) => {
  const errors = {};
  const requiredFields = [
    'type',
    'startFrom',
    'destination',
    'departureDay',
    'returnDay',
  ];

  requiredFields.forEach(field => {
    if(!formValues[field]) {
      errors[field] = 'Do not leave blank';
    }
  })
  
  if(formValues['startFrom'] === formValues['destination']) {
    errors['destination'] = 'The destination cannot be the same as the departure point';
  }
  if(formValues['departureDay'] && formValues['returnDay']) {
    const departureDay = new Date(formValues['departureDay']);
    const returnDay = new Date(formValues['returnDay']);
    if(departureDay.getTime() > returnDay.getTime()) {
      errors['returnDay'] = 'The return date must be after the departure date'
    }
  }
  return errors;
}

const selector = formValueSelector('FormBooking');

const mapStateToProps = state => {
  return {
    airports: Object.values(state.airports),
    startFrom: selector(state, 'destination'),
    type: selector(state, 'type'),
    initialValues: {
      takeOffTime: new Date().toISOString(),
      startFrom: selector(state, 'startFrom'),
      type: 'roundtrip'
    },
  }
};

const formWrapped = reduxForm({
  form: 'FormBooking',
  validate: validate,
  destroyOnUnmount: false
})(FormBooking);

export default connect(mapStateToProps, { searchFlights, fetchAirports })(formWrapped);
