import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Stack, Divider, Text } from '@chakra-ui/react';
import { CloseButton } from './styledComponents/Button-Wrapper';

const Equippements = () => {    
    return (
            <Box p='10' mt='5' className="page-container">
                <Box d='flex' alignItems='center' justifyContent='space-between'>
                    <h1>Équipements</h1>
                    <Link to="/">
                            <CloseButton />
                    </Link>
                </Box>

                <Box mt='5' p='2'>
                    <h3>Standard</h3>
                    <Box p='3'>
                        <Stack mt='3'>
                            <p>Lave-linge</p>
                            <Divider />
                            <p>Eau chaude</p>
                            <Divider />
                            <p>Fer à repasser</p>
                            <Divider />
                            <p>Chauffage</p>
                            <Divider />
                            <p>Cheminée</p>
                            <Divider />
                        </Stack>
                    </Box>

                    <h3>Installation</h3>
                    <Box p='3'>
                        <Stack mt='3'>
                            <p>Parking gratuit sur place</p>
                            <Divider />
                            <p>Salle de sport
                                <span className="p-discret"> - Dans le châlet du jardin</span>
                            </p>
                            <Divider />
                            <p>Piscine
                                <span className="p-discret"> -Privée</span>
                            </p>
                            <Divider />
                        </Stack>
                    </Box>

                    <h3>Restauration</h3>
                    <Box p='3'>
                        <Stack mt='3'>
                            <p>Four à micro-onde</p>
                            <Divider />
                            <p>Four</p>
                            <Divider />
                            <p>Vaisselle et couverts</p>
                            <Divider />
                            <p>Lave-vaisselle</p>
                            <Divider />
                            <p>Cuisinière</p>
                            <Divider />
                            <p>Cuisine</p>
                            <Divider />
                            <p>Cafetière</p>
                            <Divider />
                            <p>Ustensiles de cuisine de base</p>
                            <p className="p-discret">Casseroles et poêles, huile sel et poivre</p>
                            <Divider />
                            <p>Réfrigérateur</p>
                            <Divider />
                        </Stack>
                    </Box>

                    <h3>Accès des voyageurs</h3>
                    <Box p='3'>
                        <Stack mt='3'>
                            <p>Arrivée autonome possible ou sur rdv.</p>
                            <Divider />
                        </Stack>
                    </Box>

                    <h3>Logistique</h3>
                    <Box p='3'>
                        <Stack mt='3'>
                            <p>Séjours longue durée autorisés</p>
                            <p className="p-discret">Séjours de 28 jours ou plus autorisés</p>
                            <Divider />
                        </Stack>
                    </Box>

                    <h3>Dispositif de sécurité</h3>
                    <Box p='3'>
                        <Stack mt='3'>
                            <p>Extincteur</p>
                            <Divider />
                            <p>Détecteur de fumée</p>
                            <Divider />
                        </Stack>
                    </Box>   

                    <h3>Non inclus</h3>
                    <Box p='3'>
                        <Stack mt='3'>
                            <Text as='s'>Télévision</Text>
                            <Divider />
                            <Text as='s'>Climatisation</Text>
                            <Divider />
                        </Stack>
                    </Box>   

                </Box>




            </Box>
    );
};

export default Equippements;