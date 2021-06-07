import React from "react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Center,
  Divider,
  List,
  ListItem,
  ListIcon,
  Stack,
  Box,
  Icon
} from "@chakra-ui/react";
import { EmailIcon } from '@chakra-ui/icons';
import { CloseButton } from '../styledComponents/Button-Wrapper';

const FooterMentions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <React.Fragment>
      <Button colorScheme="link" onClick={onOpen}>
        Mentions légales
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box d='flex' alignItems='center' justifyContent='space-between'>
              <h2><Center>Mentions légales</Center></h2>
              <CloseButton onClick={onClose} />
            </Box>
            </ModalHeader>
          <ModalBody>
            <Stack>

            <h4>1. Informations légales</h4>

            <p>Le propriétaire et responsable de la publication est : Valérie Traina</p>
            <Stack direction="row" align="center">
            <Icon as={EmailIcon} />
            <p>Contact : valerietraina@orange.fr</p>
            </Stack>
            <Divider />

            <p>Le créateur du site et Webmaster est : Maxence Traina</p>
            <Stack direction="row" align="center">
            <Icon as={EmailIcon} />
            <p>Contact : maxence.traina@gmail.com</p>
            </Stack>
            <Divider />

            <p>L'hébergeur du site est : Amazon Web Services LLC</p>
            <p>Adresse: P.O. Box 81226, Seattle, WA 98108-1226</p>
            <Divider />

            <h4>2. Accessibilité</h4>
            <p>Le site www.lamataviguette.fr est par principe accessible aux utilisateurs 24/24h, 7/7j, sauf interruption, programmée ou non, pour les besoins de sa maintenance ou en cas de force majeure. En cas d’impossibilité d’accès au service, www.lamataviguette.fr s’engage à faire son maximum afin de rétablir l’accès au service et s’efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l’intervention.  N’étant soumis qu’à une obligation de moyen, www.lamataviguette.fr ne saurait être tenu pour responsable de tout dommage, quelle qu’en soit la nature, résultant d’une indisponibilité du service.</p>
            <Divider />

            <h4>3. Gestion des données personnelles</h4>
            <p>En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004, l’article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995.
            Le site www.lamataviguette.fr ne collecte des informations personnelles ( suivant l’article 4 loi n°78-17 du 06 janvier 1978) relatives à l’utilisateur que pour le besoin de certains services proposés par le site site www.lamataviguette.fr. L’utilisateur fournit ces informations en toute connaissance de cause, notamment lorsqu’il procède par lui-même à leur saisie. 
            Conformément aux dispositions des articles 38 et suivants de la loi 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés, tout utilisateur dispose d’un droit d’accès, de rectification, de suppression et d’opposition aux données personnelles le concernant. Pour l’exercer, adressez votre demande à site www.lamataviguette.fr par email à contact@lamataviguette.fr.
            Aucune information personnelle de l’utilisateur du site site www.lamataviguette.fr  n’est publiée à l’insu de l’utilisateur, échangée, transférée, cédée ou vendue sur un support quelconque à des tiers. 
            Les bases de données sont protégées par les dispositions de la loi du 1er juillet 1998 transposant la directive 96/9 du 11 mars 1996 relative à la protection juridique des bases de données.
            </p>
            </Stack>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default FooterMentions;
