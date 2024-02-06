import { USER_DATA } from "../components/Constant/Constant";

export const UserData = (state = {}, action) => {
  const { type, data } = action;
  switch (type) {
    case USER_DATA:
      return data;
    default:
      return state;
  }
};
