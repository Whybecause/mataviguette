import React from "react";

import { Box, Avatar, Stack, HStack, SimpleGrid, Divider } from "@chakra-ui/react";
import profil from "../../assets/profil-valerie.jpg";


const Description = ({Reservation, EquipppementsIcons}) => {
  return (
    <>
    <SimpleGrid columns={[1, 2, 2]} mt='5' p='2' >

        <HStack >
            <Stack p='2'>
                <h2>Maison entière. Hôte : Valérie</h2>
                <p>8 voyageurs - 3 chambres - 7 lits - 1,5 salle de bain</p>
            </Stack>
            <Avatar src={profil} alt="Profil Valérie" />
        </HStack>

        {Reservation}

    </SimpleGrid>
    
    <SimpleGrid columns={[1, 2, 2]}>

        <Box as='section' p='5'>
            <Divider/>
            <Stack mt='3'>
                <h3>ENTIÈRE DÉCONNEXION</h3>
                <p>
                    Situé idéalement entre Agen (15 min) et Villeneuve-sur-Lot, cet ancien
                    relais de poste du 18è siècle SANS TV, SANS Wifi (Si! Si ! C'est
                    possible !) vous attend, niché dans les bois. La verdure et le calme
                    environnants, le charme de ses murs en pierre et de ses poutres, les
                    objets et meubles chinés en brocante vous donneront la sensation que le
                    temps s'y est arrêté. Bienvenue à La Mataviguette !
                </p>
                <Divider/>
                <h4>Le logement</h4>
                <p>
                    Maison de caractère-Beau séjour lumineux et confortable avec une
                    grande cheminée - Terrasse de 80 m² divisée en plusieurs coins
                    aménagés - Terrasse couverte pour les jours de pluie - Terrasse sous
                    les arbres pour les jours de canicule - Piscine privée au sel (3 x 10
                    m ) avec alarme, transats, parasols - Chalet ''salle de muscu''- Parc
                    arboré et clos de 4000 m²- Terrain de pétanque - Table de ping-pong -
                    11 hectares de bois privé autour - Et le calme.....pas loin de la
                    ville !
                </p>
                <Divider/>
                <h4>Accès des voyageurs</h4>
                <p>
                    Vous aurez accès à toute la maison excepté le garage et le 2ème étage
                    de la maison réservés à nos effets personnels ( il s'agit de notre
                    maison de famille et de vacances).
                </p>
                <Divider/>
                <h4>Autres remarques</h4>
                <p>IMPORTANT La maison dispose d'une Box 4G. Il n'y a pas de télé.</p>
            </Stack>
        </Box>

        {EquipppementsIcons}

    </SimpleGrid>
    </>
  );
};

export default Description;
