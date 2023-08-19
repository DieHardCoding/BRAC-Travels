import React from 'react';
import BookingInFor from './BookingInFor';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';

import PassengerInput from './PassengerInput';
import './passengers.css'

function Passengers(props) {

  const renderPassengers = () => {
    return (
      <div className="ui container grid" style={{ marginTop: 20 }}>
        <div className="eleven wide column">
          <PassengerInput />
          <div className="div" style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '35px' }}>
            <Link to="/select-flight" className="ui button">
              Return
            </Link>
            <Link to="/select-service" className="ui button primary">
              Contnue
            </Link>
          </div>
        </div>
        <div className="five wide column">
          <BookingInFor />
        </div>

      </div>
    )
  }
  if (!props.startFrom)
    return <Redirect to="/" />

  return (
    <div className="passengerBackground">
      <div className="ui container wrapper">
        <div className="search__info">
          {props.type === 'oneway' && <h3>ONE-WAY TRIP  | 1 Adult</h3>}
          {props.type === 'roundtrip' && <h3>ROUND-WAY TRIP | 1 Adult</h3>}
          <div className="desciption">
            <p style={{ marginRight: 20 }}>
              <i style={{ marginRight: 10 }} className="fas fa-map-marker-alt"></i>
              Departure: <span>{props.startFrom.name}</span>
            </p>
            <p>
              <i style={{ marginRight: 10 }} className="fas fa-map-marker-alt"></i>
              Destination: <span>{props.destination.name}</span>
            </p>
          </div>
        </div>
        <div className="icons">
          <i style={{ color: '#fff', fontSize: '32px' }} className="fas fa-user-circle"></i>
        </div>
      </div>
      {renderPassengers()}
    </div>
  )
}

const selector = formValueSelector('FormBooking');

const mapStateToProps = (state) => {
  return {
    startFrom: selector(state, 'startFrom'),
    destination: selector(state, 'destination'),
    type: selector(state, 'type'),
  }
}

export default connect(mapStateToProps)(Passengers);
