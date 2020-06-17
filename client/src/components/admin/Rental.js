import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


const Rental = props => (
            <div className="card text-center bg-white">
                <div className="card-body">
                    <h1 className="card-title">Location en cours : {props.title}</h1>
                    <ul className="list-group list-group-flush">
                        <p className="card-text border-bottom">Propriétaire : {props.user.username}</p>
                        <p className="card-text border-bottom">City : {props.city}</p>
                        <p className="card-text border-bottom">Street : {props.street}</p>
                        <p className="card-text border-bottom">Category : {props.category}</p>
                        <p className="card-text border-bottom">Bedrooms : {props.bedrooms}</p>
                        <p className="card-text border-bottom">Prix / jour : {props.dailyRate}</p>
                        <p className="card-text border-bottom">Créee : {moment(props.createdAt).fromNow()}</p>
                    </ul>
                </div>
                <div className="m-top-1">
                </div>
            </div>
);

Rental.propTypes = {
    id: PropTypes.string,
    user: PropTypes.object,
    title : PropTypes.string,
    city: PropTypes.string,
    street: PropTypes.string,
    category: PropTypes.string,
    bedrooms: PropTypes.number,
    dailyRate: PropTypes.number,
    createdAt: PropTypes.string,

};

export default Rental;