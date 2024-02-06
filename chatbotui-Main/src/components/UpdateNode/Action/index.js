import axios from "axios";
import idx from "idx";
import { api_url as API_URL } from "../../../client_config";

export const getSlackChannel = (userId) => {
  return () =>
    axios({
      method: "GET",
      url: `${API_URL}integrations/get_slack?userId=${userId}`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const sendGridEmail = (data) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}integrations/sendgrid_email `,
      data,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const getGridEmail = (userId) => {
  return () =>
    axios({
      method: "GET",
      url: `${API_URL}integrations/get_email?userId=${userId}`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const creactVariable = (data) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}customfields/global_variable`,
      data,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};
