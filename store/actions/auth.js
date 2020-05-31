import React from "react";
import { Alert, AsyncStorage } from "react-native";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";
import { API_KEY, LOGINURL, REGISTERURL } from "../../env";

export const auth = (type, ...userInoput) => {
  return async (dispatch) => {
    setTimeout(async () => {
      await AsyncStorage.setItem('userToken', JSON.stringify(...userInoput))
      dispatch({
        type,
        payload: response,
      });
    }, 2000);
  };
};

export const logout = () => {
  return { type: LOGOUT };
};
