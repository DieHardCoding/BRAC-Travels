import React from 'react';
import BookingInFor from './BookingInFor';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';

import PassengerInput from './PassengerInput';

function Passengers(props) {

  const renderPassengers = () => {
    return (
      <div className="ui container grid" style={{ marginTop: 20 }}>
        <div className="ten wide column">
          <PassengerInput />
          <div className="div" style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '35px' }}>
            <Link to="/select-flight" className="ui button">
              Quay lại
            </Link>
            <Link to="/select-service" className="ui button primary">
              Tiếp tục
            </Link>
          </div>
        </div>
        <div className="six wide column">
          <BookingInFor />
        </div>

      </div>
    )
  }
  if (!props.startFrom)
    return <Redirect to="/" />

  return (
    <div>
      <div className="ui container wrapper">
        <div className="search__info">
          <h3>CHUYẾN BAY MỘT CHIỀU | 1 Người lớn</h3>
          <div className="desciption">
            <p style={{ marginRight: 20 }}>
              <i style={{ marginRight: 10 }} className="fas fa-map-marker-alt"></i>
              Điểm Khởi hành <span>{props.startFrom.name}</span>
            </p>
            <p>
              <i style={{ marginRight: 10 }} className="fas fa-map-marker-alt"></i>
              Điểm đến <span>{props.destination.name}</span>
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
