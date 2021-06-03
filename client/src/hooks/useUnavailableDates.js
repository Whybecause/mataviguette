import React from 'react';
import useSWR from "swr";
import dayjs from 'dayjs';
import addDays from "date-fns/addDays";

import rentalCRUDService from '../services/rentalCRUD.service';

// export const useFetchUnavailableDates = (url) => {
//     const { data } = useSWR(url, rentalCRUDService.getUnavailableDates);
//     const unavailableDates = data || [];
//     // const isPending = !data;
//     // const setUnavailableDates = mutate;

//     return { unavailableDates  };
// };

// export const useUnavailableDates = async (url) => {
//     const { unavailableDates } = useFetchUnavailableDates(url);
//     const [ bookedDates, setBookedDates ] = React.useState([]);
//     const getDates = (startDate, endDate) => {
//         let dates = [];
//         let currentDate = startDate;
//         const addDaysFunc = function (days) {
//             let date = new Date(this.valueOf());
//             date.setDate(date.getDate() + days);
//             return date;
//         };
//         while (currentDate <= endDate) {
//             dates.push(currentDate);
//             currentDate = addDaysFunc.call(currentDate, 1);
//         }
//         return dates;
//         };
//         try {
//             await Promise.all(

//                 unavailableDates.map(async (event) => {
//                     const startDate = new Date(await event.bookedStart);
//                     const endDate = new Date(await event.bookedEnd);
//                     const dates = getDates(startDate, endDate);
//                     dates.forEach(function (date) {
//                         setBookedDates((oldArr) => [...oldArr, date]);
//                     });   
//                 })
//             )
//         }
//         catch(e) {
//                 return console.log('No Booking Dates')
//             }
  
//     return { bookedDates };

// }


