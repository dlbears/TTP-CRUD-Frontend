import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { fetchAllStudentsThunk, fetchStudentThunk, createStudentThunk, updateStudentThunk, deleteStudentThunk } from '../../thunks/index'

const StudentContainer = ({
    students,
    fetchAllStudents,
    fetchStudent,
    createStudent,
    updateStudent,
    deleteStudent
}) => {} 

const mapState = ({ students }) => ({ students })

const mapDispatch = dispatch => ({
    fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
    fetchStudent: id => dispatch(fetchStudentThunk(id)),
    createStudent: (firstname, lastname, email, gpa, campusId, imageUrl) => dispatch(createStudentThunk({ firstname, lastname, email, gpa, campusId, imageUrl })),
    updateStudent: (id, firstname, lastname, email, gpa, campusId, imageUrl) => dispatch(updateStudentThunk(id, { firstname, lastname, email, gpa, campusId, imageUrl })),
    deleteStudent: id => dispatch(deleteStudentThunk(id))
})


export default connect(mapState, mapDispatch)(StudentContainer)