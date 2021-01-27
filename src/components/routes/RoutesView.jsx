import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CampusesContainer, StudentsContainer } from '../containers';
import { withComboBar } from '../views/Nav'

const styles = {
  fontFamily: 'Helvetica',
  fontSize: '40px',
  borderRadius: '10px',
  border: '10px ridge aqua',
  color:'black',
  backgroundColor: 'blanchedalmond',
  overflow: 'auto',
  margin: '5%',
  padding: '5%'
  //flexGrow: 1,
  /*text-align: left;*/

  //height: 'fit-content'
}

const P404 = ({ 
  location: { 
    state: { 
      type, id   
    } = { type: false, id: ""}
  }
}) => (
  <div style={styles}>
    <h1>404 Error: { type && `${type} of ${id} ` }Not Found</h1>
  </div>
)

const P400 = ({ 
  location: { 
    state: { type, id } 
  }  
}) => (
  <div style={styles}>
    <h1>400 Error: Malformed Request "{id}" in "{type}/{id}" is not a valid ID</h1>
  </div>
)

const Home = () => (<div style={styles}> Welcome to the CRUD app homepage, to modify students or campuses click on the text in the nav bar above</div>)

const RoutesView = () => {
  return (
    <Switch>
      <Route exact path="/" component={withComboBar(Home)} />
      <Route exact path={["/campuses", "/campuses/:id"]} component={withComboBar(CampusesContainer)} />
      <Route exact path={["/students", "/students/:id"]} component={withComboBar(StudentsContainer)} />
      <Route exact strict path="/400" component={withComboBar(P400)} />
      <Route path="*" component={withComboBar(P404)} />
    </Switch>
  )
}

export default RoutesView;
