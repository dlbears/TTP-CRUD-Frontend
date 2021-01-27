import axios from 'axios';
import { URL_ROOT } from '../constants'

// ACTION TYPES;
const ERROR_FETCH_CAMPUS = "ERROR_FETCH_CAMPUS";

// ACTION CREATORS;
const errorFetchCampus = campusId => {
  return {
    type: ERROR_FETCH_CAMPUS,
    payload: campusId
  }
}

// THUNK CREATORS;
export const errorFetchCampusThunk = campusId => dispatch => dispatch(errorFetchCampus(campusId))

// REDUCER;
const reducer = (state = [], action) => {
  switch (action.type) {
    case ERROR_FETCH_CAMPUS:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;
