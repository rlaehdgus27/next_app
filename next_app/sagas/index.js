import { all, fork } from "redux-saga/effects";
import userSaga from "./user";
import feedSaga from "./feed";
import axios from "axios";
// import backURL from "../config/config";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(feedSaga),
    //
  ]);
}
