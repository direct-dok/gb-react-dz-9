import React from 'react';
import {
  Link
} from "react-router-dom";
import { connect } from 'react-redux';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

// Action Creator
import removeUserAction from '../../store/actionCreators/remove_chats_action'
import removeChatMessages from '../../store/actionCreators/remove_chat_messages_action'

// Selectors 
import { getChats } from '../../store/selectors/getChats'
import { getMessage } from '../../store/selectors/getMessage'

const useStyles = makeStyles({
  list: {
    display: 'flex', 
    flexWrap: 'wrap'
  }, 
  listItem: {
    flexWrap: 'wrap', 
    width: 'calc(33.333% - 40px)', 
    minWidth: '300px',
    margin: '20px', 
    padding: '25px'
  }, 
  link: {
    fontFamily: '\'Roboto\', sans-serif',
    fontSize: '.7em', 
    textTransform: 'uppercase', 
    textDecoration: 'none', 
    textAlign: 'center', 
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    width: '140px', 
    height: '33px', 
    borderRadius: '10px',
    background: '#490b52',
  }, 
  deleteButton: {
    margin: '0 0 0 10px'
  }
})


function ChatList({chats, messages, removeChat, removeMessages}) {

  const classes = useStyles()

  const deleteOneChat = (id) => {
    removeChat(id)

    let copyObj = Object.assign({}, messages)
    delete copyObj[id]
    removeMessages(copyObj)
  }

  return (
    <List className={classes.list}>
    { chats.map(({id, name, avatar, message}) => (
      <React.Fragment key={id}>
        <ListItem className={classes.listItem} button>
        <ListItemAvatar>
            <Avatar alt="Profile Picture" src={avatar} />
          </ListItemAvatar>
          <ListItemText primary={name} secondary={message} />
          <Link to={`/chats/${id}`} className={classes.link}>
            Go to chat
          </Link>
            <IconButton aria-label="delete" className={classes.deleteButton} onClick={() => deleteOneChat(id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
        </ListItem>
      </React.Fragment>
    )) }
  </List>
  )

}

const mapStateToProps = (store) => {
  return {
    chats: getChats(store), 
    messages: getMessage(store)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeChat: (payload) => dispatch(removeUserAction(payload)), 
    removeMessages: (payload) => dispatch(removeChatMessages(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)