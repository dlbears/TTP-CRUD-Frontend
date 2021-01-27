import axios from 'axios';
import { URL_ROOT } from '../constants'

// ACTION TYPES;
export const FETCH_ALL_CAMPUSES = "FETCH_ALL_CAMPUSES";

// ACTION CREATORS;
const fetchAllCampuses = campuses => {
  return {
    type: FETCH_ALL_CAMPUSES,
    payload: campuses
  }
}

// THUNK CREATORS;
export const fetchAllCampusesThunk = () => dispatch => {
  return axios
    .get(`${URL_ROOT}/routes/campusAll`)
    .then(res => res.data)
    .then(({ campus }) => dispatch(fetchAllCampuses(campus)))
    .catch(err => console.log(err))
}
