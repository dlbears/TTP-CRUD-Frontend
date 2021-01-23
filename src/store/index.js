// Necessities and accessories for constructing our Redux store;
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//Action Types
import { FETCH_ALL_CAMPUSES } from './allCampuses'
import { FETCH_ALL_STUDENTS } from './allStudents'
import { FETCH_CAMPUS } from './singleCampus'
import { FETCH_STUDENT } from './singleStudent'
import { CREATE_CAMPUS } from './createCampus'
import { CREATE_STUDENT } from './createStudent'
import { DELETE_CAMPUS } from './deleteCampus'
import { DELETE_STUDENT } from './deleteStudent'
import { UPDATE_CAMPUS } from './updateCampus'
import { UPDATE_STUDENT } from './updateStudent'

// Individual reducers altogether under an alias;
import * as reducers from '../reducers';

const initialState = {
    students: [],
    campuses: []
}

const reductions = {
    [FETCH_ALL_CAMPUSES]: (state, campuses) => ({ ...state, campuses }),
    [FETCH_ALL_STUDENTS]: (state, students) => ({ ...state, students }),
    [FETCH_CAMPUS]: ({ students, campuses }, campus) => ({ students , campuses: [ ...campuses, campus ] }),
    [FETCH_STUDENT]: ({ students, campuses }, student) => ({ students: [ ...students, student ], campuses }),
    [CREATE_CAMPUS]: ({ students, campuses }, campus) => ({ students, campuses: [ ...campuses, campus ] }),
    [CREATE_STUDENT]: ({ students, campuses }, student) => ({ students: [ ...students, student ], campuses }),
    [DELETE_CAMPUS]: ({ students, campuses }, campusID) => ({ students, campuses: campuses.filter(({ id }) => id !== campusID) }),
    [DELETE_STUDENT]: ({ students, campuses }, studentID) => ({ students: students.filter(({ id }) => id !== studentID), campuses }),
    [UPDATE_CAMPUS]: ({ students, campuses }, campusUpdate) => ({ students, campuses: campuses.map(campus => campus.id === campusUpdate.id ? campusUpdate : campus) }),
    [UPDATE_STUDENT]: ({ students, campuses }, studentUpdate) => ({ students: students.map(student => student.id === studentUpdate.id ? studentUpdate : student), campuses })
}

const rootReducer = (state=initialState, { type, payload }) => reductions[type] != undefined ? reductions[type](state, payload) : state


// Construct our Redux store;
//const rootReducer = combineReducers(reducers);
const logger = createLogger({ collapsed: true });
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, logger));
const store = createStore(rootReducer, middleware);

// Export our store by default, which will be provided to and injected within our entire application;
export default store;
