import axios from 'axios';
import { URL_ROOT } from '../constants'

// ACTION TYPES;
export const UPDATE_STUDENT = "UPDATE_STUDENT";

// ACTION CREATORS;
const updateStudent = studentData => {
  return {
    type: UPDATE_STUDENT,
    payload: studentData
  }
}

// THUNK CREATORS;
export const updateStudentThunk = (id, studentData) => dispatch => {
  return axios
    .put(`${URL_ROOT}/routes/studentUpdate/${id}`, { studentData })
    .then(({ status, data }) => ({ status, data }))
    .then(({ status, data: { student } }) => {
       if (200 <= status && status < 300) dispatch(updateStudent(student))
       else throw new Error("Error updating student")
    })
    .catch(err => console.log(err))
}

