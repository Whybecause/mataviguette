import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {CardElement} from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
    const BookingModal = (props) => {
      const {
          buttonLabel,
          className,
          confirmBooking
      } = props;

      const [modal, setModal]= useState(false);
      const toggle=() => setModal(!modal);

      return(
        <div>
          <Button color="btn btn-primary btn-block" onClick={toggle}>{buttonLabel}</Button>
          <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>Do you confirm?<span> You wil receive an email</span></ModalHeader>
            <ModalBody>
              <div>
                <p>From {props.startAt} to {props.endAt}</p>
                <p>{props.guests} guests</p>
                <p>{props.days} days</p>
                <p>{props.totalPrice} € </p>

                    {/* Affichage du message d'erreur dans la fenêtre de confirmation*/}
                {props.message && (
                <div className={className ? "alert alert-success" : "alert alert-danger"} role="alert">
                  {props.message}
                </div>
                   )}
              </div>
              <label>
                Card Details
                <CardElement options={CARD_ELEMENT_OPTIONS} />
                
              </label>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={confirmBooking} disabled={props.loading}>
                {props.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Confirm</span>
                </Button>{' '}

              <Button color="danger" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
  }

  export default BookingModal;