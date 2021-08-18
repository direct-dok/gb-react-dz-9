import { React } from 'react'
import { connect } from 'react-redux'

import firebase from 'firebase'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'


// My Components 
import ChatList from '../ChatList'
import AddChat from '../AddChat'

// Action Creator 
import { addNewChat } from '../../store/actionCreators/add_chats_action'
import { addNewChatMessages } from '../../store/actionCreators/add_new_chat_messages_action'

// Thunk
import { addNewChatThunk } from '../../store/thunk/addNewChatThunk'

// Selectors 
import { getChats } from '../../store/selectors/getChats'
import { getMessage } from '../../store/selectors/getMessage'

const useStyles = makeStyles({
  caption: {
    fontSize: '4em',
    lineHeight: '1em', 
    margin: '0 0 30px 0'
  }, 
  chatContainer: {
    marginTop: '60px'
  }, 
  addButton: {
    position: 'fixed', 
    right: '50px', 
    bottom: '50px', 
    background: '#80167a',

    '&:hover': {
      background: '#4d0549'
    }
  }
})

const Home = ({chats, messages, addChat, addChatMessages}) => {

  // firebase.database().ref("chats").child(21).set({})
  // firebase.database().ref("messages").child(21).set({})

  console.log(chats)

  const classes = useStyles()

  const addChats = (name, status, message) => {

    const chatId = chats[chats.length - 1].id + 1

    const obj = {
      id: chatId, 
      status: status, 
      name: name, 
      avatar: '/img/avatar/default-avatar.png', 
      message: message
    }

    const payload = {obj, chatId, name}

    console.log(payload)


    // console.log('chats[chats.length - 1].id + 1', chats[chats.length - 1].id + 1)

    addChat(payload)
    // addChatMessages(chats[chats.length - 1].id + 1)
    
  }

  return (
    <>
      <Container maxWidth="sm">
        <Typography component="h1" className={classes.caption}>
        Comfortable. Safely. Reliable.
        </Typography>
        <Typography variant="body1">
          On our social network, you will get a fast, easy and secure messaging experience and the ability to make calls completely free of charge *. Available on phones around the world.
        </Typography>
      </Container>

      <Container maxWidth="lg" className={classes.chatContainer}>

        <ChatList chats={chats} />

      </Container>
      <AddChat addChat={addChats} />

    </>
  );
}

const mapStateToProps = (store) => {
  return {
    chats: getChats(store), 
    messages: getMessage(store)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addChat: (payload) => dispatch(addNewChatThunk(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)