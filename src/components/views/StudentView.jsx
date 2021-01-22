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
          <div className='studenttext'><h1>{player.name}</h1></div>
          <div className='bs4'>
         <button type='button' class="Button">Delete</button>
        </div>
        </div>
      ))}
      <div className='noStudent'>
          <p>There are no students to view.<br/>
          Click "Add Student" to add a student</p>
      </div>
      <div className='bs5'>
        <div className='bs6'>
      <button type='button' class="Button2">Add Student</button>
      </div>
       {//<form>
         //<label for='Namef'>First Name:</label>
         //<input type= 'text' id='Namef' name='Namef' value=''/><br></br>
         //<label for='Namel'>Last Name:</label>
         //<input type='text' id='Namel' name='Namel' value=''/><br></br>
         //<label for='Email'>Email:</label>
         //<input type= 'text' id='Email' name='Email' value=''/><br></br>
         //<input type= 'submit' class="Button" value="Submit"/>
       //</form>
}
      </div>
    </div>
  );
};



StudentView.propTypes = {
  Students: PropTypes.array.isRequired
};

export default StudentView;
