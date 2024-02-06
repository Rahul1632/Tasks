import axios from "axios";
import idx from "idx";
import { api_url as API_URL } from "../../../client_config";
// import { USER_DATA } from "../../../Constant";

export function UserData(data) {
  return {
    type: "USER_DATA",
    data: data,
  };
}

export function doLogin(data) {
  return (dispatch) =>
    axios({
      method: "POST",
      url: `${API_URL}users/login/`,
      data,
    })
      .then((response) => {
        if (response?.data) {
          dispatch({ type: "userData", data: response.data });
          localStorage.setItem("token", response.data?.token);
          localStorage.setItem("user_id", response.data?.user_id);
          return response.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
}
