import { useState } from 'react'
import clsx from 'clsx'

// Firebase 
import firebase from 'firebase'

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

const Registration = () => {

    const classes = useStyles();

    const [ values, setValues ] = useState({
        amount: '',
        login: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        error: false, 
        textError: '', 
        success: false, 
        textSuccess: ''
    })

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
            console.log('authorizeUser', values.login, values.password)

            try {

                let resultRegistration = await firebase.auth().createUserWithEmailAndPassword( values.login, values.password )
                if(resultRegistration.operationType) {

                    setValues({ 
                        ...values, 
                        login: '',
                        password: '',
                        success: true, 
                        textSuccess: 'Registration completed successfully. Now you can enter the system using your username and password',
                        error: false, 
                        textError: '',
                    })

                    setTimeout( () => {
                        setValues({ 
                            ...values, 
                            login: '',
                            password: '',
                            sucess: false, 
                            textSuccess: '', 
                            error: false, 
                            textError: '', 
                        })

                    }, 3000 )

                }

            } catch(error) {
                console.log(error.message)
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

    return (
        <Container maxWidth="sm">
            <Paper className={ classes.paper } elevation={3}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Register in our messenger
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Registration will allow you to communicate with your friends and provide many other opportunities
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
                            label="Enter your email" 
                            placeholder="Your email will be your login"
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
                        Register now
                    </Button>
                </form>
            </Paper>
        </Container>
    )

}

export default Registration