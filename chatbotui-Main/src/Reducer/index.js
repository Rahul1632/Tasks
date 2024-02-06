import { combineReducers } from "redux";
import { UserData } from "../Reducer/UserDataReducer";
import { elementsReducer } from "./elementsReducer";
import { updateNodeData } from "./updateNodeDataReducer";
import { panPositionReducer } from "./panPositionreducer";

const reducer = combineReducers({
  userData: UserData,
  elements: elementsReducer,
  updateNodeData,
  panPosition: panPositionReducer,
});

export default reducer;
