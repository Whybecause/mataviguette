import dayjs from 'dayjs';

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

export const getDatesBetweenDates = (startDate, endDate) => {
  let dates = []
  const theDate = new Date(startDate)
  while (theDate < endDate) {
    dates = [...dates, new Date(theDate)]
    theDate.setDate(theDate.getDate() + 1)
  }
  dates = [...dates, endDate]
  return dates
}

// transform multiple array in one array
export const flatten = (arr) => {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}
