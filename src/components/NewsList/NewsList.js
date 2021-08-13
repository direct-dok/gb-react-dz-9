import { connect } from 'react-redux';


// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles({
    card: {
        margin: '0 0 20px 0'
    }
  });

const NewsList = ({ news }) => {

    const classes = useStyles();

    return (
        <>
            { news.map(({sectionName, webPublicationDate, webTitle }) => <Card className={classes.card} key={webTitle}>
                <CardActionArea>
                    <CardContent>

                        <Typography gutterBottom variant="h5" component="h2">
                            { webTitle }
                        </Typography>

                        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                            { sectionName }
                        </Typography>

                        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                            { webPublicationDate }
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card>) }
        </>
        
    )
}


export default NewsList