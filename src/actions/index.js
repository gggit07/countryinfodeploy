import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAIL,
  FETCH_COUNTRY_REQUEST,
  FETCH_COUNTRY_SUCCESS,
  FETCH_COUNTRY_FAIL,
} from "../constants";

import API from "../api";

export const fetchCountries = () => async (dispatch) => {
  dispatch({ type: FETCH_COUNTRIES_REQUEST });

  try {
    const { data } = await API.get("/all");

    dispatch({
      type: FETCH_COUNTRIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_COUNTRIES_FAIL,
      payload: error,
    });
  }
};

export const fetchCountry = (name) => async (dispatch) => {
  dispatch({ type: FETCH_COUNTRY_REQUEST });

  try {
    const { data } = await API.get(`/name/${name}`);

    dispatch({
      type: FETCH_COUNTRY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_COUNTRY_FAIL,
      payload: error,
    });
  }
};
