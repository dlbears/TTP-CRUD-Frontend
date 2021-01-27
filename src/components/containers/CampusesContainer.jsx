import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { fetchAllCampusesThunk, fetchAllStudentsThunk, fetchCampusThunk, createCampusThunk, updateCampusThunk, deleteCampusThunk, redirecResetThunk } from '../../thunks/index'
import { useParams, Redirect } from 'react-router-dom'
import { CampusView, SingleCampus } from '../views';

const CampusContainer = ({
    reset,
    pathname,
    redirect,
    formRef,
    isEditing,
    isDeleting,
    isConfirmed,
    isSingle,
    errorID,
    campuses,
    students,
    fetchAllCampuses,
    fetchAllStudents,
    fetchCampus,
    createCampus,
    updateCampus,
    deleteCampus,
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

    useEffect(() => { isSingle && isDeleting && isConfirmed && deleteCampus(numId) }, [isSingle, isDeleting, isConfirmed])

    useEffect(() => { redirect && isSingle && pathname === `/campuses/${redirect}` && reset() }, [redirect, isSingle])
    
    useEffect(() => { (redirect || redirect === "") && pathname === `/campuses/${redirect}` && resetRedirect() }, [ pathname, redirect ])
    //console.log("ErrorID: ", errorID)
    //console.log("ID: ", strId, " and type num ", isSingle, campuses.filter(({ id }) => id === numId ) )
    useEffect(() => {
        if (isSingle && isParamValid) {
            fetchCampus(numId)
            fetchAllStudents()
            
        } else {
            fetchAllCampuses()
        }
    }, [numId])

    return (isSingle || redirect) ? (!isParamValid || errorID === numId || (redirect || redirect === "")) ? <Redirect to={{ pathname: errorID === numId ? '/404' : (redirect || redirect === "") ? `/campuses/${redirect}` : '/400', state: { type: 'campuses', id: redirect || numId } }}/> : <SingleCampus isEditing={isEditing} formRef={formRef} onSubmit={updateCampus} students={students} campus={campuses.filter(({ id }) => id === numId )[0]} /> : <CampusView formRef={formRef} onSubmit={createCampus} onDelete={deleteCampus} isEditing={isEditing} campuses={campuses} /> 

} 

const mapState = ({ state: { campuses, students, campusRedirect: redirect }, errorCampus: errorID }) => ({ campuses, students, redirect, errorID })

const reconcileStudents = (students, updates) => updates.filter(([ type, { id: sId } ]) => type === "ADD" 
                                                                                    ? !students.filter(({ id }) => id === sId).length > 0
                                                                                    : type === "REMOVE" 
                                                                                        ? students.filter(({ id }) => id === sId).length > 0
                                                                                        : false)

const mapDispatch = dispatch => ({
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
    fetchCampus: id => dispatch(fetchCampusThunk(id)),
    createCampus: (name, address, description, imageUrl) => dispatch(createCampusThunk({ name, address, description, imageUrl })),
    updateCampus: (studentUpdates, { id, name, address, students, description, imageUrl }) => {
        const reconciledUpdates = reconcileStudents(students, studentUpdates)
        console.log("Update Values: ", `
            ID: ${id},
            Name: ${name},
            Address: ${address},
            Description: ${description},
            imageUrl: ${imageUrl},
            students: ${JSON.stringify(students, null, 2)}
            studentUpdates: ${JSON.stringify(studentUpdates, null, 2)}
            reconciledUpdates: ${JSON.stringify(reconciledUpdates, null, 2)}
        `)
        
        dispatch(updateCampusThunk(id, reconciledUpdates, { name, address, description, imageUrl }))
    }, //TODO: need to update based on id
    deleteCampus: id => dispatch(deleteCampusThunk(id)),
    resetRedirect: () => dispatch(redirecResetThunk())
})


export default connect(mapState, mapDispatch)(CampusContainer)