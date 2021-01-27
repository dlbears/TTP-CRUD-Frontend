import React, { useState, useEffect } from 'react';
//import './styles/AllPlayersView.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
const CampusData= {Name: 'Queens',Address: '65-30 Kissena Blvd, Flushing, NY 11367',description: 'Queens College',image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_9MKtIYjthuswbbbSAV7FMA2Xpn4JElp35g&usqp=CAU',Students:['Timmy Turner','Darth Vader']}

const EditForm = ({ campus, setValue, onSubmit, formRef }) => {
  //const { name, address, description, imageUrl } = campus
  return (
  <form onSubmit={e => {e.preventDefault(); console.log('Submitted'); onSubmit()}} ref={formRef}>
    <label for='Name'>Name:</label>
    <input type= 'text' id='Name' name='Name' value={campus?.name} onChange={e => setValue({ ...campus, name: e.target.value })} required/><br></br>
    <label for='Address'>Address:</label>
    <input type= 'text' id='Address' name='Address' value={campus?.address} onChange={e => setValue({ ...campus, address: e.target.value })} required/><br></br>
    <label for='description'>Description:</label>
    <input type= 'text' id='description' name='description' value={campus?.description} onChange={e => setValue({ ...campus, description: e.target.value })} /><br></br>
    <label for='imageUrl'>Image URL:</label>
    <input type= 'url' id='imageUrl' name='imageUrl' value={campus?.imageUrl} onChange={e => setValue({ ...campus, imageUrl: e.target.value })} /><br></br>
  </form>)
}

const SingleCampus= ({ campus, students, isEditing, isDeleting, onSubmit, formRef }) => {
 //console.log(CampusData)
 const [campusForm, setCampus] = useState(campus)
 const [studentUpdates, setUpdate] = useState([])
 const [selected, setSelect] = useState("")

 const add = aId => {
        setUpdate([...studentUpdates.filter(([ type, sId ]) => !(type === "REMOVE" && Number(aId) === sId)), [ "ADD", Number(aId) ]])
        setSelect("")
 },
       remove = aId => setUpdate([...studentUpdates.filter(( [ type, sId ]) => !(type === "ADD" && Number(aId) === sId)), ["REMOVE", Number(aId) ]])

  useEffect(() => {
    setCampus(campus)
  }, [campus])

  useEffect(() => {
    setUpdate([])
    setCampus(campus)
  }, [isEditing])

  useEffect(() => {
    console.log('selected add: ', selected)
    console.log('updates ', studentUpdates, students.filter(({ id: sId }) => studentUpdates.filter(([ type, aId ]) => type === "ADD" && aId === sId).reduce((p, c) => p || true, false)))
  }, [selected, studentUpdates])

  return (
    <div className="data">
      { isEditing 
      ? <EditForm formRef={formRef} setValue={setCampus} campus={campusForm} onSubmit={() => {console.log(campusForm.name); onSubmit(studentUpdates.map(([ type, sId ]) => ([ type, students.reduce((pre, { id, ...rest }) => id === sId ? ({ id, ...rest}) : pre, null)])), campusForm);  }}/> 
      : (<p>
      Name: {campus?.name}<br/>Address: {campus?.address}<br/>{campus?.description}<br/><img src={campus?.imageUrl} alt='' className='CImage'/>
      </p>) }
      <div className='stuList'>
       <p><u>Students</u></p>
       { !isEditing 
       ? students?.filter(({ campusId }) => campusId === campus?.id)?.map(student => (<Link to={`/students/${student.id}`}><div className='stu'>{student.firstname}</div></Link>)) 
       : students?.filter(({ campusId }) => campusId === campus?.id)
                 ?.filter(({ id: sId }) => studentUpdates.filter(([ type, aId ]) => type === "REMOVE" && aId === sId).reduce((p, c) => p && false, true))
                 .concat(students.filter(({ id: sId }) => studentUpdates.filter(([ type, aId ]) => type === "ADD" && aId === sId).reduce((p, c) => p || true, false)))
                 .reduce((acc, cur) => acc.length === 0 ? [ cur ] : [ ...acc.filter(({ id: sId }) => sId !== cur.id ), cur ], [])
                 ?.map(student => (<div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center' }}><div className='stu'>{student.firstname}</div><div className="remove" onClick={() => remove(student.id)}> –</div></div>))
       } 
       { isEditing && (<>
        <select value={selected} onChange={e => setSelect(e.target.value)}>
          <option value="" selected>Select student</option>
          { students.filter(({ campusId }) => campusId !== campus?.id)
                    .concat( students.filter(({ id: sId }) => studentUpdates.filter(([ type, aId ]) => type === "REMOVE" && sId === aId).reduce((p, c) => p || true, false)))
                    ?.filter(({ id: sId }) => studentUpdates.filter(([ type, aId ]) => type === "ADD" && aId === sId).reduce((p, c) => p && false, true))
                    .reduce((acc, cur) => acc.length === 0 ? [ cur ] : [ ...acc.filter(({ id: sId }) => sId !== cur.id ), cur ], [])
                    .sort(({ id: aId }, { id: bId }) => aId - bId)
                    .map(({ id, firstname, lastname }) => <option value={id}>{`${id}: ${lastname}, ${firstname}`}</option>) }

        </select>
        <div className="add" onClick={() => {
          selected !== "" && add(selected);
        }}>
          +
        </div>
       </>)}  
      </div>
    </div>
  );
};



SingleCampus.propTypes = {
  CampusData: PropTypes.array.isRequired
};

export default SingleCampus;