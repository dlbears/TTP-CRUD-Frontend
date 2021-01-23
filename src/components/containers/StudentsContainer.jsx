import React from 'react'
import { connect } from 'react-redux';
import { fetchAllStudentsThunk, fetchStudentThunk, createStudentThunk, updateStudentThunk, deleteStudentThunk } from '../../thunks/index'

const StudentContainer = () => {} 

const mapState = ({ students }) => ({ students })

const mapDispatch = dispatch => ({
    fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
    fetchStudent: id => dispatch(fetchStudentThunk(id)),
    createStudent: data => dispatch(createStudentThunk(data)),
    updateStudent: data => dispatch(updateStudentThunk(data)),
    deleteStudent: id => dispatch(deleteStudentThunk(id))
})


export default connect(mapState, mapDispatch)(StudentContainer)