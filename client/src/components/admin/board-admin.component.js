import React, { useState, useEffect } from "react";
import { Box } from '@chakra-ui/react';

import bookingService from '../../services/booking.service';
import DashboardNav from './dashboard/dashboard-nav';
import Reservations from './dashboard/reservations/reservations';
import Calendar from './dashboard/calendar';
import Historique from './dashboard/historique';
import UpdateRental from './dashboard/updateRental';

const BoardAdmin = () => {
  const [showReservations, setShowReservations ] = useState(true);
  const [showCalendar, setShowCalendar ] = useState(false);
  const [showHistorique, setShowHistorique ] = useState(false);
  const [showUpdateRental, setShowUpdateRental ] = useState(false);

  let [ currentBookings, setCurrentBookings ] = useState([]);
  let [ allBookings, setAllBookings ] = useState([]);

  useEffect( () => {
    bookingService.getCurrentBookings()
    .then( (res) => {
      setCurrentBookings(res.data)
    })
    .catch( (error) => {
        console.log(error);
    })

    bookingService.getAllBookings()
    .then( (res) => {
        setAllBookings(res.data)
    })
    .catch( (error) => {
        console.log(error);
    })
}, [])

  let DashboardContent = null;

  if (showReservations) {
    DashboardContent = (
      <Reservations currentBookings={currentBookings} setCurrentBookings={setCurrentBookings} />
    )
  }
  if (showCalendar) {
    DashboardContent = (
      <Calendar />
    )
  }
  if (showHistorique) {
    DashboardContent = (
      <Historique allBookings={allBookings}/>
    )
  }
  if (showUpdateRental) {
    DashboardContent = (
      <UpdateRental />
    )
  }
  
  return (
    <>
    <div className="small-page-height">

        <DashboardNav
          setShowReservations = {setShowReservations}
          numberOfCurrentBookings ={currentBookings.length}
          setShowCalendar = {setShowCalendar}
          setShowHistorique = {setShowHistorique}
          numberOfAllBookings = {allBookings.length}
          setShowUpdateRental={setShowUpdateRental}
          >      
        </DashboardNav>
        <Box mt={[40, 20, 20, 20]}>{DashboardContent}</Box>
      </div>
    </>
  )
}

export default BoardAdmin;
