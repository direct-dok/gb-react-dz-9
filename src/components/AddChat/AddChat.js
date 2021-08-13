import React, { useState } from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// My Components


const useStyles = makeStyles({
  addButton: {
    position: 'fixed', 
    right: '50px', 
    bottom: '50px', 
    background: '#80167a',

    '&:hover': {
      background: '#4d0549'
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBlock: {
    
  }, 
  paper: {
    width: '400px',
    backgroundColor: '#fff',
    padding: '30px',
  }, 
  field: {
    width: '100%'
  }
})

const AddChat = (props) => {

  const classes = useStyles()

  
  // console.log('addChat - ', props.addChat())
  


  const [open, setOpen] = useState(false)
  const [ name, setName ] = useState('')
  const [ status, setStatus ] = useState('')
  const [ message, setMessage ] = useState('')

  const addChat = (e) => {
    e.preventDefault()
    props.addChat(name, status, message)
    setName('')
    setStatus('')
    setMessage('')
    handleClose()
  }

  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };
  
 return (
  <>
  <Tooltip title="Add chat" aria-label="add">
   <Fab className={classes.addButton} color="primary" aria-label="add" onClick={handleOpen}>
      <AddIcon />
    </Fab>
  </Tooltip>

  <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} className={classes.modalBlock}>
          <div>
            
            <form className={classes.paper} onSubmit={ addChat }>
              <Box component="div" m={2}>
                <Typography variant="h4" component="h3">Add chat</Typography>
              </Box>
              <Box component="div" m={2}>
                <TextField 
                  value={name} 
                  onInput={(e) => setName(e.target.value)} 
                  className={classes.field} 
                  id="outlined-basic" 
                  label="Name" 
                  variant="outlined" 
                />
              </Box>

              <Box component="div" m={2}>
                <TextField
                  value={status} 
                  onInput={(e) => setStatus(e.target.value)} 
                  className={classes.field} 
                  id="outlined-textarea"
                  label="Status"
                  placeholder="Placeholder"
                  multiline
                  variant="outlined"
                  rows={4}
                />
              </Box>

              <Box component="div" m={2}>
                <TextField
                  value={message}
                  onInput={(e) => setMessage(e.target.value)} 
                  className={classes.field} 
                  id="outlined-textarea"
                  label="Message"
                  placeholder="Placeholder"
                  multiline
                  variant="outlined"
                  rows={4}
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
          </div>
        </Fade>
      </Modal>
    </div>
  </>
 )
}

export default AddChat
