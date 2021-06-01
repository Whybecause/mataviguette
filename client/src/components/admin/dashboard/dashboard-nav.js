import React from 'react';
import {
    Box,
    Button,
    Divider
  } from "@chakra-ui/react";

const DashboardNav = (props) => {
    return (
        <>
            <Box
                height='50px'
                d="flex"
                alignItems="center"
                justifyContent="space-around"
                mt='5'
            >
                <Box>
                    <Button
                    colorScheme="teal"
                    variant="link"
                    onClick={() => {
                        props.setShowReservations(true);
                        props.setShowCalendar(false);
                        props.setShowHistorique(false);
                        props.setShowUpdateRental(false);
                    }}
                    >Réservations ({props.numberOfCurrentBookings})</Button>
                </Box>
                <Divider orientation="vertical" mr="5" ml="5" />
                <Box>
                    <Button
                        colorScheme="teal"
                        variant="link"
                        onClick={() => {
                            props.setShowReservations(false);
                            props.setShowCalendar(true);
                            props.setShowHistorique(false);
                            props.setShowUpdateRental(false);
                        }}
                        >Calendrier
                    </Button>
                </Box>
                <Divider orientation="vertical" mr="5" ml="5" />
                <Box>
                    <Button
                        colorScheme="teal"
                        variant="link"
                        onClick={() => {
                            props.setShowReservations(false);
                            props.setShowCalendar(false);
                            props.setShowHistorique(true);
                            props.setShowUpdateRental(false);
                        }}
                    >
                        Historique ({props.numberOfAllBookings})
                    </Button>
                   <Divider orientation="vertical" mr="5" ml="5" />
                </Box>
                <Box>           
                    <Button
                        colorScheme="teal"
                        variant="link"
                        onClick={() => {
                            props.setShowReservations(false);
                            props.setShowCalendar(false);
                            props.setShowHistorique(false);
                            props.setShowUpdateRental(true);
                        }}
                        >
                        Modifier prix
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default DashboardNav;