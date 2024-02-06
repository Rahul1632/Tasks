import { UPDATE_NODEDATA } from "../components/Constant/Constant";

export const updateNodeData = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_NODEDATA:
      return (state = payload);
    default:
      return state;
  }
};
