import React from 'react';
import './styles/AllPlayersView.css';
import PropTypes from 'prop-types';

const CampusData= {Name: 'Queens',Address: '65-30 Kissena Blvd, Flushing, NY 11367',description: 'Queens College',image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_9MKtIYjthuswbbbSAV7FMA2Xpn4JElp35g&usqp=CAU',Students:['Timmy Turner','Darth Vader']}

const SingleCampus= props => {
 console.log(CampusData)
  return (
    <div className="data">
      <p>
      Name: {CampusData.Name}<br/>Address: {CampusData.Address}<br/>{CampusData.description}<br/><img src={CampusData.image} alt='' className='CImage'/>
      </p>
      <div className='stuList'>
       <p><u>Students</u></p>
       {CampusData.Students.map(student=>(<div className='stu'>{student}</div>))}   
      </div>
    </div>
  );
};



SingleCampus.propTypes = {
  CampusData: PropTypes.array.isRequired
};

export default SingleCampus;