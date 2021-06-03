import React from "react";
import { Box, Center, Stack } from "@chakra-ui/react";

import Gallery from './Gallery.component';
import Description from './Description.component';
import Reservation from './Reservation/Reservation.component';
import EquipppementsIcons from './Equippements-icons.component';
import GoogleMap from './GoogleMap.component';
import Presentation from './Presentation.component';
import Commentaires from './Commentaires.component';

const Homepage = () => {
  return (
    <>      
    <Box bgGradient="linear(to-r,gray.300,yellow.400,pink.200)">

      <Box className="page-container">

        <Center>
          <Stack p='2'>
          <h1>Maison - Charme et Campagne - Piscine- S.de sport</h1>
          <p>Bajamont, Nouvelle-Acquitaine, France</p>
          </Stack>
        </Center>

        <Gallery/>

      </Box>

    </Box>
    
    <Box className="page-container">

      <Description Reservation={<Reservation/>} EquipppementsIcons={<EquipppementsIcons/>}/>
      <GoogleMap />
      <Presentation />
      <Commentaires />

    </Box>
    </>
  );
};

export default Homepage;
