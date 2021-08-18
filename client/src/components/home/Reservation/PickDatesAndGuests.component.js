import React from "react";
import {
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";

const PickDateAndGuests = (props) => {
  return (
    <React.Fragment>
      <Box d="flex" justifyContent="center" alignItems="center" p='5'>
        <SimpleGrid columns={[1, 1, 2]} spacing={10}>
            <Box>
                <DatePicker
                  dateFormat="dd / MM / yy"
                  selected={props.startAt}
                  onChange={(date) => {
                    props.setStartAt(date);
                  }}
                  excludeDates={props.unavailableDates}
                  minDate={new Date()}
                  placeholderText="Date de début"
                  className="datepicker-custom-input"
                  />
            </Box>
            <Box>
                <DatePicker
                  dateFormat="dd / MM / yy"
                  selected={props.endAt}
                  onChange={(date) => props.setEndAt(date)}
                  excludeDates={props.unavailableDates}
                  minDate={props.startAt ? addDays(props.startAt, 1) : new Date()}
                  placeholderText="Date de fin"
                  className="datepicker-custom-input"
                  />
            </Box>
          </SimpleGrid>
        </Box>
      <Box d="flex" alignItems="center" justifyContent="center" p='2'>
        <Box as='span' mr='2'>Voyageur(s)</Box>
        <NumberInput
          width='80px'
          min={1}
          defaultValue={1}
          value={props.guests}
          onChange={props.handleChangeGuests}
          maxW={170}
          // place
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    </React.Fragment>

  );
};

export default PickDateAndGuests;
