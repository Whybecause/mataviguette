import React from "react";
import {
    SimpleGrid,
    Image,
    Box,
    Stack,
  } from "@chakra-ui/react";

import history from '../../helpers/history'

import pic1 from "../../assets/pic1.jpg";
import piscine from "../../assets/piscine.jpg";
import repas from "../../assets/repas.jpg";
import sport from "../../assets/sport.jpg";
import salonext from "../../assets/salon-terrasse.jpg";

const Gallery = () => {
  return (
    <section onClick={() => history.push('/photos')} className="pointer">
      <SimpleGrid columns={[2, 2, 2]} p="5">
        <Box d="flex" mr="5px">
          <Image
            src={pic1}
            borderTopLeftRadius='xl'
            borderBottomLeftRadius='xl'
            alt="Accueil de la maison"
            />
        </Box>
        <Box>
          <SimpleGrid columns={2}>
            <Stack direction={"row"} pb="5px">
              <Image src={piscine} alt="La piscine" />
              <Image
                src={repas}
                alt="Coin repas"
                borderTopRightRadius="xl"
                />
            </Stack>
          </SimpleGrid>
          <SimpleGrid columns={2}>
            <Stack direction={"row"}>
              <Image src={sport} alt="Salle de sport" />
              <Image
                src={salonext}
                alt="Salon de jardin"
                borderBottomRightRadius="xl"
                />
            </Stack>
          </SimpleGrid>
        </Box>
      </SimpleGrid>
       </section>
  );
};

export default Gallery;
