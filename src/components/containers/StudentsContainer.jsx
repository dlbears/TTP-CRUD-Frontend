import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { fetchAllStudentsThunk, fetchAllCampusesThunk, fetchStudentThunk, createStudentThunk, updateStudentThunk, deleteStudentThunk, redirecResetThunk } from '../../thunks/index'
import { useParams, Redirect } from 'react-router-dom'
import { SingleStudent, StudentView } from '../views';

const StudentContainer = ({
    reset,
    pathname,
    redirect,
    formRef,
    isEditing,
    isDeleting,
    isConfirmed,
    isSingle,
    errorID,
    students,
    campuses,
    fetchAllStudents,
    fetchAllCampuses,
    fetchStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    resetRedirect
}) => {
    const { id: strId } = useParams()
    //const isSingle = strId !== "" && (strId ?? false) 
    let isParamValid = false,
        numId
    if (isSingle) {
        try {
            numId = Number(strId)
            isParamValid = Number.isInteger(numId) 
        } catch (e) {
            isParamValid = false
        }
    }

    useEffect(() => { isSingle && isDeleting && isConfirmed && deleteStudent(numId) }, [isSingle, isDeleting, isConfirmed])

    useEffect(() => { redirect && isSingle && pathname === `/students/${redirect}` && reset() }, [redirect, isSingle])
    
    useEffect(() => { (redirect || redirect === "") && pathname === `/students/${redirect}` && resetRedirect() }, [ pathname, redirect ])
    //console.log("ErrorID: ", errorID)
    //console.log("ID: ", strId, " and type num ", isSingle, campuses.filter(({ id }) => id === numId ) )
    useEffect(() => {
        if (isSingle && isParamValid) {
            fetchStudent(numId)
            fetchAllCampuses()
            
        } else {
            fetchAllStudents()
        }
    }, [numId])

    return (isSingle || redirect) ? (!isParamValid || errorID === numId || (redirect || redirect === "")) ? <Redirect to={{ pathname: errorID === numId ? '/404' : (redirect || redirect === "") ? `/students/${redirect}` : '/400', state: { type: 'students', id: redirect || numId } }}/> : <SingleStudent isEditing={isEditing} formRef={formRef} onSubmit={updateStudent} student={students.filter(({ id }) => id === numId)[0]} campuses={campuses} /> : <StudentView formRef={formRef} onSubmit={createStudent} onDelete={deleteStudent} isEditing={isEditing} students={students} /> 

} 
const mapState = ({ state: { campuses, students, studentRedirect: redirect }, errorStudent: errorID }) => ({ students, campuses, redirect, errorID })

const mapDispatch = dispatch => ({
    fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    fetchStudent: id => dispatch(fetchStudentThunk(id)),
    createStudent: (firstname, lastname, email, gpa, campusId, imageUrl) => dispatch(createStudentThunk({ firstname, lastname, email, gpa, campusId, imageUrl })),
    updateStudent: (stu) => {
        const { id, firstname, lastname, email, gpa, campusId, imageUrl } = stu
        console.log('StuUp: ', stu )
        dispatch(updateStudentThunk(id, { firstname, lastname, email, gpa, campusId, imageUrl }))
    
    },
    deleteStudent: id => dispatch(deleteStudentThunk(id)),
    resetRedirect: () => dispatch(redirecResetThunk())
})


export default connect(mapState, mapDispatch)(StudentContainer)