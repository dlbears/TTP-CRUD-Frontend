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
    if (studentData.campusId != null) {
        const { campusId, ...rest } = studentData
        return axios
            .get(`${URL_ROOT}/routes/campusOne/${campusId}`, { validateStatus: status => (200 <= status && status < 300) || status === 404 })
            .then(({ status }) =>{
                const body = 200 <= status && status < 300 ? studentData : ({ ...rest, campusId: null })
                
                axios.put(`${URL_ROOT}/routes/studentUpdate/${id}`, body)
                        .then(({ status: updateStatus, data: student }) => {
                            if (200 <= updateStatus && updateStatus < 300) dispatch(updateStudent(student))
                            else throw new Error("Error updating student")
                        }).catch(err => console.log(err))
           
             }).catch(err => console.log(err))
    } else {
        return axios
            .put(`${URL_ROOT}/routes/studentUpdate/${id}`, studentData)
            .then(({ status, data }) => ({ status, data }))
            .then(({ status, data: { student } }) => {
            if (200 <= status && status < 300) dispatch(updateStudent(student))
            else throw new Error("Error updating student")
            })
            .catch(err => console.log(err))
    }

  
}

