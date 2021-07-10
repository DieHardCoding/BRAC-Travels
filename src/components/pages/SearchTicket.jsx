import React, { useState, lazy, Suspense } from 'react';
import './searchTicket.css';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import searchBooking from '../../api/searchBooking';



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
    searchBooking.get(`/booking/pnr/${formValues.pnr}`)
      .then(res => {
        const data = res.data[0];
        const takeOffTime = new Date(data.tickets[0].flightId.takeOffTime);
        const landingTime = new Date(data.tickets[0].flightId.landingTime);
        data.tickets[0].flightId.takeOffTime = takeOffTime.toLocaleString();
        data.tickets[0].flightId.landingTime = landingTime.toLocaleString();
        setBooking(data);
      })
      .catch(error => {
        setBooking({ error: 'Không tìm thấy thông tin đặt chỗ!' })
      })
  }

  return (
    <div className="searchTicket">
      <div className="searchTicketContainer">
        <div className="searchTicketCard">
          <div className="formLeft">
            <h2 className="searchTicketHeading">CHUYẾN BAY CỦA TÔI</h2>
            <p>Bạn muốn xem chuyến bay đã đặt vui lòng điền thông tin bên dưới:
            </p>
            <form onSubmit={props.handleSubmit(onSubmit)} style={{ marginTop: '30px', textAlign: 'center' }}>
              <Field name="pnr" component={renderTextField} label="Mã đặt chỗ" />
              <Field name="firstName" component={renderTextField} label="Họ" />
              <Field name="lastName" component={renderTextField} label="Tên đệm & tên" />
              <button className="searchTicketButton">Tìm kiếm</button>
            </form>
            {booking && !booking.error &&
              <div className="result">
                <div className="content">
                  <h4 className="ui sub header">Thông tin đặt vé</h4>
                  <div className="ui small feed ticket-info">
                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          <span>Mã đặt chỗ: {booking.pnr}</span>
                        </div>
                      </div>
                    </div>
                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          <span>Loại vé: {booking.tickets.length === 2 ? 'Khứ hồi' : 'Một chiều'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          <span>Hành khách: {booking.buyerName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          Chuyến đi: 
                          {booking.tickets[0].flightId.startFrom.name}
                          <i style={{ marginLeft: 20, marginRight: 20 }} className="fas fa-plane"></i>
                          {booking.tickets[0].flightId.destination.name}
                          <div>
                            Khoang: {booking.tickets[0].type}   Ghế: {booking.tickets[0].seat}
                          </div>
                          <div>
                            <span>Khởi hành lúc: {booking.tickets[0].flightId.takeOffTime}</span>
                            <div> Hạ cánh lúc: {booking.tickets[0].flightId.landingTime}</div>
                            <div className="ui content">
                              Giá vé: <span className="ui header red">{booking.totalPrice} VNĐ</span>
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
          <div className="cardRight">
          </div>
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
      error[field] = 'Không bỏ trống.'
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
