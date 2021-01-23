import axios from 'axios';
import { URL_ROOT } from '../constants'

// ACTION TYPES;
export const UPDATE_CAMPUS = "UPDATE_CAMPUS";

// ACTION CREATORS;
const updateCampus = campusData => {
  return {
    type: UPDATE_CAMPUS,
    payload: campusData
  }
}

// THUNK CREATORS;
export const updateCampusThunk = campusData => dispatch => {
  return axios
    .put(`${URL_ROOT}/api/campus`, { campusData })
    .then(res => res.status)
    .then(status => {
       if (200 <= status && status < 300) dispatch(updateCampus(campusData))
       else throw new Error("Error updating campus")
    })
    .catch(err => console.log(err))
}
