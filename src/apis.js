import axios from "axios";
const { REACT_APP_API_KEY } = process.env;

export const fetchGeocode = (searchLocation) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?&address=${searchLocation}%2C%20uk&key=${REACT_APP_API_KEY}`
    )
    .then(({ data }) => data.results[0].geometry.location);
};

// export const fetchPlaceDetailById = (place_id) => {
//   console.log(place_id);
//   return axios
//     .get(
//       `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${REACT_APP_API_KEY}`
//     )
//     .then(({ data }) => console.log(data))
//     .catch((err) => console.log(err));
// };
