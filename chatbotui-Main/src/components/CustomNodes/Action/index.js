import axios from "axios";
import idx from "idx";
import { api_url as API_URL } from "../../../client_config";
import { ELEMENTS, UPDATE_NODEDATA } from "../../Constant/Constant";

export const getAllNodeList = (id) => {
  return (dispatch) =>
    axios({
      method: "GET",
      url: `${API_URL}flow/get_diagram?flow_id=${id}`,
    })
      .then((response) => {
        if (response?.data) {
          dispatch({
            type: ELEMENTS,
            data: response?.data,
          });
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export function deleteNodes(id, flowId) {
  return () =>
    axios({
      method: "delete",
      url: `${API_URL}api/node/v1/delete_node?node_id=${id}&flow_id=${flowId}`,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
}

export function deleteSubNodes(id, userId, botId) {
  return () =>
    axios({
      method: "delete",
      url: `${API_URL}api/node/v1/delete_sub_node?sub_node_id=${id}&user_id=${userId}&flow_id=${botId}`,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
}

export const sendMediaData = (data, nodeId, flowId) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}api/node/v1/upload_file?node_id=${nodeId}&flow_id=${flowId}`,
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

export const updateNodeData = (data) => {
  return {
    type: UPDATE_NODEDATA,
    payload: data,
  };
};
