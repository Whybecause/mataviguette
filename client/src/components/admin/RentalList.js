import React from 'react';
import PropTypes from 'prop-types';
import Rental from './Rental';

const RentalList = (props) => {
    const rentalNodes = props.data.map(rental => (
        <Rental
        key={rental._id}
        id={rental._id}
        title={rental.title}
        user= {rental.user}
        city = {rental.city}
        street = {rental.street}
        category = {rental.category}
        bedrooms = {rental.bedrooms}
        dailyRate = {rental.dailyRate}
        createdAt = {rental.createdAt}
        >
        </Rental>
    ));
    return (
        <div>
            {rentalNodes}
        </div>
    );
};

RentalList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        user: PropTypes.object,
        city: PropTypes.string,
        street: PropTypes.string,
        category: PropTypes.string,
        bedrooms: PropTypes.number,
        dailyRate: PropTypes.number,
        createdAt: PropTypes.string,
    })),
};

RentalList.defaultProps = {
    data: [],
};

export default RentalList;