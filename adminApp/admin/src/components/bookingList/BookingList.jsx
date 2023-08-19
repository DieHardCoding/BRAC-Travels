import React, {useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './bookingList.css';
import { DeleteOutline } from '@material-ui/icons';
import Modal from '../modal/Modal';


function BookingList(props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const columns = [
    { field: 'id', headerName: 'ID', width: 40 },
    { field: 'pnr', headerName: 'PNR', width: 100 },
    { field: 'buyerName', headerName: "Buyer's Name", width: 130 },
    { field: 'buyerId', headerName: "Buyer's ID", width: 130 },
    { field: 'phoneNumber', headerName: "Phone Number", width: 130 },
    { field: 'address', headerName: "Address", width: 130 },
    { field: 'nationality', headerName: "Nation", width: 100 },
    { field: 'totalPrice', headerName: "TotalPrice", width: 130, 
      valueFormatter: ({value}) => value.toLocaleString('it-IT', { style: 'currency', currency: 'BDT' }) },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 140,
      renderCell: (params) => {
        return (
          <>
            <button className="FlightListEdit">Edit</button>
            <DeleteOutline
             className="FlightListDelete" onClick={() => showDeleteBookingModal(params.row)}/>
          </>
        )
      }
    }
  ];

  
  const showDeleteBookingModal = (booking) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  }

  const onDeleteBooking = () => {
    props.onDelete(selectedBooking._id);
    setShowDeleteModal(false);
  }

  const actions = (
    <>
      <button onClick={() => setShowDeleteModal(false)} className="ui negative button">No</button>
      <button onClick={() => onDeleteBooking()} className="ui positive button">Yes</button>
    </>
  )

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={props.rows}  columns={columns} pageSize={5} disableSelectionOnClick checkboxSelection />
      </div>
      {showDeleteModal ? <Modal redirect='/flights' type="tiny"
        actions={actions} header="Warning" content={`Do you want to delete booking with name ${selectedBooking.buyerName} ?`} /> : null
      }
    </>
  )
}


export default BookingList;
