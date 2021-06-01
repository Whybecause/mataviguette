import React from 'react';
import {
    Box,
    Button,
    Divider
  } from "@chakra-ui/react";

const UserDashboardNav = (props) => {
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
                        props.setShowCurrentBookings(true);
                        props.setShowAllBookings(false);
                    }}
                    >Réservations ({props.numberOfCurrentBookings})</Button>
                </Box>
                <Divider orientation="vertical" mr="5" ml="5" />
                <Box>
                    <Button
                        colorScheme="teal"
                        variant="link"
                        onClick={() => {
                            props.setShowCurrentBookings(false);
                            props.setShowAllBookings(true);
                        }}
                    >
                        Historique ({props.numberOfAllBookings})
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default UserDashboardNav;