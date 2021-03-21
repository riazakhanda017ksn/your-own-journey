import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import './LogIn.css'
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { useAccordionToggle } from 'react-bootstrap';

const LogIn = () => {
    const history=useHistory();
    const location=useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password:'',
        photo: '',
        error: '',
        errors:'',
        success: false,
        newUser: false
      });
      const [loggedInUser,setLoggedInUser]=useContext(UserContext)


      const [loggedUser, setLoggedUser] = useState({})
      const [newUser, setNewUser] = useState(false)
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      } else {
        firebase.app(); // if already initialized, use that one
      }
     
      const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            const user = result.user;
            setUser(user)
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email} 
            setLoggedInUser(signedInUser);
            history.replace(from);

            // ...
          }).catch(function(error) {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
    }
    
      const fbProvider = new firebase.auth.FacebookAuthProvider();
      const facebookHandlerBtn = () => {
        firebase
          .auth()
          .signInWithPopup(fbProvider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            var user = result.user;
            var accessToken = credential.accessToken;
            setLoggedUser(user)
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email} 
            setLoggedInUser(signedInUser);
            history.replace(from);
            console.log(user);
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorCode, errorMessage, email, credential);
          });
      }
      const gitHubProvider = new firebase.auth.GithubAuthProvider();
      const githubHandlerBtn = () => {
        firebase
          .auth()
          .signInWithPopup(gitHubProvider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
            setLoggedUser(user)
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email} 
            setLoggedInUser(signedInUser);
            history.replace(from);
            console.log(user);
    
          }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorCode, errorMessage, email, credential);
          });
    
      }
    
      //form input submit section ->/
      const handleChange = (event) => {
        let isFormValid = true
        if (event.target.name === 'email') {
          isFormValid = /\S+@\S+\.\S+/.test(event.target.value)
        }
        if (event.target.name === 'password') {
            isFormValid  = /\d{1}/.test(event.target.value)
        }
        if (event.target.name === 'password') {
            isFormValid  = /\d{1}/.test(event.target.value)
        }
        if (isFormValid) {
          const newUserInfo = { ...user };
          newUserInfo[event.target.name] = event.target.value
          setUser(newUserInfo)
    
        }
    
      }
    
      ///form submit area --
      const handleSubmit = (e) => {
        
        if (newUser && user.email && user.password) {
            if(user.password  !==user.confirm_password){
                const newUserInfo={...user}
                newUserInfo.error='Password Was Wrong ! Please Apply the Password Again'
            }else{       firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                  const newUserInfo = { ...user }
                  newUserInfo.error = '';
                  newUserInfo.success = true;
                  console.log(newUserInfo.success);
                  setUser(newUserInfo)
                  console.log(res);
                  updateUserName(user.name)
                  
        
                })
                
                .catch(error => {
        
                  const newUserInfo = { ...user }
                  newUserInfo.error = error.message;
                  newUserInfo.success = false;
                  setUser(newUserInfo)
                });}
        }
        




        if (!newUser && user.email && user.password) {
          firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
              const newUserInfo = { ...user }
              newUserInfo.error = '';
              newUserInfo.success = true;
              console.log(newUserInfo.success);
              setUser(newUserInfo);
              setLoggedInUser(newUserInfo);
              history.replace(from);
              console.log(res);
              console.log(newUserInfo);
             
    
    
            })
            .catch(error => {
    
              const newUserInfo = { ...user }
              newUserInfo.error = error.message;
              newUserInfo.success = false;
              setUser(newUserInfo)
            });
        }
    
        e.preventDefault()
      }
    
      const updateUserName = name => {
        var user = firebase.auth().currentUser;
    
        user.updateProfile({
          displayName: name,
        }).then(function () {
          console.log('username updated successFully');
        }).catch(function (error) {
          console.log(error);
        });
      }
    
      return (
        <div>
          <div className="container mt-5">
            <div className="row   mt-5">
              <div className="col-lg-12 mt-5">
                <div className="row">
                  <div className="col-lg-3"></div>
                  <div className="col-lg-6">
                    <div className="form-section mt-5 ml-auto">
                      <h3 className="mt-3 mb-5">{ newUser ? 'Create an account' : 'Log In '}</h3>
                      <form onSubmit={handleSubmit} >
                        {newUser && <input type="text" onBlur={handleChange} placeholder='Your Name' className="form-control extra-edit" name="name" id="" />} <br />
                        <input type="email" onBlur={handleChange} placeholder='Your email' className="form-control extra-edit" name="email" id="" required /> <br />
                        <input type="password" onBlur={handleChange} placeholder='Your password' className="form-control extra-edit" name="password" id="" required /> <br />
                        {newUser && <input type="password" onBlur={handleChange} placeholder='Confirm Your password' className="form-control extra-edit" name="confirm_password" id="" required />}<br />
                        <input type="submit" className="form-control extra-btn" value={newUser ? 'Sing Up' : 'Sing In'} />
                        <div className="text-center something">
                          <label htmlFor="newUser">{newUser ? 'Have an Account ?' : "Don't Have an Account ?"} </label> 
                        
                          <button onClick={() => setNewUser(!newUser)} name="newUser">{newUser ? 'Log In' : 'Create An Account'}</button>
                        </div>
                        <div className="button-stylish">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="logIn-button mt-3">
                                <button className='mr-auto' onClick={handleGoogleSignIn }> <span> <FontAwesomeIcon icon={faGoogle}/></span> Continue with Google</button>
                            </div>
                            <div className="logIn-button mt-3">
                                <button className='mr-auto' onClick={facebookHandlerBtn}> <span className='facebook'> <FontAwesomeIcon icon={faFacebook}/></span> Continue with facebook</button>
                            </div>
                            <div className="logIn-button mt-3">
                                <button className='mr-auto' onClick={githubHandlerBtn}> <span className='github'> <FontAwesomeIcon icon={faGithub}/></span> Continue with Github Account</button>
                            </div>
    
                          </div>
                        </div>
                        </div>
                        <p className="mt-2 text-warning">{user.error}</p>
    
                        {
                          user.success && <p className='text-warning text-center'>User {newUser ? 'Created ' : 'Logged '} Successful </p>}
    
                      </form>
    
                    </div>
                  </div>
                  <div className="col-lg-3"></div>
                </div>
    
              </div>
            </div>
          </div>
        </div>
      );
    }



export default LogIn;