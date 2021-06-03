import React, { useState, useEffect } from "react";
import {
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Stack,
  Text,
  HStack,
  Center,
  Button
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import dayjs from 'dayjs';
import addDays from "date-fns/addDays";
import axios from 'axios';

import ReservationCheckout from './Reservation-checkout';
import { getRangeOfDates } from "../../../helpers/index";
import authService from "../../../services/auth.service";
import rentalCRUDService from "../../../services/rentalCRUD.service";
import { subDays } from "date-fns";

const Reservation = () => {
  const [isValidToken, setIsValidToken] = useState(false);
  let [startAt, setStartAt] = useState(new Date());
  let [endAt, setEndAt] = useState(new Date());
  let [guests, setGuests] = useState(1);
  const [ bookedRangeDays, setBookedRangeDays ] = useState([]);
  const [dailyRate, setDailyRate] = useState("");

  // let minStartDate = addDays(new Date(), 1);
  // let minEndDate = addDays(startAt, 1);

  const days = getRangeOfDates(startAt, endAt).length - 1;
  const finalPrice = dailyRate * days;

  // --------------------------------

  const handleChangeGuests = (guests) => setGuests(guests);

  async function confirmBooking(e) {
      e.preventDefault();

  }

  const getFirstDateAvailable = async () => {
    let today = new Date()
    let testDate = new Date();
    // testDate.setDate(today.getDate() -1);

    testDate = addDays(testDate, 10);
    for (let i=0; i < bookedRangeDays.length; i++) {
      if (dayjs(bookedRangeDays[i]).format('DD/MM/YYYY') < dayjs(testDate).format('DD/MM/YYYY')) {
        console.log('inférieur')
      }
      if (dayjs(bookedRangeDays[i]).format('DD/MM/YYYY') === dayjs(testDate).format('DD/MM/YYYY')) {
        console.log('already booked');
      //   testDate = addDays(testDate, 1);
      }
      // } else { 
      //   console.log(testDate);
      //   return testDate;
      // }
    }
  }
    

  

// ---------------------------------------

  useEffect(() => {
    rentalCRUDService.getMataviguettePrice(setDailyRate)

    authService.isValidToken(setIsValidToken)

    rentalCRUDService.getGoogleCalBookedEvents(setBookedRangeDays);

  }, []);

  let ReservationContent = null;

  if (!isValidToken) {
    ReservationContent = (
      <>
        <a href="/login">Connectez-vous pour réserver</a>
      </>
    );

  } 
  else {
    ReservationContent = (
      <>
        <HStack mt="5">
          <Stack>
            <Text>Début de la location</Text>
            <DatePicker
              dateFormat="dd MMMM yy"
              className="datepickerInput"
              selected={startAt}
              onChange={(date) => {
                setStartAt(date);
                setEndAt(addDays(date, 1));
              }}
              excludeDates = {bookedRangeDays}
            />
          </Stack>

          <Stack>
            <Text>Fin de la location</Text>
            <DatePicker
              className="datepickerInput"
              dateFormat="dd MMMM yy"
              selected={endAt}
              onChange={(date) => setEndAt(date)}
              excludeDates = {bookedRangeDays}
            />
          </Stack>

          <Stack>
            <Text>Combien de personnes?</Text>
            <NumberInput
              min={1}
              defaultValue={1}
              value={guests}
              onChange={handleChangeGuests}
              maxW={170}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
        </HStack>
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
          <Button onClick={getFirstDateAvailable}>clique enfoiré</Button>
        </Center>
        
        {ReservationContent}

      </Box>
    </>
  );
};

export default Reservation;
