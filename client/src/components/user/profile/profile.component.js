import React, { useContext } from "react";
import { Box, Center, Icon, Stack, Divider} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';

import history from "../../../helpers/history";
import { UserContext } from '../../../UserContext';
import UpdatePassModal from './profile.updatePassModal';

const Profile = () => {
  const user = useContext(UserContext);


  if (!user.user) {
    history.push("/");
  }
  
  return (
        <Box className="small-container small-page-height" p="5">
          <Center><h3>{user ? user.user : "Profile"}</h3></Center>
          <Box mt='10'>
            <Stack>
              <Stack direction = {'row'} alignItems='center'>
                <Icon as={EmailIcon}/>
                <p>{user ? user.email : null}</p>
              </Stack>
                <Divider mt='5'/>
                <UpdatePassModal />
            </Stack>
          </Box>
        </Box>
  )
}

export default Profile;

// <p>
//   <strong>Token:</strong>{" "}
//   {currentUser.accessToken.substring(0, 20)} ...{" "}
//   {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
// </p>
// <p>
//   <strong>Id:</strong>{" "}
//   {currentUser.id}
// </p>
//         <strong>Authorities:</strong>
// <ul>
//   {currentUser.roles &&
//     currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
// </ul>