import React from 'react';
import {dateLang} from '../../../helpers/dateLanguage';

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

const Historique = ({allBookings}) => {
    let Historique = null;

    if (!allBookings.length) {
        Historique = (
            <Box><Center>Aucune réversations à venir</Center></Box>
        )
    }

    if (allBookings.length) {
        Historique = (
                <Box overflowX = "auto">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Nom</Th>
                                <Th>Créee le</Th>
                                <Th>Début</Th>
                                <Th>Fin</Th>
                                <Th>Jours</Th>
                                <Th>Personnes</Th>
                                <Th>Prix</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {allBookings.map((r) => (
                                <Tr key={r._id}>
                                    <Th scope='row'>{r.user ? r.user.username : "Supprimé"} ({r.user ? r.user.email : "Supprimé"})</Th>
                                    <Td>{dateLang(r.createDate,'D MMM YYYY H:m')}</Td> 
                                    <Td>{dateLang(r.startAt,'D MMM YYYY')}</Td> 
                                    <Td>{dateLang(r.endAt,'D MMM YYYY')}</Td> 
                                    <Td>{r.days}</Td> 
                                    <Td>{r.guests}</Td> 
                                    <Td>{r.totalPrice}€</Td> 
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
        )
    }

    return ( Historique )
}

export default Historique;