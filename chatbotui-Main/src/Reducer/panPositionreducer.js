import { PANPOSITION } from "../components/Constant/Constant";

export const panPositionReducer = (state = [], action) => {
  const { type, data } = action;
  switch (type) {
    case PANPOSITION:
      return (state = data);

    default:
      return state;
  }
};
