import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import BookingInFor from './BookingInFor';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Form, Dropdown, Input } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { createTicket } from '../actions'
import Booking from '../api/Booking';
import history from '../history';
import './billingInfo.css'

const cardOptions = [
  { value: 'Visa', text: 'Visa' },
  { value: 'American Express', text: 'American Express' },
  { value: 'Mastercard', text: 'Mastercard' }
]

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
        options={cardOptions}
      />
    </Form.Field>
  )
}

const renderTextField = ({ input, placeholder, label, meta }) => {
  return (
    <Form.Field className={`${meta.touched && meta.invalid ? 'error' : ''}`}>
      <label>{label}</label>
      <Input type="text"
        {...input}

        placeholder={placeholder}
      />
    </Form.Field>
  )
}


function BillingInfo(props) {

  const onSubmit = (formValues) => {
    // Đặt vé
    const { type } = props;
    if(type === 'oneway') {
      const { passenger } = props;
      const { selectedFlight } = props;
      Booking.post('/booking/ticket', {
        buyerName : passenger.firstName + ' ' + passenger.lastName,
        buyerId: passenger.passengerId,
        phoneNumber: passenger.phone,
        email: passenger.email,
        address: passenger.address,
        dateOfBirth: passenger.birthDay,
        nationality: passenger.country,
        status: true,
        ticketInfos: [
          {
            flightId: selectedFlight._id, 
            passenger: passenger.firstName + ' ' + passenger.lastName,
            passengerId: passenger.passengerId,
            phoneNumber: passenger.phone,
            type: selectedFlight.type,
            price: selectedFlight.totalPrice,
            seat: props.selectedSeat[0] ? props.selectedSeat[0].id : '',
            status: true
          },
        ]
      }).then(res => {
        props.createTicket(res.data);
        history.push('/booking-success');
      }).catch(err => {
        console.log(err);
      })
    } else if(type ==='roundtrip') {
      const { passenger } = props;
      const { selectedFlight, selectedReturnFlight} = props;
      Booking.post('/booking/ticket', {
        buyerName : passenger.firstName + ' ' + passenger.lastName,
        buyerId: passenger.passengerId,
        phoneNumber: passenger.phone,
        email: passenger.email,
        address: passenger.address,
        dateOfBirth: passenger.birthDay,
        nationality: passenger.country,
        status: true,
        ticketInfos: [
          {
            flightId: selectedFlight._id, 
            passenger: passenger.firstName + ' ' + passenger.lastName,
            passengerId: passenger.passengerId,
            phoneNumber: passenger.phone,
            type: selectedFlight.type,
            price: selectedFlight.totalPrice,
            seat: props.selectedSeat[0] ? props.selectedSeat[0].id : '',
            status: true
          },
          {
            flightId: selectedReturnFlight._id, 
            passenger: passenger.firstName + ' ' + passenger.lastName,
            passengerId: passenger.passengerId,
            phoneNumber: passenger.phone,
            type: selectedReturnFlight.type,
            price: selectedReturnFlight.totalPrice,
            seat: props.selectedReturnSeat[0] ? props.selectedReturnSeat[0].id : '',
            status: true
          }
        ]
      }).then(res => {
        props.createTicket(res.data);
        history.push('/booking-success');
      }).catch(err => {
        console.log(err);
      })
    }
  }

  const renderServices = () => {
    return (
      <div className="ui container grid" style={{ marginTop: 20 }}>
        <div className="eleven wide column">
          <Form onSubmit={props.handleSubmit(onSubmit)}>
            <h4 className="ui dividing header">Billing Information</h4>
            <div className="field">
              <label>Card type</label>
              <Field name="cardType" component={renderSelectField} />
            </div>
            <div className="fields">
              <div className="seven wide field">
                <label>Card number</label>
                <input type="text" name="card[number]" maxlength="16" placeholder="Card #" />
              </div>
              <div className="three wide field">
                <label>CVC</label>
                <input type="text" name="card[cvc]" maxlength="3" placeholder="CVC" />
              </div>
              <div className="six wide field">
                <label>Card expiry date</label>
                <div className="two fields">
                  <div className="field">
                    <select className="ui fluid search dropdown" name="card[expire-month]">
                      <option value="">Month</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>
                  <div className="field">
                    <input type="text" name="card[expire-year]" maxlength="4" placeholder="Year" />
                  </div>
                </div>
              </div>
            </div>
            <div className="div" style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '35px' }}>
              <Link to="/select-service" className="ui button">
                Return
              </Link>
              <button type="submit" className="ui button primary">
                Book Tickets
              </button>
            </div>
          </Form>

        </div>
        <div className="five wide column">
          <BookingInFor />
        </div>
      </div>
    )
  }

  if(!props.startFrom) 
    return <Redirect to="/" />

  return (
    <div className="billingBackground">
      <div className="ui container wrapper">
        <div className="search__info">
          {props.type === 'oneway' && <h3>ONE-WAY FLIGHT | 1 adult</h3>}
          {props.type === 'roundtrip' && <h3>ROUND-WAY FLIGHT | 1 adult</h3>}
          <div className="desciption">
            <p style={{ marginRight: 20 }}>
              <i style={{ marginRight: 10 }} className="fas fa-map-marker-alt"></i>
              Departure <span>{props.startFrom.name}</span>
            </p>
            <p>
              <i style={{ marginRight: 10 }} className="fas fa-map-marker-alt"></i>
              Destination <span>{props.destination.name}</span>
            </p>
          </div>
        </div>
        <div className="icons">
          <i style={{ color: '#fff', fontSize: '32px' }} className="fas fa-user-circle"></i>
        </div>
      </div>
      {renderServices()}

    </div>
  )
}

const selector = formValueSelector('passenger');
const selectorBooking = formValueSelector('FormBooking');
const mapStateToProps = (state) => {
  return {
    startFrom: selectorBooking(state, 'startFrom'),
    destination: selectorBooking(state, 'destination'),
    type: selectorBooking(state, 'type'),
    flights: Object.values(state.flights),
    selectedFlight: state.selectedFlight,
    passenger: selector(state, 'firstName', 'lastName', 'address', 'email', 'phone', 'birthDay', 'country', 'passengerId'),
    selectedSeat: Object.values(state.selectedSeat),

    selectedReturnFlight: state.selectedReturnFlight,
    selectedReturnSeat: Object.values(state.selectedReturnSeat),

  }
}

const BillingInfoForm = reduxForm({
  form: 'billingInfoForm',
})(BillingInfo);

export default connect(mapStateToProps, { createTicket })(BillingInfoForm);
