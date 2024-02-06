import axios from "axios";
import idx from "idx";
import { api_url as API_URL } from "../../../client_config";

export const getPreview = () => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}api/chat_publish/v1/preview?flow_id=55`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const sendHistory = (data) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}api/flow/v1/save_chat_history`,
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

export const getHistory = (ip, flowId) => {
  return () =>
    axios({
      method: "GET",
      url: `${API_URL}api/flow/v1/get_chat_history?ip=${ip}&&token=${flowId}`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const sendResponse = (data) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}api/node/v1/send?flow_id=${data?.flow_id}&my_source_node=${data?.my_source_node}&my_sub_node=${data?.my_sub_node}`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const publishPreview = (token) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}api/flow/v1/${token}/preview`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const getUserIp = () => {
  return () =>
    axios({
      method: "GET",
      url: `https://ipinfo.io/json?token=ccee4bd2c820d4`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const sendUserFile = (data, nodeId, flowId) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}api/flow/v1/upload_from_user?node_id=${nodeId}&flow_id=${flowId}`,
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

export const getVariableList = (userId) => {
  return () =>
    axios({
      method: "GET",
      url: `${API_URL}api/customfields/v1/variables?user_id=${userId}`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const sendVariableList = (data, userId) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}api/customfields/v1/save_var?user_id=${userId}`,
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
