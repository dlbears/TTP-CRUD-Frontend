import React, {Component} from 'react';
import './styles/AllPlayersView.css';
import PropTypes from 'prop-types';

const Students= [{id: 1, name: 'Ben Hollen'},{id: 2, name: 'Granny Smith'},{id:3, name: 'Banana Smoothie'},{id:4, name:'Timmy Turner'}]
class StudentView extends Component {
    constructor(props){
        super(props)
        this.state={button: true}
    }
render(){
 console.log(Students)
 console.log(this.state.button)
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
        <div className='bs6' style={{display:(this.state.button ? 'block':'none')}}>
      <button type='button' class="Button2" onClick={this.handleChange}>Add Student</button>
      </div>
      <div style={{display:(this.state.button ? 'none':'block')}}className='StudentForm'>
       <form>
         <label for='Namef'>First Name:</label>
         <input type= 'text' id='Namef' name='Namef' value=''/><br></br>
         <label for='Namel'>Last Name:</label>
         <input type='text' id='Namel' name='Namel' value=''/><br></br>
         <label for='Email'>Email:</label>
         <input type= 'text' id='Email' name='Email' value=''/><br></br>
         <input type= 'submit' class="Button" value="Submit" onSubmit={this.handleChange}/>
       </form>
      </div>
      {console.log(this.state.button)}
      </div>
    </div>
  );
};

 handleChange=(event)=>{
    if(this.state.button===true)
    this.setState({button:false})
    else
    this.setState({button:true})
}


}
export default StudentView;
