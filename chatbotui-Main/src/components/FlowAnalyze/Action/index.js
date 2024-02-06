import axios from "axios";
import idx from "idx";
import { api_url as API_URL } from "../../../client_config";

export const getFlowAnalyze = (id) => {
  return () =>
    axios({
      method: "GET",
      url: `${API_URL}flow/flow_analysis?flow_id=${id}`,
    })
      .then((response) => {
        if (response?.data) {
          return response?.data;
        }
        return response;
      })
      .catch((error) => idx(error, (_) => _.response.data));
};
