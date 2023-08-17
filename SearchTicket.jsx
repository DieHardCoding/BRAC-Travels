import React, { useState, lazy, Suspense } from 'react';
import './searchTicket.css';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import searchBooking from '../../api/searchBooking';
import SearchImg from '../../public/images/searchBooking.jpg';


const renderTextField = ({ input, label, meta }) => {
  return (
    <TextField
      {...input}
      label={label}
      error={meta.touched && meta.invalid}
      id="outlined-size-small"
      defaultValue="Small"
      variant="outlined"
      size="small"
      style={{ width: '100%', marginBottom: '20px', backgroundColor: '#fff' }}
    />
  )
}

function SearchTicket(props) {
  const [booking, setBooking] = useState(null);
  const onSubmit = (formValues) => {
    searchBooking.get(`/booking/pnr/${formValues.pnr}?fullname=${formValues.firstName + ' ' + formValues.lastName}`)
      .then(res => {
        const data = res.data[0];
        const takeOffTime = new Date(data.tickets[0].flightId.takeOffTime);
        const landingTime = new Date(data.tickets[0].flightId.landingTime);
        data.tickets[0].flightId.takeOffTime = takeOffTime.toLocaleString();
        data.tickets[0].flightId.landingTime = landingTime.toLocaleString();
        data.tickets[1].flightId.takeOffTime = takeOffTime.toLocaleString();
        data.tickets[1].flightId.landingTime = landingTime.toLocaleString();

        setBooking(data);
      })
      .catch(error => {
        setBooking({ error: 'No booking information found!' })
      })
  }

  return (
    <div className="searchTicket">
      <div className="searchTicketContainer">
        <div className="searchTicketCard">
          <div className="formLeft">
            <h2 className="searchTicketHeading">My Flight</h2>
            <p>If you want to view your booked flight, please fill out the information below:
            </p>
            <form onSubmit={props.handleSubmit(onSubmit)} style={{ marginTop: '30px', textAlign: 'center' }}>
              <Field name="pnr" component={renderTextField} label="Booking code" />
              <Field name="firstName" component={renderTextField} label="First Name" />
              <Field name="lastName" component={renderTextField} label="Last Name" />
              
              <button className="searchTicketButton">Search</button>
            </form>
            {booking && !booking.error &&
              <div className="result">
                <div className="content">
                  <h4 className="ui sub header">Booking information</h4>
                  <div className="ui small feed ticket-info">
                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          <span>Booking code: {booking.pnr}</span>
                        </div>
                      </div>
                    </div>
                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          <span>Ticket Type: {booking.tickets.length === 2 ? 'Round-trip' : 'One-way'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          <span>Passenger: {booking.buyerName}</span>
                          <hr />
                        </div>
                      </div>
                    </div>
                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          Trip:
                          {booking.tickets[0].flightId.startFrom.name}
                          <i style={{ marginLeft: 20, marginRight: 20 }} className="fas fa-plane"></i>
                          {booking.tickets[0].flightId.destination.name}
                          <div>
                            Space: {booking.tickets[0].type};  Seats:  {booking.tickets[0].seat}
                          </div>
                          <div>
                            <span>Departure: {booking.tickets[0].flightId.takeOffTime}</span>
                            <div> Landing: {booking.tickets[0].flightId.landingTime}</div>

                            <hr />
                            {booking.tickets[1] &&
                              <div className="event">
                                <div className="content">
                                  <div className="summary">
                                    Return Trip:
                                    {booking.tickets[1].flightId.startFrom.name}
                                    <i style={{ marginLeft: 20, marginRight: 20 }} className="fas fa-plane"></i>
                                    {booking.tickets[1].flightId.destination.name}
                                    <div>
                                      Space: {booking.tickets[1].type};   Seats: {booking.tickets[1].seat}
                                    </div>
                                    <div>
                                      <span>Departure: {booking.tickets[1].flightId.takeOffTime}</span>
                                      <div> Landing: {booking.tickets[1].flightId.landingTime}</div>
                                    </div>
                                  </div>
                                </div>
                                <hr />
                              </div>
                            }
                            <div className="ui content">
                              Fare: <span className="ui header red">{booking.totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'BDT' })}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            }
            {
              booking && booking.error &&
              <div className="searchError">
                {booking.error}
              </div>
            }
          </div>
          <img className="searchImg" src={SearchImg} alt="searchImg" />
        </div>
      </div>
    </div>
  )
}

const validate = (formValues) => {
  const error = {};
  const requiredField = [
    'pnr',
    'firstName',
    'lastName'
  ]
  requiredField.forEach(field => {
    if (!formValues[field]) {
      error[field] = 'Do not leave blank.'
    }
  })
  return error;
}

const SearchTicketForm = reduxForm({
  form: 'searchTicketForm',
  validate: validate
})(SearchTicket);

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(SearchTicketForm)
