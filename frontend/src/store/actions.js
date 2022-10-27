import { fectchUserList } from "@/api/user.js";
export default {
  SET_USER_DATA({ commit }) {
    fectchUserList()
      .then(({ data }) => commit("SET_USER", data))
      .catch((error) => console.log(error));
  },
};
