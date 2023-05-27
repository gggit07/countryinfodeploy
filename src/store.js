import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { countriesReduces, countryReduces } from "./reducers";

const reducers = combineReducers({
  countries: countriesReduces,
  country: countryReduces,
});

const store = legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
