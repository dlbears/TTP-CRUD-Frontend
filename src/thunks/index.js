// Barrel file for thunks, which will be mapped to and invoked within our smart containers;
export * from '../store/utilities/allPlayers';

export { fetchAllCampusesThunk } from '../store/allCampuses'
export { fetchAllStudentsThunk } from '../store/allStudents'
export { fetchCampusThunk } from '../store/singleCampus'
export { fetchStudentThunk } from '../store/singleStudent'
export { createCampusThunk } from '../store/createCampus'
export { createStudentThunk } from '../store/createStudent'
export { deleteCampusThunk } from '../store/deleteCampus'
export { deleteStudentThunk } from '../store/deleteStudent'
export { updateCampusThunk } from '../store/updateCampus'
export { updateStudentThunk } from '../store/updateStudent'
export { redirecResetThunk } from '../store/utilities/resetRedirect'