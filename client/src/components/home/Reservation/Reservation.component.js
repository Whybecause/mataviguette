import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Center,
  Input
} from "@chakra-ui/react";

import { useUnavailableDates } from '../../../hooks/useUnavailableDates';
import { getRangeOfDates } from "../../../helpers/index";
import PickDateAndGuests from './PickDatesAndGuests.component';
import ReservationCheckout from './Reservation-checkout';
import authService from "../../../services/auth.service";
import rentalCRUDService from "../../../services/rentalCRUD.service";

const Reservation = () => {
  const { loading, unavailableDates } = useUnavailableDates("/api/test/rentals/booked");
  const [isValidToken, setIsValidToken] = useState(false);
  const [ startAt, setStartAt ] = useState(null);
  let [endAt, setEndAt] = useState(null);
  let [guests, setGuests] = useState(1);
  
  const [dailyRate, setDailyRate] = useState("");
  const days = getRangeOfDates(startAt, endAt).length - 1;
  const finalPrice = dailyRate * days;

  // --------------------------------

  const handleChangeGuests = (guests) => setGuests(guests);

  async function confirmBooking(e) {
      e.preventDefault();

  }
// ---------------------------------------

useEffect(() => {
    rentalCRUDService.getMataviguettePrice(setDailyRate)

    authService.isValidToken(setIsValidToken)
}, []);


// ------------------------------------------

  let ReservationContent = null;

  if (!isValidToken) {
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
