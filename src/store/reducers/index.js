import { combineReducers } from "redux";
import { itemsReducer } from "./items";

const appReducers = combineReducers({
  items: itemsReducer,
});

export default appReducers;
