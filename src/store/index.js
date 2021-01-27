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
import { REDIRECT_RESET } from './utilities/resetRedirect'

// Individual reducers altogether under an alias;
import * as errorReducers from '../reducers';

const initialState = {
    students: [],
    campuses: [], 
    campusRedirect: false,
    studentRedirect: false
}



const mergeByID = (src, updates) => src.length === 0 ? updates : src.map(({ id, ...original }) => updates.reduce((pre, { id: uID, ...update}) => uID === id ? ({ id, ...update }) : pre , false) || ({ id, ...original })) 

const reductions = {
    [FETCH_ALL_CAMPUSES]: (state, campuses) => ({ ...state, campuses }),
    [FETCH_ALL_STUDENTS]: (state, students) => ({ ...state, students }),
    [FETCH_CAMPUS]: ({ students, campuses, ...rest }, campus) => ({ students: mergeByID(students, campus.students), campuses: mergeByID(campuses, [ campus ]), ...rest }),
    [FETCH_STUDENT]: ({ students, campuses, ...rest }, student) => (student?.campus ?? false) ? ({ students: mergeByID(students, [ student ]), campuses: mergeByID(campuses, [ student.campus ]), ...rest }) : ({ students: mergeByID(students, [student]), campuses, ...rest }),
    [CREATE_CAMPUS]: ({ campuses, ...rest }, campus) => ({ ...rest, campuses: [ ...campuses, campus ], campusRedirect: campus.id }),
    [CREATE_STUDENT]: ({ students,...rest }, student) => ({ ...rest, students: [ ...students, student ], studentRedirect: student.id }),
    [DELETE_CAMPUS]: ({ campuses, ...rest }, campusID) => ({ campuses: campuses.filter(({ id }) => id !== campusID), ...rest, campusRedirect: "" }),
    [DELETE_STUDENT]: ({ students, ...rest }, studentID) => ({ students: students.filter(({ id }) => id !== studentID), ...rest, studentRedirect: "" }),
    [UPDATE_CAMPUS]: ({ campuses, students, ...rest }, { students: studentUpdate, campus }) => ({ campuses: mergeByID(campuses, [ campus ]), students: mergeByID(students, studentUpdate), ...rest,  campusRedirect: campus.id }),
    [UPDATE_STUDENT]: ({ students, ...rest }, studentUpdate) => ({ students: mergeByID(students, [ studentUpdate ]), ...rest, studentRedirect: studentUpdate.id }),
    [REDIRECT_RESET]: state => ({ ...state, campusRedirect: false, studentRedirect: false })
}

const stateReducer = (state=initialState, { type, payload }) => reductions[type] != undefined ? reductions[type](state, payload) : state


// Construct our Redux store;
const rootReducer = combineReducers({
    state: stateReducer,
    ...errorReducers
});
const logger = createLogger({ collapsed: true });
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, logger));
const store = createStore(rootReducer, middleware);

// Export our store by default, which will be provided to and injected within our entire application;
export default store;
