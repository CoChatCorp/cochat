import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
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
import SmsIcon from '@material-ui/icons/Sms';
import SendIcon from '@material-ui/icons/Send';
import ImageIcon from '@material-ui/icons/Image';
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import DirectionsIcon from '@material-ui/icons/Directions';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

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
        minHeight: 800,
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
        fontSize: 25,
    },
    pos: {
        marginBottom: 12,
    },
    content: {
        fontSize: 18,
        minHeight: 620,
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

function ChatPage() {
    const classes = useStyles();
    const cardClass = cardStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        TALK
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Card className={cardClass.root} variant="outlined">

                <CardHeader className={cardClass.title}
                    avatar={
                        <SmsIcon className={cardClass.title} />
                    }
                    title={
                        <Typography className={cardClass.title}>
                            ChatRoom 1
                            </Typography>
                    }
                />
                <CardContent className={cardClass.content}>
                    <Typography color="textSecondary" gutterBottom>
                        채팅 내용
                    </Typography>
                </CardContent>

                <Paper variant="outlined" component="form" className={cardClass.sendRoot}>
                    <InputBase
                        className={cardClass.input}
                        placeholder="여기에 메세지를 입력하세요"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="submit" className={cardClass.iconButton} aria-label="search">
                        <SendIcon color="primary"/>
                    </IconButton>
                    <Divider className={cardClass.divider} orientation="vertical" />
                    <IconButton className={cardClass.iconButton} aria-label="hangout">
                        <WhatsAppIcon />
                    </IconButton>
                    <Divider className={cardClass.divider} orientation="vertical" />
                    <IconButton className={cardClass.imageButton} aria-label="image">
                        <ImageIcon style={{ color: green[600] }}/>
                    </IconButton>
                </Paper>

            </Card>

        </div>
    )
}

export default withRouter(ChatPage);
