import React, {Component} from 'react';
import './styles/AllPlayersView.css';
import PropTypes from 'prop-types';

const campuses= [{id: 1, name: 'Brooklyn'},{id: 2, name: 'Queens'},{id:3, name: 'John Jay'},{id:4, name:'Lehman'}]

class CampusView extends Component {
constructor(props){
  super(props)
  this.state={button:true}
}
render(){
 console.log(campuses)
  return (
    <div className="campus">
      {campuses.map(player => (
        <div>
        <div key={player.id} className="Campus">
          <div className='campustext'><h1>{player.name}</h1></div>
        <div className='buttonspace'>
        <button type='button' class="Button">Delete</button>
        </div>
        </div>
        
        </div>
      ))}
      <div className='noCampus'>
          <p>There are no campuses to view.<br/>
          Click "Add Campus" to add a campus</p>
      </div>
      <div className='bs2'>
        
        <div className='bs3' style={{display:(this.state.button ? 'block':'none')}}>
      <button type='button' class="Button2" onClick={this.handleChange}>Add Campus</button>
      </div>
      <div style={{display:(this.state.button ? 'none':'block')}}>
       <form>
         <label for='Name'>Name:</label>
         <input type= 'text' id='Name' name='Name' value=''/><br></br>
         <label for='Address'>Address:</label>
         <input type= 'text' id='Address' name='Address' value=''/><br></br>
         <input type= 'submit' class="Button" value="Submit" onSubmit={this.handleChange}/>
       </form>
      </div>
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
export default CampusView;
