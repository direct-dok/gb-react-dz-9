import { connect } from 'react-redux';

// Components
import NewsList from '../NewsList'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

// Selectors
import { getNews } from '../../store/selectors/getNews'
import { getAddNewsError } from '../../store/selectors/getAddNewsError'

// Thunk
import { addNewNewsThunkCreator } from '../../store/thunk/addNewNewsThunk'

// ActionCreators 
import { removeNews } from '../../store/actionCreators/remove_news_action'

const useStyles = makeStyles({
    gridButton: {
      margin: '0 0 30px 0'
    },
    
  });

const News = ({ news, newsError, addNewNews, removeAllNews }) => {

    const classes = useStyles();

    const addNews = () => {
        if(!news.length) addNewNews()
    }

    const removeNews = () => {
        removeAllNews()
    }

    return (
        <Container 
            maxWidth="md"
        >
            <Typography variant="h2" component="h1" gutterBottom>News</Typography>

            <Grid 
                container 
                spacing={1}
                className={classes.gridButton}
            >
                <Grid item>
                    <Button 
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={ addNews }
                    >
                        Show news
                    </Button>
                </Grid>

                <Grid item>
                    <Button 
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={ removeNews }
                    >
                        Delete news
                    </Button>
                </Grid>
            </Grid>

            {newsError? <Alert severity="error">Unfortunately the server is not available at the moment. Please try again after a few seconds. We apologize for any inconvenience caused</Alert> : false}

            <NewsList news={news} />
            

        </Container>
    )
}

const mapStateToProps = (store) => {
    return {
        news: getNews(store), 
        newsError: getAddNewsError(store)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewNews: () => dispatch(addNewNewsThunkCreator()), 
        removeAllNews: () => dispatch(removeNews())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)