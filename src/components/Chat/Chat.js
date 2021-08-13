import React, { useState, useEffect, useRef } from 'react';
import {
  useParams, 
  Redirect
} from "react-router-dom"
import { connect } from 'react-redux'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

// My Components
import Message from '../Message'
import ChatList from '../ChatList'

// Selectors
import { getChats } from '../../store/selectors/getChats'
import { getMessage } from '../../store/selectors/getMessage'

// Thunk 
import { addRobotMessageThunkCreator } from '../../store/thunk/addRobotMessageThunk'
import { addNewMessageThunk } from '../../store/thunk/addNewMessageThunk'



const useStyles = makeStyles({
  field: { 
    width: '100%'
  }, 
  chatContainer: {
    width: '100%',
    minHeight: '400px'
  },
  mainCaption: {
    fontWeight: 900, 
    fontSize: '2.7em', 
    lineHeight: '1em', 
    margin: '0 0 1em 0'
  }, 
  container: {
    padding: '1em 0 0 0'
  }, 
  chatListCaption: {
    fontWeight: '900', 
    color: '#b8b8b8'
  }, 
  userInfo: {
    margin: '0 0 20px 0', 
    padding: '15px'
  }, 
  userName: {
    fontWeight: 700, 
    color: '#bfbfbf', 
    margin: '0 0 10px 0'
  }, 
  large: {
    width: '60px', 
    height: '60px',
    background: '#fff'
  }, 
  button: {
    fontSize: '.8em', 
    width: '140px', 
    height: '44px', 
    background: '#490b52',
      "&:hover": {
        background: '#731a80', 
        transition: '.3s'
      }
  }, 
  chatListBlock: {
    height: '100vh', 
    overflow: 'auto'
  }, 
  chatBlock: {
    padding: '0 0 0 30px'
  }
})

const Chat = ({chats, chatMessages, addMessage, addMessageRobot}) => {

  
  
  let { id } = useParams()
  const classes = useStyles()

  const [authorList, setAuthorList] = useState([])
  const [user, setUser] = useState({})
  const [messageFied, setMessageField] = useState('')
  const [authorField, setAuthorField] = useState('')

  const inputRef = useRef()

  useEffect(() => {
    const currnetUser = chats.filter(elem => elem.id == id)
    setUser(currnetUser[0])
  }, [id])

  /////////////////////////

  // console.log(user)

  // Object.keys(chatMessages[id]).forEach(el => console.log(chatMessages[id][el]))
  // chatMessages[id]

  // console.log(Object.keys(user).length)
  // console.log(user.id)

  // const obj = {
  //   1: {
  //     m1: {
  //       name: "Alex", 
  //       message: "this tutorial is exactly what i need and always searched for, finally after years of googling MVC there is a solid tutorial, thank you.", 
  //       date: "1628830555"
  //     }, 
  //     m2: {
  //       name: "Alex", 
  //       message: "It is such an awesome series, you will learn many things on the way. This series will start your intermediate phase from beginners. ", 
  //       date: "1628830555"
  //     }, 
  //     m3: {
  //       name: "Alex", 
  //       message: "The code quality is awesome. From last year I did a couple of MVC frameworks but none is comparable to this series.", 
  //       date: "1628830555"
  //     },
  //   }, 
  //   2: {
  //     m1: {
  //       name: "Noah", 
  //       message: "This is excellent! Programming is a hands-on experience. By building your own mini MVC framework you get to grasp how larger frameworks", 
  //       date: "1628830555"
  //     }, 
  //     m2: {
  //       name: "Noah", 
  //       message: "Thanks a lot for this very good video!", 
  //       date: "1628830555"
  //     }, 
  //   },
  // }

  // const obj2 = { ...obj, 1: {...obj[1], 'm4': {name: 'Alex', message: 'messages', date: '2423415515'}} }

  // console.log(obj2);

  //////////////////////////

  useEffect(() => {

    if(authorList.length) {
      const idMessage = `m${Object.keys(chatMessages[id]).length + 1}`
      const obj = {...chatMessages[id], [idMessage]: {name: user.name, message: 'Hi i am a robot i always answer. You can ask me what you want', date: Date.now() / 1000, sender: 'robot'}}
      const objPayload = {obj, id, idMessage}
      addMessageRobot(objPayload)
    }

  }, [authorList])



  const getDataForm = (e) => {
    e.preventDefault()

    if(authorField.length > 0 && messageFied.length > 0) {

      setAuthorList((oldArray) => [...oldArray, authorField])

      const idMessage = `m${Object.keys(chatMessages[id]).length + 1}`

      const obj = {...chatMessages[id], [idMessage]: {name: authorField, message: messageFied, date: Date.now() / 1000, sender: 'user'}}
      const objPayload = {obj, id, idMessage}

      addMessage(objPayload)

      setAuthorField('')
      setMessageField('')

    }

    inputRef.current.focus()
  }

  return (
    <React.Fragment>
      { user ? 
      
      <Container maxWidth="md">
        <Grid container >
        <Grid item xs={5} className={classes.chatListBlock}>
          <ChatList chats={chats} />
        </Grid>

        <Grid item xs={7} className={classes.chatBlock}>
          <Paper className={classes.userInfo}>
            <Typography className={classes.userName}>Chat with, {user.name}</Typography>
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <Avatar src={user.avatar} alt={user.name} className={classes.large} />
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body2" color="textSecondary">{user.status}</Typography>
              </Grid>
            </Grid>
          </Paper>

          <div className={classes.chatContainer}>

              { Object.keys(chatMessages[id]).map((el, index) => {                
                return <Message message={chatMessages[id][el]} user={user} key={index} />
              }) }

          </div>
          <form className="form-send" onSubmit={ getDataForm }>
            <Box component="div" m={2}>
              
              <TextField 
                onInput={(e) => setAuthorField(e.target.value)}
                id="outlined-basic" 
                label="Имя" 
                placeholder="Укажите ваше имя"
                variant="outlined" 
                value={authorField}
                size="small"
                className={classes.field}
                inputRef={inputRef}
                />
            </Box>
            
            <Box component="div" m={2}>
              <TextField
                onInput={(e) => setMessageField(e.target.value)}
                id="outlined-multiline-static"
                label="Сообщение"
                placeholder="Введите ваше собщение"
                multiline
                rows={4}
                variant="outlined"
                value={messageFied}
                className={classes.field}
              />
            </Box>
            <Box component="div" m={2}>
            <Button 
              type="submit"
              variant="contained" 
              color="primary"
              size="large"
              className={classes.button} 
            >
              Отправить
            </Button>
            </Box>
          </form>
          </Grid>
        </Grid>
      </Container> 
      
      : <Redirect to="/error-404" /> }
    </React.Fragment>
  );
}

const mapStateToProps = (store) => {
  return {
    chats: getChats(store), 
    chatMessages: getMessage(store)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (payload) => dispatch(addNewMessageThunk(payload)), 
    addMessageRobot: (chatMessages, id) => dispatch(addRobotMessageThunkCreator(chatMessages, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)