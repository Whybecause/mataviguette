import React from "react";
import { HStack, Stack, Avatar } from "@chakra-ui/react";
import profil from "../../assets/profil-valerie.jpg";

const Title = ({ Comments}) => {
  return (
    <>
      <HStack>
        <Stack p="2">
          <h2>Maison entière. Hôte : Valérie</h2>
          <p>8 voyageurs - 3 chambres - 7 lits - 1,5 salle de bain</p>
          {Comments}
        </Stack>
        <Avatar src={profil} alt="Profil Valérie" />
      </HStack>
    </>
  );
};

export default Title;
