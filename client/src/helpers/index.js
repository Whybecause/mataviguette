import titleize from "titleize";
import * as moment from "moment";
import dayjs from 'dayjs';

export const rentalType = isShared => (isShared ? "shared" : "entire");
export const toUpperCase = value => (value ? titleize(value) : "");


export const pretifyDate = date => moment(date).format("MMM Do YY");

export const getRangeOfDates = (startAt, endAt) => {
  const tempDates = [];
  const momentEndAt = dayjs(endAt);
  let momentStartAt = dayjs(startAt);

  while (momentStartAt < momentEndAt) {
    tempDates.push(momentStartAt);
    momentStartAt = momentStartAt.add(1, "day");
  }

  tempDates.push(momentEndAt);

  return tempDates;
};
