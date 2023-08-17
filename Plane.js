import React from 'react';

import Seat from './Seat';

import './Plane.css';
import ReturnSeat from './ReturnSeat';

function Plane(props) {
  const { cabin } = props;
  const renderSeats = (
    <ol className="cabin fuselage">
      <form>
      {
        cabin.rows.map(row => 
          <li className="row" key={row.rowIndex}>
            <ol className="seats" type="A">
            {row.seats.map(seat => {
              return (
                <Seat seat={seat}/>
              )
            })}
            </ol>
          </li>)
      }
      </form>
    </ol>
  )

  const renderReturnSeats = (
    <ol className="cabin fuselage">
      <form>
        {
          cabin.rows.map(row => 
            <li className="row" key={row.rowIndex}>
              <ol className="seats" type="A">
              {row.seats.map(seat => {
                return (
                  <ReturnSeat seat={seat}/>
                )
              })}
              </ol>
            </li>)
        }
      </form>
    </ol>
  )
  
  return (
    <div className="plane">
      <div className="cockpit">
        <h1>{props.airliner.manufacturer} {props.airliner.model}</h1>
        <p>Space: {props.type}</p>
      </div>
      <div className="exit exit--front fuselage">
      </div>
        {props.return ? renderReturnSeats: renderSeats}
      <div className="exit exit--back fuselage">

      </div>
    </div>
  )
}

export default Plane;