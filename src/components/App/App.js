import { React, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { connect } from 'react-redux';

// Firebase 
import firebase from 'firebase';

// Components
import Home from '../Home'
import Profile from '../Profile'
import Error from '../Error'
import Chat from '../Chat'
import News from '../News'
import Login from '../Login'
import Registration from '../Registration'
import PrivateRoute from '../PrivateRoute'

// Selectors
import { getProfile } from '../../store/selectors/getProfile'

// Action creators
import isAuthProfileAction from '../../store/actionCreators/is_auth_profile_action'

// Thunk
import { checkAuthThunk } from '../../store/thunk/checkAuthThunk'
import { setStateMessageThunk } from '../../store/thunk/setStateMessageThunk'
import { setStateChatsThunk } from '../../store/thunk/setStateChatsThunk'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'


const useStyles = makeStyles({
  bar: {
    background: '#8e3e96'
  }, 
  toobar: {
    display: 'flex', 
    justifyContent: 'space-between'
  },
  listNav: {
    display: 'flex', 
    alignItems: 'center'
  }, 
  link: {
    color: '#ffffff', 
    textTransform: 'uppercase', 
    textDecoration: 'none', 
    fontFamily: "'Roboto', sans-serif",
    fontSize: '.9em'
  }, 
  main: {
    marginTop: '100px'
  }, 
  
});

const App = ( {isAuthed, logOutUser, authUser, setStateMessage, setStateChats} ) => {

  const classes = useStyles()

  useEffect(() => {

    setStateChats()
    setStateMessage()

    // firebase.database().ref("chats").on("value", (snapshot) => {
    //   console.log('firebase.database().ref')
    //   const messages = [];
    //   snapshot.forEach((snap) => {
    //     messages.push(snap.val());
    //   });
    
    //   console.log(snapshot.key, messages);
    // });
          
    // firebase.database().ref("messages").on("value", (snapshot) => {
    //   console.log('firebase.database().ref')
    //   const messages = {};
    //   let index = 1;

    //   snapshot.forEach((snap) => {
    //     messages[index++] = snap.val();
    //     console.log(snap.val())
    //     // messages.push(snap.val());
    //   });

    //   console.log(snapshot.key, messages);

    //   });

    authUser()
    // firebase.auth().onAuthStateChanged((user) => {
    //   console.log('firebase.auth()')
    //     if(user) {
    //       logOutUser(true)

    //       // firebase.database().ref("chats").on("value", (snapshot) => {
    //       //   console.log('firebase.database().ref')
    //       //   const messages = [];
    //       //   snapshot.forEach((snap) => {
    //       //     messages.push(snap.val());
    //       //   });
          
    //       //   console.log(snapshot.key, messages);
    //       // });
          
    //       firebase.database().ref("messages").on("value", (snapshot) => {
    //         console.log('firebase.database().ref')
    //         const messages = {};
    //         let index = 1;

    //         snapshot.forEach((snap) => {
    //           messages[index++] = snap.val();
    //           console.log(snap.val())
    //           // messages.push(snap.val());
    //         });
          
    //         console.log(snapshot.key, messages);
    //       });

    //       // firebase.database().ref("messages").child(1).child('m4').set(
    //       //     {
    //       //         name: "Ethan", 
    //       //         message: "I will see this video later. Now I have php course to study", 
    //       //         date: "1628830555",
    //       //         sender: "robot"
    //       //       }
    //       //   )

    //       // firebase.database().ref("messages").child(1).child('m4').push(
    //       //   {
    //       //       name: "Ethan", 
    //       //       message: "I will see this video later. Now I have php course to study", 
    //       //       date: "1628830555",
    //       //       sender: "robot"
    //       //     }
    //       // )

    //       // firebase.database().ref("messages").child(1).push({
    //       //   name: "Ethan", 
    //       //   message: "I will see this video later. Now I have php course to study", 
    //       //   date: "1628830555",
    //       //   sender: "robot"
    //       // })
    //       // firebase.database().ref().child('messages').push().key;
          
    //     }
    // })

    
    
  }, [])

  const logOut = (e) => {
    e.preventDefault()

    logOutUser(false)
    firebase.auth().signOut()
    // .then(() => {
    //   // Sign-out successful.
    // }).catch((error) => {
    //   // An error happened.
    // });
  }

  return (
    <Router>

      <AppBar className={classes.bar}>

        <Toolbar className={classes.toobar}>
          <Typography variant="h6">Chat with your friends</Typography>
          <List className={classes.listNav}>
            
            { isAuthed.isAuthed ? <ListItem>
              <Link className={classes.link} to="/">Home</Link>
            </ListItem> : false }

            { isAuthed.isAuthed ? <ListItem>
              <Link className={classes.link} to="/profile">Profile</Link>
            </ListItem> : false }

            <ListItem>
              <Link className={classes.link} to="/news">News</Link>
            </ListItem>

            { !isAuthed.isAuthed ? <ListItem>
              <Link className={classes.link} to="/login">Login</Link>
            </ListItem> : false }
            
            { !isAuthed.isAuthed ? <ListItem>
              <Link className={classes.link} to="/registration">Registration</Link>
            </ListItem> : false }

            { isAuthed.isAuthed ? <ListItem>
              <a 
                href="/" 
                className={classes.link}
                onClick={ (e) => logOut(e) }
                >Logout</a>
            </ListItem> : false }

          </List>
        </Toolbar>

      </AppBar>

      

      <main className={classes.main}>

      <Switch>
          <PrivateRoute exact path="/" component={ Home } />
          <PrivateRoute path="/profile" component={ Profile } />
          <PrivateRoute path="/chats/:id" component={ Chat } />
          <Route path="/news" component={ News } />
          <Route path="/login" component={ Login } />
          <Route path="/registration" component={ Registration } />
          <Route path="/error-404" component={ Error } />
          <Route component={ Error } />
        </Switch>
        
      </main>

    </Router>
  );
}

const mapStateToProps = (store) => {
  return {
      isAuthed: getProfile(store)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: (payload) => dispatch(isAuthProfileAction(payload)),
    authUser: () => dispatch(checkAuthThunk()),
    setStateMessage: () => dispatch(setStateMessageThunk()), 
    setStateChats: () => dispatch(setStateChatsThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)