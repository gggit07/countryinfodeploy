import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAIL,
  FETCH_COUNTRY_REQUEST,
  FETCH_COUNTRY_SUCCESS,
  FETCH_COUNTRY_FAIL,
} from "../constants";

export const countriesReduces = (
  state = { countries: [], loading: false, error: "" },
  action
) => {
  switch (action.type) {
    case FETCH_COUNTRIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.payload,
        loading: false,
        error: "",
      };
    case FETCH_COUNTRIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const countryReduces = (
  state = { country: [], loading: false, error: "" },
  action
) => {
  switch (action.type) {
    case FETCH_COUNTRY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COUNTRY_SUCCESS:
      return {
        ...state,
        country: action.payload,
        loading: false,
        error: "",
      };
    case FETCH_COUNTRY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
