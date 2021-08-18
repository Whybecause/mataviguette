import { useState, useEffect } from 'react';
import { getDatesBetweenDates, flatten } from '../helpers/index';

import axios from 'axios';

export const useUnavailableDates = (url) => {
  const [ unavailableDates, setUnavailable ] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url);
        if (response.status === 200) {
          let dateArr = [];
          for (let i=0; i < response.data.length; i++) {
            const startDate = new Date(await response.data[i].bookedStart)
            const endDate = new Date(await response.data[i].bookedEnd)
            const dates = getDatesBetweenDates(startDate, endDate)
            dateArr.push(dates)
        }
          setUnavailable(flatten(dateArr));
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  
  return { loading, unavailableDates };
};

