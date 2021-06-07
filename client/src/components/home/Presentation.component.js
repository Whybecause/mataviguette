import React, { useState } from 'react';
import { Box, Avatar, Stack, Divider, Button } from "@chakra-ui/react";
import profil from "../../assets/profil-valerie.jpg";


const Presentation = () => {
    const [ isOpened, setIsOpened ] = useState(false);
    const handleToggle = () => setIsOpened(!isOpened)

    return (
        <>
        <Box as="section" p='5'>
            <Stack direction={'row'} alignItems="center">
                <Avatar src={profil} alt="Photo de profil" />
                <h3>Proposé par Valérie</h3>
            </Stack>
            
            <Stack mt='5'>

            <p>Nous sommes une famille avec trois grands garçons et cette maison est le lieu idéal pour tous nous retrouver lors des belles journées d'été ou l'hiver devant un bon feu de cheminée…</p>
            <Button colorScheme="orange" variant="outline" onClick={handleToggle}>{isOpened ? 'Fermer' : 'Lire la suite...'}</Button>
            {isOpened && (
                <>
                <p>J'adore chiner des vieux trucs et leur redonner une nouvelle vie grâce à un coup de peinture par exemple. Plus c'est moche et poussiéreux, plus j'aime :) J'aime aussi beaucoup les échanges avec mes voyageurs et partager avec eux l'amour de la nature et d'un endroit plein de charme. J'ai beaucoup de plaisir à vous répondre et malheureusement, je ne verrai pas beaucoup d'entre vous car je n'habite pas sur place (pour l'instant ! Nous l'avons appelée La Mataviguette en rassemblant les deux premières lettres des prénoms de nos fils et le ''guette'' d'Huguette, ma mère, qui nous l' a transmise. Louer notre maison nous permet de continuer à l'embellir et à la faire vivre.</p>
                </>
            )}
            <Divider />
            </Stack>

            <Stack mt='3'>
                <h3>Pendant votre séjour</h3>
                <p>J'échangerai avec vous par mail ou téléphone mais c'est Séverine qui vous accueillera. Je reste disponible cependant avant et tout au long de votre séjour pour répondre à vos interrogations.</p>
            </Stack>
        </Box>
        </>
    )
}

export default Presentation;