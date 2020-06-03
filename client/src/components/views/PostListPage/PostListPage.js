import React from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import SmsIcon from '@material-ui/icons/Sms';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import SendIcon from '@material-ui/icons/Send';
import ImageIcon from '@material-ui/icons/Image';
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import DirectionsIcon from '@material-ui/icons/Directions';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import { withRouter } from 'react-router-dom'
import withRoot from '../modules/withRoot';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const cardStyles = makeStyles({
    root: {
        maxWidth: 1400,
        minHeight: 100,
        margin: '0 auto',
        marginTop: 10,
        boxShadow: '0 3px 5px 2px rgba(250, 250, 250, .5)',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 35,
    },
    pos: {
        marginBottom: 12,
    },
    content: {
        backgroundColor:'lightgray',
        padding:'10px 10px',
        fontSize: 18,
        minHeight: 50,
    },
    sendRoot: {
        padding: '2px 4px',
        display: 'flex',
        maxWidth: 1350,
        margin: '0 auto',
        borderWidth: 2,
        borderColor:'rgba(210, 210, 210)',
        boxShadow: '0 3px 5px 2px rgba(220, 220, 220, .3)',
    },
    input: {
        marginLeft: 10,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    imageButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
      },
});

function PostListPage() {
    const classes = useStyles();
    const cardClass = cardStyles();

    return (
        <Fade
        in={true}
        timeout={{enter:500}}
        >
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Card className={cardClass.root} variant="outlined">

                <CardHeader className={cardClass.title}
                    avatar={
                        <MeetingRoomRoundedIcon className={cardClass.title} />
                    }
                    title={
                        <Typography variant="h4" className={cardClass.title}>
                            추천 채널
                        </Typography>
                    }
                    subheader={
                        <Typography variant="h6" gutterBottom>
                            사용자가 많은 공부 채널을 확인해 보세요
                        </Typography>
                    }
                />
                <CardContent className={cardClass.content}>
                    <Box component="span" m={1} style={{padding:'10px'}}>
                        * 삼성전자 스터디 채널
                    </Box>
                </CardContent>
            </Card>

        </div>
        </Fade>
    )
}

export default withRouter(withRoot(PostListPage));
