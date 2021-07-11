import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import projectReducer from "./projects";
import userReducer from "./users";
export default combineReducers({
  bugs: bugsReducer,
  project: projectReducer,
  user: userReducer,
});
