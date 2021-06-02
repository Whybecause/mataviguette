import React from "react";
import {
    FormLabel,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Box,
    Center,
  } from "@chakra-ui/react";
  import DatePicker from "react-datepicker";
  import addDays from "date-fns/addDays";

import { getRangeOfDates } from '../../helpers/index';
import authService from "../../services/auth.service";

const Reservation = () => {
    let [startDate, setStartDate] = React.useState(addDays(new Date(), 1));
    let [endDate, setEndDate] = React.useState(addDays(startDate, 1));
    let [guests, setGuests] = React.useState(1);
    const days = getRangeOfDates(startDate, endDate).length -1;
    let minStartDate = addDays(new Date(), 1);
    let minEndDate = addDays(startDate, 1);
    // const finalPrice = price * days;
  
    const handleChangeGuests = (guests) => setGuests(guests);

  return (
    <>
      <Box>
        <FormLabel>
          <Center>Début de la location</Center>
        </FormLabel>
        <Center>
          <DatePicker
            dateFormat="dd MMMM yy"
            className="datepickerInput"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setEndDate(addDays(date, 1));
            }}
            minDate={minStartDate}
          />
        </Center>
        <FormLabel>
          <Center pt="2">Fin de la location</Center>
        </FormLabel>
        <Center>
          <DatePicker
            className="datepickerInput"
            dateFormat="dd MMMM yy"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={minEndDate}
          />
        </Center>
        <FormLabel>
          <Center pt="2">Combien de personnes?</Center>
        </FormLabel>
        <Center>
          <NumberInput
            min={1}
            // max={maxGuests}
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
        </Center>
      </Box>
    </>
  );
};

export default Reservation;
