import axios from 'axios';
import { URL_ROOT } from '../constants'

// ACTION TYPES;
export const CREATE_STUDENT = "CREATE_STUDENT";

// ACTION CREATORS;
const createStudent = student => {
  return {
    type: CREATE_STUDENT,
    payload: student
  }
}

// THUNK CREATORS;
export const createStudentThunk = studentData => dispatch => {
  return axios
    .post(`${URL_ROOT}/routes/studentCreate`, studentData)
    .then(({ status, data }) => ({ status, data })) // Returned data should be an id
    .then(({ status, data: { student: { id } } }) => {
       if (200 <= status && status < 300) dispatch(createStudent({ ...studentData, id }))
       else throw new Error("Error creating student")
    })
    .catch(err => console.log(err))
}
