import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "./middleware/api";
import func from "./middleware/func";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import reducer from "./reducers";

export default function () {
  //without thunk/default middleware
  // return configureStore({ reducer, middleware: [logger("console"), func] });

  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger("console"), toast, api],
  });
}
