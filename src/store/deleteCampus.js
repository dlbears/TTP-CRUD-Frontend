import axios from 'axios';
import { URL_ROOT } from '../constants'

// ACTION TYPES;
export const DELETE_CAMPUS = "DELETE_CAMPUS";

// ACTION CREATORS;
const deleteCampus = id => {
  return {
    type: DELETE_CAMPUS,
    payload: id
  }
}

// THUNK CREATORS;
export const deleteCampusThunk = id => dispatch => {
  return axios
    .delete(`${URL_ROOT}/routes/campusDelete/${id}`)
    .then(res => res.status)
    .then(status => {
       if (200 <= status && status < 300) dispatch(deleteCampus(id))
       else throw new Error("Error deleting campus")
    })
    .catch(err => console.log(err))
}

