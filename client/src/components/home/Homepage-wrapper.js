import React from "react";
import { Box, Center, Stack, AspectRatio, SimpleGrid } from "@chakra-ui/react";

import Gallery from './Gallery.component';
import Description from './Description.component';
import Title from './Title.component';
import Reservation from './Reservation/Reservation.component';
import EquipppementsIcons from './Equippements-icons.component';
import ContactModal from './Contact-Modal.component';
import GoogleApiWrapper from './googleMap';
import Presentation from './Presentation.component';
import Reglement from './Reglement.component';
import Comments from './Comments.component';

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

      <SimpleGrid columns={[1, 1, 2, 2]} mt='5' p='2' >
        <Title Comments = {<Comments/>}/>
        <Reservation />
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 2, 2]}>
        <Description ContactModal={<ContactModal/>}/>
        <EquipppementsIcons />
      </SimpleGrid>

      
      <Box p='5'>
        <AspectRatio ratio={16 / 9}>
          <GoogleApiWrapper />
        </AspectRatio>
      </Box>

      <SimpleGrid columns={[1, 1, 2, 2]}>
        <Presentation />
        <Reglement />
      </SimpleGrid>
      
    </Box>
    </>
  );
};

export default Homepage;
