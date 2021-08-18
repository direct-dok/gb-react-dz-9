import { React } from 'react';
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

const App = ( {isAuthed, logOutUser} ) => {

  const classes = useStyles()

  const logOut = (e) => {
    e.preventDefault()

    logOutUser(false)
    firebase.auth().signOut()

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
    logOutUser: (payload) => dispatch(isAuthProfileAction(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)