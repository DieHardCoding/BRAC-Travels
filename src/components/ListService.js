import React, { useState } from 'react';
import CardItem from './CardItem';
import SeatImage from '../img/Seat.png';
import Luggage from '../img/luggage.png';
import Plane from './Plane';
import { connect } from 'react-redux';

function ListService(props) {
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [showLuggageModal, setShowLuggageModal] = useState(false);
  let cabinIndex = 0;
  switch (props.flight.type) {
    case 'Deluxe':
      cabinIndex = 1;
      break;
    case 'SkyBOSS':
      cabinIndex = 0;
      break;
    case 'Eco':
      cabinIndex = 2;
      break;
    default:
      break;
  }
  let cabinIndex2 = 0;
  if (props.returnFlight) {
    switch (props.returnFlight.type) {
      case 'Deluxe':
        cabinIndex2 = 1;
        break;
      case 'SkyBOSS':
        cabinIndex2 = 0;
        break;
      case 'Eco':
        cabinIndex2 = 2;
        break;
      default:
        break;
    }
  }

  const SeatsMapcontent = (
    <>
      <h3>Chuyến đi</h3>
      <Plane
        return={false}
        airliner={props.airliner}
        cabin={props.flight.cabinFuselage[cabinIndex]}
        type={props.flight.type} />
      
      {props.returnFlight && 
        <>
          <h3>Chuyến về</h3>
          <Plane
            return={true}
            airliner={props.returnFlight.airliner}
            cabin={props.returnFlight.cabinFuselage[cabinIndex2]}
            type={props.returnFlight.type} />
        </>
      }

    </>
  )

  const LuggageContent = (
    <p>Hãy chọn gói hành lý </p>
  )

  const SeatMapAction = () => {
    return (
      <button onClick={() => setShowSeatModal(!showSeatModal)} className="ui primary button">OK</button>
    )
  }

  const LuggageAction = () => {
    return (
      <button onClick={() => setShowLuggageModal(!showLuggageModal)} className="ui primary button">OK</button>
    )
  }

  const onSeatOutSideClick = () => {
    setShowSeatModal(!showSeatModal);
  }
  const onLuggageOutSideClick = () => {
    setShowLuggageModal(!showLuggageModal);
  }

  return (
    <div>
      <CardItem
        src={SeatImage}
        heading="Chọn chỗ ngồi yêu thích"
        description="Hãy chọn chỗ ngồi yêu thích của bạn"
        content={SeatsMapcontent}
        actions={SeatMapAction}
        showModal={showSeatModal}
        onOutSideClick={onSeatOutSideClick}
      />
      <CardItem
        src={Luggage}
        heading="Chọn hành lý"
        description="Hãy chọn gói hành lý phù hợp"
        content={LuggageContent}
        actions={LuggageAction}
        showModal={showLuggageModal}
        onOutSideClick={onLuggageOutSideClick} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    airliner: state.selectedFlight.airliner,
    flight: state.selectedFlight,
    returnFlight: state.selectedReturnFlight
  }
}

export default connect(mapStateToProps, {})(ListService)

