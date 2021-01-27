import axios from 'axios';
import { URL_ROOT } from '../constants'

// ACTION TYPES;
export const FETCH_ALL_STUDENTS = "FETCH_ALL_STUDENTS";

// ACTION CREATORS;
const fetchAllStudents = students => {
  return {
    type: FETCH_ALL_STUDENTS,
    payload: students
  }
}

// THUNK CREATORS;
export const fetchAllStudentsThunk = () => dispatch => {
  return axios
    .get(`${URL_ROOT}/routes/studentAll`)
    .then(res => res.data)
    .then(({ student }) => dispatch(fetchAllStudents(student)))
    .catch(err => console.log(err))
}

