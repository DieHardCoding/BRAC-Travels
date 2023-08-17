import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import BookingInFor from './BookingInFor';
import { formValueSelector } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import { searchFlights, searchReturnFlights } from '../actions';
//import ListFlight from './ListFlight';
import logo from '../public/images/logo192.png';
import ThreeDots from './ThreeDots';
import './SelectFlight.css';
const ListFlight = lazy(() => import('./ListFlight'));


function SelectFlight(props) {
  useEffect(() => {
    if (props.startFrom) {
      props.searchFlights({
        date: props.departureDay,
        start: props.startFrom._id,
        destination: props.destination._id,
        passenger: 1
      });
      if (props.type === 'roundtrip') {
        props.searchReturnFlights({
          date: props.returnDay,
          start: props.destination._id,
          destination: props.startFrom._id,
          passenger: 1
        });
      }
    }
  }, []);
  const departureDay = new Date(props.departureDay).toLocaleDateString();
  const returnDay = new Date(props.returnDay).toLocaleDateString();
  const renderFlights = () => {
    if (!props.flights) {
      return <div></div>
    } else {
      return (

        <div className="ui container grid" style={{ marginTop: 20 }}>
          <div className="eleven wide column">
            <Suspense fallback={ThreeDots}>
              {props.flights.length === 0 ? <div>Không có chuyến bay nào.</div> :
                <>
                  <h3 className="ui header customHeader">Chuyến bay đi: {departureDay}</h3>
                  <ListFlight type="oneway" flights={props.flights} />
                  {
                    props.type === 'roundtrip' &&
                    <>
                      <h3 className="ui header customHeader">Chuyến bay về: {returnDay}</h3>
                      <ListFlight type="roundtrip" flights={props.returnFlights} />
                    </>
                  }
                  <div className="div" style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '35px', marginBottom: '40px' }}>
                    <Link to="/" className="ui button">
                      Return
                    </Link>
                    <Link to="/passengers" className="ui button primary">
                      Continue
                    </Link>
                  </div>
                </>
              }
            </Suspense>
          </div>
          <div className="five wide column customSixColumn">
            <BookingInFor />
          </div>

        </div>

      )
    }
  }
  if (!props.startFrom)
    return <Redirect to="/" />
  return (
    <div className="backgroundCustom">
      <div className="ui container wrapper">
        <div className="search__info">
          {props.type === 'oneway' && <h3>ONE WAY TRIP | 1 Adult</h3>}
          {props.type === 'roundtrip' && <h3>ROUND WAY TRIP | 1 Adult</h3>}
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
      {renderFlights()}

    </div>
  )
}

const selector = formValueSelector('FormBooking');
const mapStateToProps = (state) => {
  return {
    startFrom: selector(state, 'startFrom'),
    destination: selector(state, 'destination'),
    departureDay: selector(state, 'departureDay'),
    returnDay: selector(state, 'returnDay'),
    type: selector(state, 'type'),
    flights: Object.values(state.flights),
    returnFlights: Object.values(state.returnFlights)
  }
}

export default connect(mapStateToProps, { searchFlights, searchReturnFlights })(SelectFlight);
