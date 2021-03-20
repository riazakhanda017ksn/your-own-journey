import React, { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faCarAlt, faCoffee } from '@fortawesome/free-solid-svg-icons'
import {UserContext} from '../../App'
const Header = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext)
    return (
        <div >
            <div>
            <Navbar variant="dark">
                <Navbar.Brand href="#home"><span className="car"><FontAwesomeIcon icon={faCarAlt} /></span>
                    <small className="ml-3 font-weight-bold">Your Own Rider</small></Navbar.Brand>
                <Nav className="ml-auto pr-3">
                    <ul className='navBar-edit'>
                        <li>
                            <Link to='/home'>Home</Link>
                        </li>
                        <li>
                            <Link to='/logIn'>Destination</Link>
                        </li>
                        <li>
                            <Link to='/logIn'>Blog</Link>
                        </li>
                        <li>
                            <Link to='/logIn'>Contact</Link>
                        </li>
                        <li>
                            <Link to='/logIn'>Sing In</Link>
                        </li>
                        <li>
                            <Link to='/logIn'><button onClick={()=>setLoggedInUser({})}>Log Out</button> </Link>
                        </li>
                        <li className='userName'> <p>{loggedInUser.name} </p>  </li>
                    </ul>
                </Nav>
            </Navbar>
            </div>
           
        </div>
    );
};

export default Header;