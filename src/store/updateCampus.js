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
export const updateCampusThunk = (id, campusData) => dispatch => {
  return axios
    .put(`${URL_ROOT}/routes/campusUpdate/${id}`, { campusData })
    .then(({ status, data }) => ({ status, data }))
    .then(({ status, data: { campus } }) => {
       if (200 <= status && status < 300) dispatch(updateCampus(campus))
       else throw new Error("Error updating campus")
    })
    .catch(err => console.log(err))
}
