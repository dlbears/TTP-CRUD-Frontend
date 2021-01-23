import axios from 'axios';
import { URL_ROOT } from '../constants'

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
    .then(res => res.status)
    .then(status => {
       if (200 <= status && status < 300) dispatch(fetchCampus(id))
       else throw new Error("Error fetching campus")
    })
    .catch(err => console.log(err))
}