import React from "react";
import { Box, Button, SimpleGrid, Icon, Stack } from "@chakra-ui/react";
import { EditIcon, CalendarIcon, CheckIcon, TimeIcon } from "@chakra-ui/icons";

const DashboardNav = (props) => {
  return (
    <SimpleGrid columns={[1, 2, 4]} height="50px" mt="5" p="5">
      <Box mt="2">
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => {
            props.setShowReservations(true);
            props.setShowCalendar(false);
            props.setShowHistorique(false);
            props.setShowUpdateRental(false);
          }}
        >
          <Stack direction={"row"}>
            <Icon as={CheckIcon} />
            <p>Réservations ({props.numberOfCurrentBookings})</p>
          </Stack>
        </Button>
      </Box>
      <Box mt="2">
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => {
            props.setShowReservations(false);
            props.setShowCalendar(true);
            props.setShowHistorique(false);
            props.setShowUpdateRental(false);
          }}
        >
          <Stack direction={"row"}>
            <Icon as={CalendarIcon} />
            <p>Calendrier</p>
          </Stack>
        </Button>
      </Box>
      <Box mt="2">
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => {
            props.setShowReservations(false);
            props.setShowCalendar(false);
            props.setShowHistorique(true);
            props.setShowUpdateRental(false);
          }}
        >
          <Stack direction={"row"}>
            <Icon as={TimeIcon} />
            <p>Historique ({props.numberOfAllBookings})</p>
          </Stack>
        </Button>
      </Box>
      <Box mt="2">
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => {
            props.setShowReservations(false);
            props.setShowCalendar(false);
            props.setShowHistorique(false);
            props.setShowUpdateRental(true);
          }}
        >
          <Stack direction={"row"}>
            <Icon as={EditIcon} />
            <p>Modifier prix</p>
          </Stack>
        </Button>
      </Box>
    </SimpleGrid>
  );
};

export default DashboardNav;
