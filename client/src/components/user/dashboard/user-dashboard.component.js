import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import bookingService from '../../../services/booking.service';
import DashboardNav from './user-dashboard-nav';
import BookingCard from './booking-card.component';

const UserDashboard = () => {
    const [ showCurrentBookings, setShowCurrentBookings ] = useState(true);
    const [ showAllBookings, setShowAllBookings ] = useState(false);
    const [ currentBookings, setCurrentBookings ] = useState([]);
    const [ allBookings, setAllBookings ] = useState([]);
    const [ refresh, setRefresh ] = useState('');


    useEffect( () => {
        bookingService.getAllUserBookings()
        .then( (res) => {
            setAllBookings(res.data.filter(date => dayjs(date.endAt) < dayjs().startOf('day')))
            setCurrentBookings(res.data.filter(date => dayjs(date.endAt) > dayjs().startOf('day')))            
        })
        .catch(err => console.log(err))
    }, [refresh]);

    let DashboardContent = null;

    if (showCurrentBookings) {
        DashboardContent = (
                <BookingCard setRefresh={setRefresh} bookings={currentBookings} showCurrentBookings={showCurrentBookings} />
        )
    }
    if (showAllBookings) {
        DashboardContent = (
                <BookingCard setRefresh={setRefresh} bookings={allBookings} showAllBookings={showAllBookings} />
        )
    }


    return (
        <div className="small-page-height">
            <DashboardNav
                setShowCurrentBookings = {setShowCurrentBookings}
                setShowAllBookings = {setShowAllBookings}
                numberOfCurrentBookings={currentBookings.length}
                numberOfAllBookings={allBookings.length}
                ></DashboardNav>
            {DashboardContent}
        </div>
    )
}

export default UserDashboard;