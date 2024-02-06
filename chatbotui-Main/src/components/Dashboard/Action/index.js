import axios from "axios";
import idx from "idx";
import { api_url as API_URL } from "../../../client_config";

export const getFlowListData = (id) => {
  return () =>
    axios({
      method: "GET",
      url: `${API_URL}flow/get_flow_list?user_id=${id}`,
    })
      .then((response) => {
        if (response?.data) {
          console.log(response?.data)
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const getWokpsaceFlowList = (workSpaceId, userId) => {
  return () =>
    axios({
      method: "GET",
      url: `${API_URL}workspaces/get_workspace_flow_list`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const addNewFlowList = (data) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}flow/create_flow`,
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

export const updateFlowName = (id, userId, name) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}flow/rename_flow?user_id=${userId}&flow_id=${id}&new_name=${name}`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const archiveFlow = (id, userId) => {
  return () =>
    axios({
      method: "PATCH",
      url: `${API_URL}flow/archive_flow?flow_id=${id}&user_id=${userId}`,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const restoreFlow = (id, userId) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}flow/trash/restore_flow?flow_id=${id}&user_id=${userId}`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const trashDelete = (id, userId) => {
  return () =>
    axios({
      method: "DELETE",
      url: `${API_URL}flow/trash/delete_forever?flow_id=${id}&user_id=${userId}`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const getTrashFlowList = (id) => {
  return () =>
    axios({
      method: "GET",
      url: `${API_URL}flow/get_trashed_flows?user_id=${id}`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const getWorkSpaceList = (id) => {
  return () =>
    axios({
      method: "GET",
      url: `${API_URL}workspaces/get_workspace?user_id=${id}`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const addWorkSpace = (data) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}workspaces/create_workspace`,
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

export const renameWorkSpace = (data) => {
  return () =>
    axios({
      method: "PATCH",
      url: `${API_URL}workspaces/rename_workspace?workspace_id=${data?.id}&new_name=${data?.name}&user_id=${data?.user_id}`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const deleteWorkSpace = (id, userId) => {
  return () =>
    axios({
      method: "DELETE",
      url: `${API_URL}workspaces/remove_workspace?workspace_id=${id}&user_id=${userId}`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const moveFlow = (flowId, workSpaceId) => {
  return () =>
    axios({
      method: "POST",
      url: `${API_URL}workspaces/move_flow?flow_id=${flowId}&workspace_id=${workSpaceId}`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};

export const removeFromWorkSpace = (id, userId) => {
  return () =>
    axios({
      method: "PATCH",
      url: `${API_URL}workspaces/remove_from_workspace?flow_id=${id}&user_id=${userId}`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};
