import React, {Component, useState} from 'react';
import './styles/StudentView.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const FormView = ({ onSubmit, formRef }) => {
  const [{ firstname, lastname, email }, setForm] = useState({ firstname: '', lastname: '', email: ''})
  //console.log(name)
  return (<form onSubmit={e => {e.preventDefault(); console.log("STUDENT_SUBMIT: ", firstname, lastname, email);  onSubmit(firstname, lastname, email)}} ref={formRef}>
    <label for='Namef'>First Name:</label>
    <input type= 'text' id='Namef' name='Namef' value={firstname} onChange={e => setForm({ firstname: e.target.value, lastname, email })} required/><br></br>
    <label for='Namel'>Last Name:</label>
    <input type='text' id='Namel' name='Namel' value={lastname} onChange={e => setForm({ firstname, lastname: e.target.value, email })} required/><br></br>
    <label for='Email'>Email:</label>
    <input type= 'email' id='Email' name='Email' value={email} onChange={e => setForm({ firstname, lastname, email: e.target.value })} required/><br></br>
  </form>)
}


//const Students= [{id: 1, name: 'Ben Hollen'},{id: 2, name: 'Granny Smith'},{id:3, name: 'Banana Smoothie'},{id:4, name:'Timmy Turner'}]
class StudentView extends Component {
    constructor(props){
        super(props)
        this.state={button: true}
    }
render(){
 //console.log(Students)
 //console.log(this.state.button)
  return (
    <div className="wrapper">
    <div className="student">
      {this.props.students.map(({ id, firstname, lastname }) => (
        <div key={id} className="Student">
          <Link to={`/students/${id}`}>
            <div className='studenttext'><h1>{`${firstname} ${lastname}`}</h1></div>
          </Link>
          <div onClick={() => this.props.onDelete(id)} className='bs4'>
            <button type='button' class="Button">Delete</button>
          </div>
        </div>
      ))}
      </div>
      { 
        this.props.students.length === 0 && (
          <div className='noStudent'>
              <p>There are no students to view.<br/>
              Click "Add" to add a student</p>
          </div>
        )
      }
      {
        this.props.isEditing && <FormView onSubmit={this.props.onSubmit} formRef={this.props.formRef} />
      }
    
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
