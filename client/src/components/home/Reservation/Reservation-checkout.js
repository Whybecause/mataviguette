import React from "react";
import {
  Icon,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  Spinner,
  Flex,
  Spacer,
  Divider,
  Box
} from "@chakra-ui/react";
import { UnlockIcon } from '@chakra-ui/icons';
import {CardElement} from '@stripe/react-stripe-js';

import {dateLang} from '../../../helpers/dateLanguage'
import { CloseButton } from '../../styledComponents/Button-Wrapper';

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#E6885C",
      color: "black",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883"
      },
      "::placeholder": {
        color: "#7D7163"
      }
    },
    invalid: {
      iconColor: "#fa755a",
      color: "#fa755a"
    }
  }
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
    <React.Fragment>
      <Button variant="solid" colorScheme="blackAlpha" onClick={validateFormFields}>Valider</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" >
                <ModalOverlay/>
                    <ModalContent>
                        <Box as='h2' mb='2' mt='2' align="center">Récapitulatif et paiement</Box>
                        <ModalBody>
                          <Flex>
                            <p>Dates</p>
                            <Spacer />
                            <p><strong>Du {dateLang(props.startAt, 'D MMM YYYY')} au {dateLang(props.endAt, 'D MMM YYYY')}</strong></p>
                          </Flex>
                          <Divider mt='2' mb='2' />
                          <Flex>
                            <p>Durée</p>
                            <Spacer />
                            <p><strong>{props.days} jours</strong></p>
                          </Flex>
                          <Divider mt='2' mb='2' />
                          <Flex>
                            <p>Voyageur(s)</p>
                            <Spacer />
                            <p><strong>{props.guests} {props.guests > 1 ? " voyageurs" : "voyageur"}</strong></p>
                          </Flex>
                          <Divider mt='2' mb='2' />
                          <Flex>
                            <p>Prix TTC</p>
                            <Spacer />
                            <p><strong>{props.finalPrice}€</strong></p>
                          </Flex>
                          <Divider mt='2' mb='5' />
                          <Box mt='2' borderWidth='1px' borderColor="teal" borderRadius="lg" p='2'>
                            <CardElement options={CARD_ELEMENT_OPTIONS} onChange={(e) => {props.setError(e.error); props.setCardComplete(e.complete)}} />
                          </Box>
                          <Box as='p' p='2' className="p-discret">
                            <Icon as={UnlockIcon}/>
                            Paiement sécurisé - 
                            Nous ne conservons pas vos informations bancaires
                          </Box>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                disabled={props.disabled}
                                colorScheme="teal"
                                variant="outline"
                                onClick={() => props.confirmBooking()}
                                mr='2'
                                >
                                    <span>
                                      {props.loading && (
                                        <Spinner size='xs'/>
                                      )}
                                      Payer {props.finalPrice}€</span>
                            </Button>
                            <CloseButton onClick={onClose} />
                        </ModalFooter>
                    </ModalContent>
            </Modal>
        </React.Fragment>

  );
};
export default ReservationCheckout;
