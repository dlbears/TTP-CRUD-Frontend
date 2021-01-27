import axios from 'axios';
import { URL_ROOT } from '../constants'

// ACTION TYPES;
export const DELETE_STUDENT = "DELETE_STUDENT";

// ACTION CREATORS;
const deleteStudent = id => {
  return {
    type: DELETE_STUDENT,
    payload: id
  }
}

// THUNK CREATORS;
export const deleteStudentThunk = id => dispatch => {
  return axios
    .delete(`${URL_ROOT}/routes/studentDelete/${id}`)
    .then(res => res.status)
    .then(status => {
       if (200 <= status && status < 300) dispatch(deleteStudent(id))
       else throw new Error("Error deleting student")
    })
    .catch(err => console.log(err))
}