import React from 'react';
import {dateLang} from '../../../../helpers/dateLanguage';

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Center
  } from "@chakra-ui/react"

import ContactBooker from './ContactBooker.modal';
import DeleteBooking from './DeleteBooking.modal';
import bookingService from '../../../../services/booking.service';

const Reservations = ({currentBookings, setCurrentBookings}) => {

    const deleteBooking = (id) => {
        const i = currentBookings.findIndex(c => c._id === id);
        const data = [
            ...currentBookings.slice(0, i),
            ...currentBookings.slice(i + 1),
        ];
        setCurrentBookings(data);
    
        bookingService.deleteBooking(id)
        .then (res => {
           console.log(res.data.message);  
        })
        .catch( (error) => {
            console.log(error)
        })    
    }

    let Reservations = null;

    if (!currentBookings.length) {
        Reservations = (
            <Box><Center>Aucune réversations à venir</Center></Box>
        )
    } else {
        Reservations = (
                <Box overflowX = "auto">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Nom</Th>
                                <Th>Créee le</Th>
                                <Th>Début</Th>
                                <Th>Fin</Th>
                                <Th>Jours</Th>
                                <Th>Personnes</Th>
                                <Th>Prix</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentBookings.map((r) => (
                                <Tr key={r._id}>
                                    <Th>{r.user ? r.user.username : "Supprimé"} ({r.user ? r.user.email : "Supprimé"})</Th>
                                    <Td>{dateLang(r.createDate, 'D MMM YYYY H:m')}</Td> 
                                    <Td>{dateLang(r.startAt, 'D MMM YYYY')}</Td> 
                                    <Td>{dateLang(r.endAt, 'D MMM YYYY')}</Td> 
                                    <Td>{r.days}</Td> 
                                    <Td>{r.guests}</Td> 
                                    <Td>{r.totalPrice}€</Td> 
                                    <Td>
                                        <Box d='flex' alignItems='center' justifyContent='space-around'>
                                            <ContactBooker id={r._id} />
                                            <DeleteBooking 
                                            deleteBooking = {deleteBooking}
                                            id = {r._id}
                                            />
                                        </Box>
                                    </Td>
                                </Tr>
                            ))};
                        </Tbody>
                    </Table>
                </Box>
        )
    }

    return (
        Reservations
    )
}

export default Reservations;