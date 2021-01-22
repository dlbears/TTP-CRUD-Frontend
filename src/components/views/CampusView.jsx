import React from 'react';
import './styles/AllPlayersView.css';
import PropTypes from 'prop-types';

const campuses= [{id: 1, name: 'Brooklyn'},{id: 2, name: 'Queens'},{id:3, name: 'John Jay'},{id:4, name:'Lehman'}]

const CampusView = props => {
 console.log(campuses)
  return (
    <div className="campus">
      {campuses.map(player => (
        <div key={player.id} className="Campus">
          <h1>{player.name}</h1>
        </div>
      ))}
    </div>
  );
};



CampusView.propTypes = {
  campus: PropTypes.array.isRequired
};

export default CampusView;
