import { ELEMENTS } from "../components/Constant/Constant";

export const elementsReducer = (state = [], action) => {
  const { type, data } = action;
  switch (type) {
    case ELEMENTS:
      return (state = data);

    default:
      return state;
  }
};
