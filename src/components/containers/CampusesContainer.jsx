import React, { useEffect } from 'react'
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
        console.log('fetchAll ', fetchAllCampuses)
    }, [])

    return <AllPlayersView allPlayers={campuses.map(({ name, id }) => ({ firstname: name, id }))} />

} 

const mapState = ({ campuses }) => ({ campuses })

const mapDispatch = dispatch => ({
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    fetchCampus: id => dispatch(fetchCampusThunk(id)),
    createCampus: data => dispatch(createCampusThunk(data)),
    updateCampus: data => dispatch(updateCampusThunk(data)),
    deleteCampus: id => dispatch(deleteCampusThunk(id))
})


export default connect(mapState, mapDispatch)(CampusContainer)