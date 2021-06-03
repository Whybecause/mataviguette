import React, { useState, useEffect } from "react";
import {
  Icon,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Heading,
  Container
} from "@chakra-ui/react";
import { ChevronDownIcon, SettingsIcon, CalendarIcon } from "@chakra-ui/icons";
import { MdExitToApp, MdBuild} from 'react-icons/md';

import history from '../../helpers/history';
import authService from "../../services/auth.service";

function Header() {
  const [user, setUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    authService.getCurrentUser(setUser, setIsAdmin);
    authService.isValidToken(setIsValidToken)

  }, [isValidToken]);

  async function logOut() {
    authService.logout();
    setUser("");
    setIsAdmin(false);
    setIsValidToken(false);
    history.push('/login')
  }

  let UserContainer = null;

  if (!isValidToken) {
    UserContainer = (
      <>
        <a href="/login">
            <Button>Connexion</Button>
        </a>
      </>
    );
  }

  if (isValidToken && !isAdmin) {
    UserContainer = (
      <>
        <Box>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="sm">
              {user}
            </MenuButton>
            <MenuList>
              <a href="/user">
                <MenuItem><Icon as={CalendarIcon}/> Mes réservations</MenuItem>
              </a>
              <a href="/profile">
                <MenuItem><Icon as={SettingsIcon}/>Profile</MenuItem>
              </a>
              <MenuItem onClick={() => logOut()}><Icon as={MdExitToApp}/>Déconnexion</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </>
    );
  }

  if (isValidToken && isAdmin) {
    UserContainer = (
      <>
        <Box>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="sm">
              {user}
            </MenuButton>
            <MenuList>
              <a href="/admin">
                <MenuItem><Icon as={MdBuild}/>Admin Board</MenuItem>
              </a>

              <a href="/profile">
                <MenuItem><Icon as={SettingsIcon}/>Profile</MenuItem>
              </a>
              <MenuItem onClick={() => logOut()}><Icon as={MdExitToApp}/>Déconnexion</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </>
    );
  }

  return (
    <>
    <Box as='nav' p='2' className="nav-text-color" d='flex' justifyContent='space-between' bgGradient="linear(to-r,gray.300,yellow.400,pink.200)" >
        <Box>
            <a href="/">
          <Heading size="md">Mataviguette</Heading>
            </a>
        </Box>
        {UserContainer}
    </Box>
    </>
  );
}

export default Header;
