import axios from "axios";
const { REACT_APP_API_KEY } = process.env;

const request = axios.create({
  baseURL: "https://pitch-perfect-api.herokuapp.com/api",
});

export const fetchGeocode = (searchLocation) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?&address=${searchLocation}%2C%20uk&key=${REACT_APP_API_KEY}`
    )
    .then(({ data }) => {
      const { lat, lng } = data.results[0].geometry.location;
      if (
        lat < 49.924751 ||
        lat > 60.835231 ||
        lng < -10.634202 ||
        lng > 1.810946
      ) {
        throw new Error("Must be in British Isles");
      }
      return data.results[0].geometry.location;
    });
};

export const getUser = (username) => {
  return request.get(`/users/${username}`);
};

export const postUser = (newUser) => {
  return request.post("/users", newUser);
};

export const checkPassword = (userData) => {
  return request.post("/login", userData).then((res) => {
    console.log(res.data);
  });
};

const headers = {
  'Content-Type': 'text/plain'
};

export const getReviewsById = (place_id) => {
  return request.get(`/reviews/${place_id}`, {headers})
    .then(({ data: { reviews } }) => {
      return reviews;
    });
}