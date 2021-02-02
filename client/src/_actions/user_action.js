import axios from "axios";
import { LOGIN_USER, REGISTER_USER, RECEIVER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios.post("/users/login", dataToSubmit).then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios.post("/users/register", dataToSubmit).then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function submitReceiver(dataToSubmit) {
  const request = axios.post("/users/register/smsauth", dataToSubmit).then((response) => response.data);

  return {
    type: RECEIVER,
    payload: request,
  };
}
