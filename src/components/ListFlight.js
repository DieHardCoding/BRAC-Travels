import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { selectFlight, selectReturnFlight } from '../actions';
import { connect } from 'react-redux';

function ListFlight(props) {
  const { flights } = props;

  const onSelectFlight = (flight, value) => {
    flight.totalPrice = parseInt(flight.price.value) + parseInt(flight.price.tax);
    props.selectFlight(flight);
    console.log(value)
  }

  const onSelectReturnFlight = (flight, value) => {
    flight.totalPrice = parseInt(flight.price.value) + parseInt(flight.price.tax);
    props.selectReturnFlight(flight);
    console.log(value)
  }

  const renderedList = flights.map(flight => {
    return (
      <tr key={flight.flightId}>
        <td>{flight.startFrom.name}</td>
        <td>{flight.destination.name}</td>
        <td>
          <FormControlLabel value="Eco"
            checked={props.selectedFlight && flight.flightId === props.selectedFlight.flightId && props.selectedFlight.type === 'Eco'}
            onChange={() => onSelectFlight({ ...flight, type: 'Eco', price: flight.price.Eco })}
            control={<Radio />} label="Eco" /><br />{parseInt(flight.price.Eco.value).toLocaleString('it-IT', { style: 'currency', currency: 'BDT' })}
        </td>
        <td>
          <FormControlLabel value="Deluxe"
            checked={props.selectedFlight && flight.flightId === props.selectedFlight.flightId && props.selectedFlight.type === 'Deluxe'}
            onChange={() => onSelectFlight({ ...flight, type: 'Deluxe', price: flight.price.Deluxe })}
            control={<Radio />} label="Deluxe" /><br />{parseInt(flight.price.Deluxe.value).toLocaleString('it-IT', { style: 'currency', currency: 'BDT' })}</td>

        <td>
          <FormControlLabel value="SkyBOSS"
            checked={props.selectedFlight && flight.flightId === props.selectedFlight.flightId && props.selectedFlight.type === 'SkyBOSS'}
            onChange={() => onSelectFlight({ ...flight, type: 'SkyBOSS', price: flight.price.SkyBOSS })}
            control={<Radio />} label="SkyBOSS" /><br />{parseInt(flight.price.SkyBOSS.value).toLocaleString('it-IT', { style: 'currency', currency: 'BDT' })}
        </td>
      </tr>
    )
  });
  const renderedReturnList = flights.map(flight => {
    return (
      <tr key={flight.flightId}>
        <td>{flight.startFrom.name}</td>
        <td>{flight.destination.name}</td>
        <td>
          <FormControlLabel value="Eco"
            checked={props.selectedReturnFlight && flight.flightId === props.selectedReturnFlight.flightId && props.selectedReturnFlight.type === 'Eco'}
            onChange={() => onSelectReturnFlight({ ...flight, type: 'Eco', price: flight.price.Eco })}
            control={<Radio />} label="Eco" /><br />{parseInt(flight.price.Eco.value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
        </td>
        <td>
          <FormControlLabel value="Deluxe"
            checked={props.selectedReturnFlight && flight.flightId === props.selectedReturnFlight.flightId && props.selectedReturnFlight.type === 'Deluxe'}
            onChange={() => onSelectReturnFlight({ ...flight, type: 'Deluxe', price: flight.price.Deluxe })}
            control={<Radio />} label="Deluxe" /><br />{parseInt(flight.price.Deluxe.value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>

        <td>
          <FormControlLabel value="SkyBOSS"
            checked={props.selectedReturnFlight && flight.flightId === props.selectedReturnFlight.flightId && props.selectedReturnFlight.type === 'SkyBOSS'}
            onChange={() => onSelectReturnFlight({ ...flight, type: 'SkyBOSS', price: flight.price.SkyBOSS })}
            control={<Radio />} label="SkyBOSS" /><br />{parseInt(flight.price.SkyBOSS.value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
        </td>
      </tr>
    )
  });


  return (
    <form>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Điểm khởi hành</th>
            <th>Điểm đến</th>
            <th>Eco</th>
            <th>Deluxe</th>
            <th>SkyBoss</th>
          </tr>
        </thead>

        <tbody>
          {props.type === 'oneway' && renderedList}
          {props.type === 'roundtrip' && renderedReturnList}
        </tbody>
      </table>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedFlight: state.selectedFlight,
    selectedReturnFlight: state.selectedReturnFlight,
  }
}

export default connect(mapStateToProps, { selectFlight, selectReturnFlight })(ListFlight);
