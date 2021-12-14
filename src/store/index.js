import { createStore } from "redux";
import appReducers from "./reducers";

export const store = createStore(appReducers);
