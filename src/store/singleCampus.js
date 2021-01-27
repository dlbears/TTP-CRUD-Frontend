import axios from 'axios';
import { URL_ROOT } from '../constants'
import { errorFetchCampusThunk } from '../reducers/errorCampus'
// ACTION TYPES;
export const FETCH_CAMPUS = "FETCH_CAMPUS";

// ACTION CREATORS;
const fetchCampus = id => {
  return {
    type: FETCH_CAMPUS,
    payload: id
  }
}

// THUNK CREATORS;
export const fetchCampusThunk = id => dispatch => {
  return axios
    .get(`${URL_ROOT}/routes/campusOne/${id}`)
    .then(({ status, data }) => ({ status, data }))
    .then(({ status, data: { campus } }) => {
       if (200 <= status && status < 300) dispatch(fetchCampus(campus))
       else throw new Error("Error fetching campus")
    })
    .catch(err => errorFetchCampusThunk(id)(dispatch))
}