import axios from "axios";
import idx from "idx";
import { api_url as API_URL } from "../../../client_config";

export function doSignUp(data) {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}users/signup`,
      data,
    })
      .then((response) => {
        if (response?.data) {
          localStorage.setItem("token", response.data?.token);
          localStorage.setItem("user_id", response.data?.user_id);
          return response.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
}
