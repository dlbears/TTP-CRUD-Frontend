import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { fetchAllCampusesThunk, fetchCampusThunk, createCampusThunk, updateCampusThunk, deleteCampusThunk } from '../../thunks/index'

import { AllPlayersView } from '../views';

const CampusContainer = ({
    campuses,
    fetchAllCampuses,
    fetchCampus,
    createCampus,
    updateCampus,
    deleteCampus
}) => {

    useEffect(() => {
        fetchAllCampuses()
        deleteCampus(1)
        fetchAllCampuses()
    }, [])

    return <AllPlayersView allPlayers={campuses.map(({ name, id }) => ({ firstname: name, id }))} />

} 

const mapState = ({ campuses }) => ({ campuses })

const mapDispatch = dispatch => ({
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    fetchCampus: id => dispatch(fetchCampusThunk(id)),
    createCampus: (name, address, description, imageUrl) => dispatch(createCampusThunk({ name, address, description, imageUrl })),
    updateCampus: (id, name, address, description, imageUrl) => dispatch(updateCampusThunk(id, { name, address, description, imageUrl })), //TODO: need to update based on id
    deleteCampus: id => dispatch(deleteCampusThunk(id))
})


export default connect(mapState, mapDispatch)(CampusContainer)