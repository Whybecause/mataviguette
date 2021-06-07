const moment = require('moment');

exports.getRangeOfDates = (startAt, endAt, dateFormat = "YYYY-MM-DD") => {
    const tempDates = [];
    const momentEndAt = moment(endAt);
    let momentStartAt = moment(startAt);
  
    while (momentStartAt < momentEndAt) {
      tempDates.push(momentStartAt.format(dateFormat));
      momentStartAt = momentStartAt.add(1, "day");
    }
  
    tempDates.push(momentEndAt.format(dateFormat));
  
    return tempDates;
  };