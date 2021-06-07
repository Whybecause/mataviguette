import React from "react";
import { Link } from 'react-router-dom';
import { Box, Image, SimpleGrid, Text, Divider, Stack, Icon } from '@chakra-ui/react';

import washingMashine from '../../assets/washing-machine.svg';
import iron from '../../assets/iron.png';
import {FaBed, FaParking, FaSwimmingPool, FaFireExtinguisher, FaThermometerThreeQuarters} from 'react-icons/fa';
import {IoIosBed} from 'react-icons/io';
import { GiHanger, GiTransportationRings} from 'react-icons/gi';
import { WiSmoke } from "react-icons/wi";

const EquipppementsIcons = () => {
  return (
        <Box as='section' p='5'>

            <Divider />

            <Box as='h3' mt='3'>Couchages</Box>
            <Box mt='5' d='flex' justifyContent='space-around' alignItems='center'>

                <Box as='article' borderWidth="1px" borderRadius="xl" w='xs'>
                    <Stack alignItems='center'>
                        <Text fontSize='xl'>Chambre 1</Text>
                        <Icon as={IoIosBed} boxSize='20px'/>
                        <Text fontSize='md'>1 lit double</Text>
                    </Stack>
                </Box>

                <Box as='article' borderWidth="1px" borderRadius="xl" w='xs'>
                    <Stack alignItems='center'>
                        <Text fontSize='xl'>Chambre 2</Text>
                        <Stack direction={'row'}>
                            <Icon as={FaBed} boxSize='20px'/>
                            <Icon as={FaBed} boxSize='20px'/>
                        </Stack>
                        <Text fontSize='md'>2 lits simples</Text>
                    </Stack>
                </Box>

                <Box as='article' borderWidth="1px" borderRadius="xl" w='xs'>
                    <Stack alignItems='center'>
                    <Text fontSize='xl'>Chambre 3</Text>
                        <Stack direction={'row'}>
                            <Icon as={FaBed} boxSize='20px'/>
                            <Icon as={FaBed} boxSize='20px'/>
                            <Icon as={FaBed} boxSize='20px'/>
                            <Icon as={FaBed} boxSize='20px'/>
                        </Stack>
                        <Text fontSize='md'>4 lits simples</Text>
                    </Stack>
                </Box>
            </Box>

            <Box as='article' mt='5'>
                <Divider />
                <Box as='h3' mt='3'>Equippements</Box>

                <SimpleGrid columns={2} mt='5'>

                    <Stack direction={'row'}>
                        <Icon as={FaParking} boxSize='20px' /> 
                        <Text>Parking</Text>
                    </Stack>

                    <Stack direction={'row'}>
                        <Icon as={FaSwimmingPool} boxSize='20px' /> 
                        <Text>Piscine</Text>
                    </Stack>

                    <Stack direction={'row'}>
                        <Icon as={GiHanger} boxSize='20px' /> 
                        <Text>Ceintre</Text>
                    </Stack>

                    <Stack direction={'row'}>
                        <Icon as={WiSmoke} boxSize='20px' /> 
                        <Text>Détecteur de fumée</Text>
                    </Stack>

                    <Stack direction={'row'}>
                        <Icon as={FaThermometerThreeQuarters} boxSize='20px' /> 
                        <Text>Chauffage</Text>
                    </Stack>

                    <Stack direction={'row'}>
                        <Icon as={FaFireExtinguisher} boxSize='20px' /> 
                        <Text>Extincteur</Text>
                    </Stack>
                    <Stack direction={'row'}>
                        <Icon as={GiTransportationRings} boxSize='20px' /> 
                        <Text>Sport</Text>
                    </Stack>
                    
                    <Stack direction={'row'}>
                    <Image boxSize='20px' src={iron}/>
                        <Text>Fer à repasser</Text>
                    </Stack>

                    <Stack direction={'row'}>
                        <Image boxSize='20px' src={washingMashine}/>
                        <Text>Lave-linge</Text>
                    </Stack>

                    <Stack direction={'row'}>
                        <Link to="/equippements">
                            <p className="a-color1">Afficher les 23 équippements
                            </p>
                            </Link>
                    </Stack>

                </SimpleGrid>
                <Divider mt='3'/>
            </Box>


        </Box>
   
  );
};

export default EquipppementsIcons;