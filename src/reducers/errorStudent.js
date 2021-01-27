import axios from 'axios';
import { URL_ROOT } from '../constants'

// ACTION TYPES;
const ERROR_FETCH_STUDENT = "ERROR_FETCH_STUDENT";

// ACTION CREATORS;
const errorFetchStudent = studentId => {
  return {
    type: ERROR_FETCH_STUDENT,
    payload: studentId
  }
}

// THUNK CREATORS;
export const errorFetchStudentThunk = studentId => dispatch => dispatch(errorFetchStudent(studentId))

// REDUCER;
const reducer = (state = [], action) => {
  switch (action.type) {
    case ERROR_FETCH_STUDENT:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;
