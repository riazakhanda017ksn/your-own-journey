import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Destination from './components/Destination/Destination';
import LogIn from './components/LogIn/LogIn';
import { createContext, useState } from 'react';
import PrivateData from './components/PrivateData/PrivateData';
export const UserContext = createContext()
function App() {
  const [loggedInUser,setLoggedInUser]=useState({})
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <Router>
      <Header/>
        <Switch>
          <Route path="/home">
          <Home/>
          </Route>
          <Route path="/logIn">
          <LogIn/>
          </Route>
          <PrivateData path="/cars/:travelTo">
           <Destination/>
          </PrivateData>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
