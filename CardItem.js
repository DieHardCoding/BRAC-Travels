import React from 'react';
import { useState } from 'react';
import Modal from './Modal';
import './CardItem.css';


function CardItem(props) {
  //const [showModal, setShowModal] = useState(false);
  return (
    <div onClick={() => props.onOutSideClick()} className="CardItem">
      <div className="left-content">
        <img src={props.src} alt="seat" />
        <div className="header">
          <h3>{props.heading}</h3>
          <p>{props.description}</p>
        </div>
      </div>
      <div className="right-content">
        <i class="fas fa-chevron-right"></i>
      </div>
      {props.showModal && 
        <Modal header={props.heading} 
          content={props.content}
          actions={props.actions} />
      }
    </div>
  )
}

export default CardItem;
