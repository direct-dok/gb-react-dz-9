import { makeStyles } from '@material-ui/core/styles'

// Material UI
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    messageUser: {
        background: '#bd80c3', 
        color: '#fff', 
        margin: '0 0 20px 0',
        padding: '15px 25px',
        borderRadius: '20px', 
    }, 
    messageRobot: {
        background: '#faeefb',
        color: '#697294', 
        margin: '0 0 20px 0',
        padding: '15px 25px',
        borderRadius: '20px', 
    }, 
    messageText: {
        fontSize: '.9em', 
        padding: '10px 0'
    },
    date: {
        fontSize: '.8em', 
        fontWeight: '700', 
        color: '#54145a'
    },
    name: {
        fontSize: '.8em',
        fontWeight: '700',
        color: '#54145a'
    }, 
    time: {
        fontWeight: '600', 
        fontSize: '12px'
    }, 
    avatar: {

        margin: '0 0 10px 0', 
        width: '30px', 
        height: '30px',
        opacity: '.8'
    }
})

const addNullDateTime = (count) => {
    return (count < 10) ? `0${count}` : count;
}

function Message(props) {
    const classes = useStyles()

    const dates = new Date(props.message.date  * 1000)
    const year = dates.getFullYear()
    const month = addNullDateTime(dates.getMonth())
    const day = addNullDateTime(dates.getDate())

    const hour = addNullDateTime(dates.getHours())
    const min = addNullDateTime(dates.getMinutes())
    const sec = addNullDateTime(dates.getSeconds())

    const stringDate = `Date: ${day}-${month}-${year} Time: ${hour}:${min}:${sec}`

    return (
        <div className={classes.messageUser}>
            
            <Grid 
                container 
                className={classes.root} 
                spacing={1}
                alignItems="center"
            >

                <Grid item xs={1}>
                    <Avatar 
                        src={ props.message.sender == 'robot' ? props.user.avatar : '/img/avatar/default-avatar.png' } 
                        alt={props.message.name} 
                        className={classes.avatar} 
                    />
                </Grid>

                <Grid item xs={1}>
                    <Typography 
                        variant="body1"
                        className={classes.name}  
                        gutterBottom
                    >
                        {props.message.name}
                    </Typography>
                </Grid>

            </Grid>

            <Typography 
                className={classes.messageText}
                gutterBottom
            >
                { props.message.message }
            </Typography>

            <Typography 
                className={classes.date}
                gutterBottom
            >
                { stringDate }
            </Typography>

        </div>
    )
}

export default Message