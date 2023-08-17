import React from 'react';
import './BtnIcon.css';

function BtnIcon(props) {
  return (
    <div className="btn__icon">
      {props.children}
    </div>
  )
}

export default BtnIcon
