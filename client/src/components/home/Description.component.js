import React, { useState } from "react";

import { Box, Avatar, Stack, HStack, SimpleGrid, Divider, Button } from "@chakra-ui/react";


const Description = ({ ContactModal }) => {
const [ isOpened, setIsOpened ] = useState(false);
const handleToggle = () => setIsOpened(!isOpened)
  return (
    <>
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
                <Button variant="outline" w={'30%'} onClick={handleToggle}>{isOpened ? 'Fermer' : 'Lire la suite...'}</Button>
                <Divider/>
                {isOpened && (
                    <>
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
                <Divider />
                <h4>Le quartier</h4>
                <p>La maison est située au bord d'une petite route de campagne très peu fréquentée. Elle est entourée de bois et excentrée du village de Bajamont. Un véhicule est nécessaire pour les courses (Intermarché- boulangerie- pharmacie .... à 10 minutes en voiture)</p>
                <Divider />
                <h4>Transports</h4>
                <p>La gare d'Agen est à 15 minutes</p>
                <p> Les commerces à 10 min en voiture</p>
                <p className="p-discret">L'adresse exacte est communiquée lorsque la réservation est confirmée</p>
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
                <Divider />
                </>
                    )}
            </Stack>

            <Box p='5'>{ContactModal}</Box>
            
        </Box>


     </>
  );
};

export default Description;
