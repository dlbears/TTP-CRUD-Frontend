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
export const updateCampusThunk = (id, studentUpdates, { name, imageUrl, address, description }) => dispatch => {
    Promise.allSettled([
        ...studentUpdates.map(([type, student]) => type === "REMOVE" ? ({ ...student, campusId: null }) : ({ ...student, campusId: id }))
                         .map(({ id: sId, ...body }) => axios.put(`${URL_ROOT}/routes/studentUpdate/${sId}`, body)),
        axios.put(`${URL_ROOT}/routes/campusUpdate/${id}`, { name, address, description, imageUrl })
    ]).then(res => {
        dispatch(updateCampus(res
            .map(({ value: { data : { message, ...rest }}}) => ({ message, ...rest }))
            .reduce(({ students, campus }, cur) => {
                if (cur.message.includes("STUDENT")) {
                    return { students: [...students, cur.student ], campus }
                } else if (cur.message.includes("CAMPUS")) {
                    return { students, campus: cur.campus }
                }
               return { students, campus }
           }, { students: [], campus: {} })))
    })
    .catch(err => console.error(err))

  /*return /*axios
    .put(`${URL_ROOT}/routes/campusUpdate/${id}`, { name, address, description, imageUrl })
    .then(({ status, data }) => ({ status, data }))
    .then(({ status, data: { campus } }) => {
       if (200 <= status && status < 300) dispatch(updateCampus({ name, imageUrl, address, description, id }))
       else throw new Error("Error updating campus")
    })
    .catch(err => console.log(err))*/
}
