import React from 'react';
import dayjs from 'dayjs';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from "@chakra-ui/react"

const Historique = ({allBookings}) => {
    let Historique = null;

    if (!allBookings.length) {
        Historique = (
            <>
            <div><p>Aucune réversation n'a encore été effectuée</p></div>
            </>
        )
    }

    if (allBookings.length) {
        Historique = (
            <>
                <div>
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
                                    <Th scope='row'>{r.user.username} ({r.user.email})</Th>
                                    <Td>{dayjs(r.createDate).format('D MMM YYYY H:m')}</Td> 
                                    <Td>{dayjs(r.startAt).format('D MMM YYYY')}</Td> 
                                    <Td>{dayjs(r.endAt).format('D MMM YYYY')}</Td> 
                                    <Td>{r.days}</Td> 
                                    <Td>{r.guests}</Td> 
                                    <Td>{r.totalPrice}€</Td> 
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>
            </>
        )
    }

    return (
        <>
        {Historique}
        </>
    )
}

export default Historique;