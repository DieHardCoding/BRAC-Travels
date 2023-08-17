import React from 'react';
import ReactDOM from 'react-dom';
import history from '../history';
import './Modal.css';

function Modal(props) {

  return ReactDOM.createPortal(
    <div onClick={() => history.push('/select-service')} className="ui dimmer modals visible active customModal">
      <div onClick={(e) => e.stopPropagation()} className="ui large standard modal visible active">
        <div className="header">{props.header}</div>
        <div className="scrolling content">
          {props.content}
        </div>
        <div className="actions">
          {props.actions()}
        </div>
      </div>
    </div>,    
    document.querySelector('#modal')
  )
}

export default Modal;