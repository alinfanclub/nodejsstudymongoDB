import axios from "axios";

const config = {
  baseUrl: "http://localhost:3000/",
};

function fectchUserList() {
  return axios.get(`${config.baseUrl}user`);
}

export { fectchUserList };
