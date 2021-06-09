import React from "react";
import { Box, Image, SimpleGrid, Center } from "@chakra-ui/react";

import { dateLang } from '../../../helpers/dateLanguage';
import pic1 from "../../../assets/pic1.jpg";
import ContactHost from './ContactHost.modal';
import AddComment from './AddComment';
import EditComment from './EditComment';
import DeleteComment from './DeleteComment';

const BookingCard = ({ bookings, showCurrentBookings, showAllBookings, setRefresh }) => {

  let BookingCard = null;

  if (!bookings.length) {
    BookingCard = (
        <Center><h4>Vous n'avez aucune réservation</h4></Center>
    );

  } else {
    BookingCard = (
      <SimpleGrid columns={[1, 2, 3 ]} spacing='20px' p='6'>
        {bookings.map((booking) => (
          <Box key={booking._id} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={pic1} alt="Mataviguette cover" />
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                  {dateLang(booking.startAt, 'D MMM YYYY')} &bull; {dateLang(booking.endAt, 'D MMM YYYY')} | {booking.days} jours
                </Box>
              </Box>

              <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                {booking.rental.street}, {booking.rental.city}, France
              </Box>
              <Box
                as="h4"
                color="gray.600"
                fontSize="sm"
                fontWeight="semibold"
                mt="1"
              >
                {booking.totalPrice}€
              </Box>
              <Box mt="2">
                {showCurrentBookings && (
                  <ContactHost id={booking._id}/>
                )}
                {showAllBookings && (
                  !booking.comment.length ? (
                    <AddComment id={booking._id} setRefresh={setRefresh} />
                    ) : (
                      <div>
                      <EditComment commentId={booking.comment} setRefresh={setRefresh} />
                      <DeleteComment commentId={booking.comment} setRefresh={setRefresh}/>
                      </div>
                    )
                  )}
                  
              </Box>
            </Box>
          </Box>
        ))}
        </SimpleGrid>
    );
  }
  return BookingCard;
};

export default BookingCard;
