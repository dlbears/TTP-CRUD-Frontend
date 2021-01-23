import axios from 'axios';
import { URL_ROOT } from '../constants'

// ACTION TYPES;
export const FETCH_STUDENT = "FETCH_STUDENT";

// ACTION CREATORS;
const fetchStudent = id => {
  return {
    type: FETCH_STUDENT,
    payload: id
  }
}

// THUNK CREATORS;
export const fetchStudentThunk = id => dispatch => {
  return axios
    .get(`${URL_ROOT}/routes/studentOne/${id}`)
    .then(({ status, data }) => ({ status, data }))
    .then(({ status, data: { student } }) => {
       if (200 <= status && status < 300) dispatch(fetchStudent(student))
       else throw new Error("Error fetching student")
    })
    .catch(err => console.log(err))
}