import React, { useContext, useState, useEffect } from "react";
import { Box, Center, useToast } from "@chakra-ui/react";
import {ElementsConsumer, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

import { UserContext } from '../../../UserContext';
import { useUnavailableDates } from '../../../hooks/useUnavailableDates';
import { getRangeOfDates } from "../../../helpers/index";
import PickDateAndGuests from './PickDatesAndGuests.component';
import ReservationCheckout from './Reservation-checkout';
import rentalCRUDService from "../../../services/rentalCRUD.service";
import bookingService from "../../../services/booking.service";
import paymentService from "../../../services/payment.service";

const Reservation = () => {
  const user = useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast()
  const { loading, unavailableDates } = useUnavailableDates("/api/test/rentals/booked");
  const [ fetching, setFetching ] = useState(false);
  const [ startAt, setStartAt ] = useState(null);
  let [endAt, setEndAt] = useState(null);
  let [guests, setGuests] = useState('1');
  
  const [dailyRate, setDailyRate] = useState("");
  const days = getRangeOfDates(startAt, endAt).length - 1;
  const finalPrice = dailyRate * days;

  // --------------------------------

  const handleChangeGuests = (guests) => setGuests(guests);

  async function confirmBooking() {
    if (!stripe || !elements) {
      return;
    }
    setFetching(true);
    try {
      const response = await paymentService.getSecret(startAt, endAt, user.email, guests);
      const {client_secret: clientSecret} = await response.data;
      
      const booking = await bookingService.createBooking(startAt, endAt, guests, user.user)
      const bookingStart = await booking.data.startAt;

      const paiement = await stripe.confirmCardPayment((clientSecret),
        { payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user.user,
              email: user.email
            }}
        })

        if (paiement.error) {
          setFetching(false);
          toast({
            position: 'top-right',
            title: paiement.error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          }) 
          const del = await bookingService.deleteBooking(bookingStart);
          console.log(del.data.message);
          return; 
        }
        
        if (paiement.paymentIntent.status === 'succeeded') {
          setFetching(false);
          toast({
            position: 'top-right',
            title: 'Votre réservation est validée ! Vous allez recevoir un email',
            status: "success",
            duration: 3000,
            isClosable: true,
          }) 
        }

      } catch(error) {
        setFetching(false);
        console.log(error);
        toast({
          position: 'top-right',
          title: error.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        }) 
      }
  }
// ---------------------------------------

useEffect(() => {
    rentalCRUDService.getMataviguettePrice(setDailyRate)
}, []);


// ------------------------------------------

  let ReservationContent = null;

  if (!user.user) {
    ReservationContent = (
      <>
        <a href="/login"><Center>Connectez-vous pour réserver</Center></a>
      </>
    );

  } 
  else {
    ReservationContent = (
      <>
        <PickDateAndGuests 
            startAt={startAt}
            setStartAt={setStartAt}
            endAt={endAt}
            setEndAt={setEndAt}
            unavailableDates={unavailableDates}
            guests={guests}
            handleChangeGuests={handleChangeGuests}

        />
        <Center mt="3">
          <ReservationCheckout
            startAt={startAt}
            endAt={endAt}
            days={days}
            guests={guests}
            finalPrice={finalPrice}
            disabled={!stripe}
            loading={fetching}
            confirmBooking={confirmBooking}
          />
        </Center>
      </>
    );
  }

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="xl"
        p="2"
        bgGradient="linear(to-r,yellow.400,pink.200)"
      >
        <Center>
          <h3>Choisissez vos dates : {dailyRate}€/nuit</h3>
        </Center>
        
        {ReservationContent}

      </Box>
    </>
  );
};

export default Reservation;