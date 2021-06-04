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
  Stack
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
  const toast = useToast()

  const validateFormFields = () => {
    if (props.startAt === null || props.endAt === null) {
      return toast({
        position: 'top-right',
        title: 'Choisissez une date',
        status: "warning",
        duration: 2000,
        isClosable: true,
      })
    }

    if (props.startAt > props.endAt) {
      return toast({
        position: 'top-right',
        title: 'Ces dates ne sont pas valides',
        status: "warning",
        duration: 2000,
        isClosable: true,
      }) 
    }
    else {
      onOpen();
    }
  }
  
  return (
    <>
      <Button onClick={() => validateFormFields()}
      >Valider</Button>
      <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Récapitulatif et paiement</ModalHeader>
                        <ModalBody>
                            <Stack>
                                <p>Du {dayjs(props.startAt).format('D MMM YYYY')} au {dayjs(props.endAt).format('D MMM YYYY')}</p>
                                <p>{props.guests} {props.guests > 1 ? " voyageurs" : "voyageur"}</p>
                                <p>{props.days} jours</p>
                                <p>{props.finalPrice}€</p>
                            </Stack>
                            <Stack mt='3'>
                            <label>
                                Paiement par carte
                                <CardElement options={CARD_ELEMENT_OPTIONS} />
                            </label>
                            </Stack>
                              
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type='submit'
                                onClick={() => props.confirmBooking()}
                                mr='2'
                                >
                                    <span>Payer {props.finalPrice}€</span>
                            </Button>{' '}
                            <Button onClick={onClose}>Fermer</Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
    </>
  );
};
export default ReservationCheckout;