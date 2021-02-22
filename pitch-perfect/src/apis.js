import axios from "axios";
const { REACT_APP_API_KEY } = process.env;

export const fetchGeocode = (searchLocation) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?&address=${searchLocation}%2C%20uk&key=${REACT_APP_API_KEY}`
    )
    .then(({ data }) => data.results[0].geometry.location);
};
