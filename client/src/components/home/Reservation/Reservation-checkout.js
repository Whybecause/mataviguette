import React from "react";
import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import {CardElement} from '@stripe/react-stripe-js';
import dayjs from 'dayjs';

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

const ReservationCheckout = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Valider</Button>
      <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Récapitulatif et paiement</ModalHeader>
                        <ModalBody>
                            <div>
                                <p>Du {dayjs(props.startAt).format('D MMM YYYY')} au {dayjs(props.endAt).format('D MMM YYYY')}</p>
                                <p>{props.guests} voyageurs</p>
                                <p>{props.days} jours</p>
                                <p>{props.finalPrice}€</p>
                            </div>
                            <label>
                                Paiement par carte
                                <CardElement options={CARD_ELEMENT_OPTIONS} />
                            </label>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type='submit'
                                onClick={() => props.confirmBooking()}
                                >
                                    <span>Payer</span>
                            </Button>{' '}
                            <Button onClick={onClose}>Fermer</Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
    </>
  );
};
export default ReservationCheckout;
