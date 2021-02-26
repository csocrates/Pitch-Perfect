import axios from "axios";
const { REACT_APP_API_KEY } = process.env;

export const fetchGeocode = (searchLocation) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?&address=${searchLocation}%2C%20uk&key=${REACT_APP_API_KEY}`
    )
    .then(({ data }) => {
      const { lat, lng } = data.results[0].geometry.location;
      if (lat < 49.924751 || lat > 60.835231 || lng < -10.634202 || lng > 1.810946) {
        throw new Error('Must be in British Isles');
      }
      return data.results[0].geometry.location;
    }
    );
};
