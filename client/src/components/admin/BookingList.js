import React from 'react';
import PropTypes from 'prop-types';
import Booking from './Booking';
import { Row } from 'reactstrap';

const BookingList = (props) => {
    const bookingNodes = props.data.map(booking => (
        <Booking
        key={booking._id}
        id={booking._id}
        days={booking.days}
        startAt= {booking.startAt}
        endAt = {booking.endAt}
        totalPrice = {booking.totalPrice}
        guests = {booking.guests}
        user = {booking.user}
        rental = {booking.rental}
        createDate = {booking.createDate}
        message={props.message}
        onChangeMessage={props.onChangeMessage}
        handleContactBooker={props.handleContactBooker}
        alert={props.alert}
        className={props.className}
        loading={props.loading}
        showAdminBoard={props.showAdminBoard}
        handleDeleteBooking={props.handleDeleteBooking}
        >
        </Booking>
    ));
    return (
        <Row lg="2" xs="1">
            {bookingNodes}
        </Row>
    );
};

BookingList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        days: PropTypes.number,
        startAt: PropTypes.string,
        endAt: PropTypes.string,
        totalPrice: PropTypes.number,
        guests: PropTypes.number,
        user: PropTypes.object,
        rental: PropTypes.object,
        createDate: PropTypes.string,
    })),
    message: PropTypes.string,
    onChangeMessage: PropTypes.func,
    handleContactBooker: PropTypes.func,
    handleDeleteBooking: PropTypes.func.isRequired,
    alert: PropTypes.string,
    className: PropTypes.bool,
    loading: PropTypes.bool,
    showAdminBoard: PropTypes.bool
};

BookingList.defaultProps = {
    data: [],
};

export default BookingList;