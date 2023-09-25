import Axios from "axios";

const axios = (token) => {
  return Axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export default axios;