import React, { useState } from 'react';
import { Box, Divider, Icon, Stack, Button } from '@chakra-ui/react';
import { FaSmokingBan, FaPaw } from 'react-icons/fa';
import { GiStairs} from 'react-icons/gi';
import { BsCreditCard } from 'react-icons/bs';

const Reglement = () => {
    const [ isOpened, setIsOpened ] = useState(false);
    const handleToggle = () => setIsOpened(!isOpened)

    return (
        <Box as='article' p='5'>
            <Stack>
                <h3>Points à retenir</h3>
                <p>Arrivée : 15:00 - 18:00</p>
                <p>Départ : 10:00</p>
                <Divider />
            </Stack>

            <Stack mt='5'>
                <h3>Règlement intérieur</h3>

                <Stack direction={'row'}>
                    <Icon as={FaSmokingBan} />
                    <p>Non fumeur</p>
                </Stack>

                <Stack direction={'row'}>
                    <Icon as={FaPaw}/>
                    <p>Animaux de compagnie acceptés</p>
                </Stack>

                <Button variant="outline" colorScheme="orange" onClick={handleToggle}>{isOpened ? 'Fermer' : 'Lire la totalité du règlement...'}</Button>
                {isOpened && (
                    <React.Fragment>
                        <h4>A savoir</h4>
                        <Stack  direction={'row'}>
                            <Icon as={GiStairs} />
                            <p>Le logement comprend des marches ou escaliers - Pour atteindre le séjour</p>
                        </Stack>

                        <Stack direction={'row'}>
                            <Icon as={BsCreditCard} />
                            <p>Caution: en cas de dommages matériels dans le logement, vous pouvez avoir à payer jusqu'à 1000€</p>
                        </Stack>
                        <Stack>
                            <Divider />
                            <h4>Règles supplémentaires</h4>
                            <p>Il s'agit de notre maison de vacances. Le respect des lieux est notre seule règle.</p>
                            <Divider />
                        </Stack>
                        <Stack>
                            <h4>Annulations</h4>
                            <p>Annulation gratuite jusqu'à <strong>48 heures</strong>.</p>
                            <p>Au-delà, annulez jusqu'à 24h avant l'arrivée prévue pour obtenir un remboursement intégral.</p>
                        </Stack>
                    </React.Fragment>
                )}
            </Stack>
        </Box>
    )
}

export default Reglement;