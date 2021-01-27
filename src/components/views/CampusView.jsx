import React, {Component, useState} from 'react';
import './styles/CampusView.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

//const campuses= [{id: 1, name: 'Brooklyn'},{id: 2, name: 'Queens'},{id:3, name: 'John Jay'},{id:4, name:'Lehman'}]

const FormView = ({ onSubmit, formRef }) => {
  const [{ name, address }, setForm] = useState({ name: '', address: ''})
  console.log(name)
  return (<form onSubmit={e => {e.preventDefault(); console.log("CAMPUS_SUBMIT: ", name, address);  onSubmit(name, address)}} ref={formRef}>
    <label for='Name'>Name:</label>
    <input type= 'text' id='Name' name='Name' value={name} onChange={e => setForm({ name: e.target.value, address })} required/><br></br>
    <label for='Address'>Address:</label>
    <input type= 'text' id='Address' name='Address' value={address} onChange={e => setForm({ address: e.target.value, name })} required/><br></br>
  </form>)
}


class CampusView extends Component {
  constructor(props){
    super(props)
    this.state={button:true}
  }

  render() {
  console.log("CampusView ", this.props.isEditing)
    return (
      <div className="wrapper">
        <div className="campus">
          {this.props.campuses.map(({ id, name }) => (

            <div key={id} className="Campus">
              <Link to={`/campuses/${id}`}>
                <h1 className='campustext'>{name}</h1>
              </Link>
              <div className='buttonspace'>
                <button onClick={() => this.props.onDelete(id)} type='button' className="Button">Delete</button>
              </div>
            </div>

          ))}
        </div>
        {
          this.props.campuses.length === 0 && (
            <div className='noCampus'>
              <p>There are no campuses to view.<br/>
              Click "Add" to add a campus</p>
            </div>
          )
        }
      
        {this.props.isEditing && <FormView onSubmit={this.props.onSubmit} formRef={this.props.formRef} />}
        
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
export default CampusView;
