import axios from "axios";
import idx from "idx";
import { api_url as API_URL } from "../../../client_config";
import { ELEMENTS, PANPOSITION } from "../../Constant/Constant";

export const addSubNode = (data) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}node/add_sub_node`,
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

export const addNewNodeData = (data) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}node/create_node`,
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

export const addNodeWithConnection = (data, node_id, sub_node_id) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}node/create_node_with_conn?node_id=${node_id}&sub_node_id=${sub_node_id} `,
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

export const updatePanPosition = (data) => {
  return (dispatch) => dispatch({ type: PANPOSITION, data: data });
};

export function deleteNodes(id) {
  axios({
    method: "delete",
    url: `${API_URL}node/delete_node?node_id=${id}&flow_id=55`,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => idx(error, (_) => _.response.data));
}

export const getUpdateNode = (data, id) => {
  return () =>
    axios({
      method: "PUT",
      url: `${API_URL}node/update_node?node_id=${id}`,
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

export const updateSubNode = (data) => {
  return () =>
    axios({
      method: "PUT",
      url: `${API_URL}node/update_subnode`,
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

export const updateNewSubNode = (data, flowId, NodeId) => {
  return () =>
    axios({
      method: "PUT",
      url: `${API_URL}node/new_update_subnode?flow_id=${flowId}&node_id=${NodeId}`,
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

export const addNewEdgeConnection = (data) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}node/create_connection`,
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

export function deleteEdge(id, flowId) {
  return () =>
    axios({
      method: "delete",
      url: `${API_URL}node/delete_connection?connection_id=${id}&flow_id=${flowId}`,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
}

export const addNewNodeEdge = (data) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}node/create_node_with_conn`,
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

export const publishBot = (id, data) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}flow/publish?flow_id=${id}`,
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

export const getFlowDetail = (id) => {
  return () =>
    axios({
      method: "GET",
      url: `${API_URL}flow/flow_detail?flow_id=${id}`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};
