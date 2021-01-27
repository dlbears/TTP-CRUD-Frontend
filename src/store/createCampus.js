import axios from 'axios';
import { URL_ROOT } from '../constants'

// ACTION TYPES;
export const CREATE_CAMPUS = "CREATE_CAMPUS";

// ACTION CREATORS;
const createCampus = campus => {
  return {
    type: CREATE_CAMPUS,
    payload: campus
  }
}

// THUNK CREATORS;
export const createCampusThunk = campusData => dispatch => {
    console.log('CAMPUS DATA: ', campusData)
  return axios
    .post(`${URL_ROOT}/routes/campusCreate`, campusData)
    .then(({ status, data }) => ({ status, data })) // Returned data should be an id
    .then(({ status, data: { campus: { id } } }) => {
       if (200 <= status && status < 300) dispatch(createCampus(({ ...campusData, id })))
       else throw new Error("Error creating campus")
    })
    .catch(err => console.log(err))
}
