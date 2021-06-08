import React from "react";
import { Image, Box, Stack} from "@chakra-ui/react";

import history from '../../helpers/history'

import pic1 from "../../assets/pic1.jpg";
import piscine from "../../assets/piscine.jpg";
import repas from "../../assets/repas.jpg";
import sport from "../../assets/sport.jpg";
import salonext from "../../assets/salon-terrasse.jpg";

const Gallery = () => {
  return (
    <section onClick={() => history.push('/photos')} className="pointer">
      {/* <SimpleGrid columns={[2, 2, 2]} p="5">
        <Box d="flex" mr="5px">
          <Image
            src={pic1}
            className="img"
            borderTopLeftRadius='xl'
            borderBottomLeftRadius='xl'
            alt="Accueil de la maison"
            />
        </Box>
        <Box>
          <SimpleGrid columns={2}>
            <Stack direction="row" pb="5px">
              <Image className="img" src={piscine} alt="La piscine" />
              <Image
                className="img"
                src={repas}
                alt="Coin repas"
                borderTopRightRadius="xl"
                />
            </Stack>
          </SimpleGrid>
          <SimpleGrid columns={2}>
            <Stack direction="row">
              <Image className="img" src={sport} alt="Salle de sport" />
              <Image className="img"
                src={salonext}
                alt="Salon de jardin"
                borderBottomRightRadius="xl"
                />
            </Stack>
          </SimpleGrid>
        </Box>
      </SimpleGrid> */}
      <Box d='flex' alignItems="center" justifyContent="center" p={[1, 2, 3, 4]}>
          <Image boxSize={['146px', '206px', '366px', '506px']} mr='2' src={pic1} alt="La maison" className="img"  borderTopLeftRadius='xl' borderBottomLeftRadius='xl'/>
          <Box>
              <Stack direction="row">
                  <Image 
                    boxSize={['70px', '100px', '180px', '250px']}
                    className="img" 
                    src={piscine} 
                    alt="La piscine" />
                  <Image
                    boxSize={['70px', '100px', '180px', '250px']}
                    className="img"
                    src={repas}
                    alt="Coin repas"
                    borderTopRightRadius="xl"
                    />
                </Stack>
                <Stack direction="row" mt='2'>
                    <Image 
                      boxSize={['70px', '100px', '180px', '250px']}
                      className="img" 
                      src={sport} 
                      alt="Salle de sport" />
                    <Image 
                      boxSize={['70px', '100px', '180px', '250px']}
                      className="img"
                      src={salonext}
                      alt="Salon de jardin"
                      borderBottomRightRadius="xl"
                      />
                </Stack>

            </Box>
        </Box>
       </section>
  );
};

export default Gallery;
