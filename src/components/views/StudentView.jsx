import React from 'react';
import './styles/AllPlayersView.css';
import PropTypes from 'prop-types';

const Students= [{id: 1, name: 'Ben Hollen'},{id: 2, name: 'Granny Smith'},{id:3, name: 'Banana Smoothie'},{id:4, name:'Timmy Turner'}]

const StudentView = props => {
 console.log(Students)
  return (
    <div className="student">
      {Students.map(player => (
        <div key={player.id} className="Student">
          <h1>{player.name}</h1>
        </div>
      ))}
    </div>
  );
};



StudentView.propTypes = {
  Students: PropTypes.array.isRequired
};

export default StudentView;
