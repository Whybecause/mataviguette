import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import pic1 from '../../assets/pic1.jpg';



const Booking = (props) => {
    const {
        className
    } = props;

    const [modal, setModal]= useState(false);
    const toggle=() => setModal(!modal);

    return (
            <Col>
                <div className="card bg-white">
                    <img className="card-img-top"
                        src={pic1} alt="Mataviguette">
                    </img>
                    <div className="card-body m-top-1">
                        {props.showAdminBoard && (
                        <h5 className="card-title">{props.user.username}</h5>
                        )}
                        <p className="card-text font-size-1"><strong>{moment(props.startAt).format('D MMM YYYY')} - {moment(props.endAt).format('D MMM YYYY')} | {" "} 
                            {props.days} {props.days > 1 ? "days" : "day"}</strong>
                        </p>
                        <p className="card-text font-size-2"><strong>Price: {props.totalPrice}€ </strong></p>
                        <p className="card-text">{props.guests} guests</p>
                        <p className="card-text font-size-1">Adresse : {props.rental.street}</p>
                        <p className="card-text p-discret">Created {moment(props.createDate).format("Do MMM YYYY")}</p>
                        {props.showAdminBoard && (
                        <div>
                            <Button color="danger" onClick={() => { props.handleDeleteBooking(props.startAt) }}>delete</Button>
                            <Button color="primary" onClick={toggle}>Contacter {props.user.username}</Button>
                            <Modal isOpen={modal} toggle={toggle} >
                                <ModalHeader toggle={toggle}>Contact Booker</ModalHeader>
                                <form
                                    id="contactBooker-form"
                                    method="POST"
                                >
                                    <ModalBody>
                                        <div className="form-group">
                                            <label htmlFor="message">Message</label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                name="message"
                                                value={props.message}
                                                onChange={props.onChangeMessage}
                                            />
                                        </div>
                                        <div>
                                            {props.alert && (
                                            <div className={className ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                {props.alert}
                                            </div>
                                            )}
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" type="submit" disabled={props.loading} onClick={event => { 
                                            event.preventDefault(); 
                                            props.handleContactBooker(props.id)
                                        }}>
                                            {props.loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                            <span>Send</span>
                                        </Button>
                                        <Button color="danger" onClick={toggle} >Close</Button>
                                    </ModalFooter>
                                </form>
                            </Modal>
                        </div>
                        )}
                    </div>
                </div>
            </Col>
    )
}

Booking.propTypes = {
    id: PropTypes.string,
    days: PropTypes.number,
    startAt : PropTypes.string,
    endAt: PropTypes.string,
    totalPrice: PropTypes.number,
    guests: PropTypes.number,
    user: PropTypes.object,
    showAdminBoard: PropTypes.bool,
    rental: PropTypes.object,
    createDate: PropTypes.string,
    message: PropTypes.string,
    onChangeMessage: PropTypes.func,
    handleContactBooker: PropTypes.func,
    alert: PropTypes.string,
    handleDeleteBooking: PropTypes.func.isRequired
};

export default Booking;