import { useState } from 'react'
import { 
    useSelector, 
    connect
} from 'react-redux';
import clsx from 'clsx';
import {
    Redirect
  } from "react-router-dom"

// Firebase 
import firebase from 'firebase';

// Thunk
import { checkAuthThunk } from '../../store/thunk/checkAuthThunk'
import { setStateMessageThunk } from '../../store/thunk/setStateMessageThunk'
import { setStateChatsThunk } from '../../store/thunk/setStateChatsThunk'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles({
    paper: {
        padding: '70px 80px'
    }, 
    form: {
        padding: "20px 0 0 0"
    }, 
    field: {
        width: "100%"
    },
    wrapperInput: {
        margin: "0 0 20px 0"
    }, 
    button: {
       width: "200px", 
       height: "52px" 
    }
})

const Login = ({ authUser, setStateMessage, setStateChats }) => {

    const classes = useStyles();

    const auth = useSelector(store => store.profile.profile.isAuthed)

    const [ values, setValues ] = useState({
        amount: '',
        login: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        success: false,
        textSuccess: '',
        error: false, 
        textError: ''
    })

    // chelweb18@gmail.com

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
      };
    
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const authorizeUser = async (event) => {
        event.preventDefault()
        if( !(values.login === '' && values.password === '') ) {

            try {
                let resultAuth = await firebase.auth().signInWithEmailAndPassword( values.login, values.password )

                if( resultAuth.operationType ) {

                    setValues({ 
                        ...values, 
                        login: '', 
                        password: '',
                        success: true, 
                        textSuccess: 'Authorization was successful, now you will be redirected to the main page',
                        error: false, 
                        textError: '',
                    })

                    authUser() // Изменяем состояние на авторизован
                    setStateChats() // Получаем список чатов
                    setStateMessage() // Получаем список сообщений

                }

            } catch(error) {

                setValues({ 
                    ...values, 
                    error: true, 
                    textError: error.message 
                })

            }


        } else {
            setValues({ 
                ...values, 
                error: true, 
                textError: 'You probably did not fill in all the fields, please check. All Login and Password fields must be filled in correctly' 
            })
        }
    }

    const setLogin = (val) => {
        setValues({ ...values, login: val })
    }


    if(auth) {
        return <Redirect to="/" />
    }

    return (
        <Container maxWidth="sm">
            <Paper className={ classes.paper } elevation={3}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Log in to the system
                </Typography>
                <Typography variant="body1" gutterBottom>
                To be able to communicate, enter using your username and password
                </Typography>

                { values.error ? <Alert severity="error">
                    { values.textError }
                </Alert> : false}

                { values.success ? <Alert severity="success">
                    { values.textSuccess }
                </Alert> : false}

                <form className={ classes.form } onSubmit={ (event) => authorizeUser(event) }>
                    <div className={ classes.wrapperInput }>
                        <TextField
                            onInput={(e) => setLogin(e.target.value)}
                            id="outlined-basic" 
                            label="User login E-mail" 
                            placeholder="Login is your email"
                            variant="outlined" 
                            value={values.login}
                            size="medium"
                            className={ classes.field }
                        />
                    </div>
                    <div className={ classes.wrapperInput }>
                    <FormControl className={clsx(classes.margin, classes.textField, classes.field)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            placeholder="Enter your password"
                            onChange={handleChange('password')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    </div>
                    <Button 
                        type="submit"
                        variant="contained" 
                        color="primary"
                        size="large"
                        className={classes.button} 
                        >
                        Login
                    </Button>
                </form>
            </Paper>
        </Container>
        
    )

}

const mapDispatchToProps = (dispatch) => {
    return {
      authUser: () => dispatch(checkAuthThunk()),
      setStateMessage: () => dispatch(setStateMessageThunk()), 
      setStateChats: () => dispatch(setStateChatsThunk())
    }
  }

export default connect(null, mapDispatchToProps)(Login)