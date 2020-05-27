import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import socketio from 'socket.io-client'
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
        borderColor: 'rgba(210, 210, 210)',
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

const styles = {
    h1: {
        backgroundColor: 'red',
        color: 'white',
        padding: 12
    },
    form: {
        width:'1000px',
        border: '1px solid gray',
        padding: 12
    },
    log: {
        borderBottom: '1px solid silver',
        padding: 6,
        margin: 6
    },
    name: {
        float: 'left',
        width: 100,
        color: 'blue',
        textAlign: 'right'
    },
    msg: {
        float: 'left'
    }
}


// Socket.IO로 웹 소켓 서버에 접속하기
const socket = socketio.connect('http://localhost:3001')

class ChatForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: '', message: '' }
    }
    nameChanged(e) {
        this.setState({ name: e.target.value })
    }
    messageChanged(e) {
        this.setState({ message: e.target.value })
    }
    send() {
        socket.emit('chat-msg', {
            name: this.state.name,
            message: this.state.message
        })
        this.setState({ message: '' })
    }
    render() {
        return (
            <div style={styles.form}>
                이름:<br />
                <input value={this.state.name}
                    onChange={e => this.nameChanged(e)} /><br />
        메시지:<br />
                <input value={this.state.message}
                    onChange={e => this.messageChanged(e)} /><br />
                <button onClick={e => this.send()}>전송</button>
            </div>
        )
    }
}

// 채팅 애플리케이션의 메인 컴포넌트를 정의합니다. --- (※4)
class ChatPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logs: []
        }
    }
    // 컴포넌트가 마운트됐을 때 --- (※5)
    componentDidMount() {
        // 실시간으로 로그를 받게 설정
        socket.on('chat-msg', (obj) => {
            const logs2 = this.state.logs
            obj.key = 'key_' + (this.state.logs.length + 1)
            console.log(obj)
            logs2.unshift(obj) // 로그에 추가하기
            this.setState({ logs: logs2 })
        })
    }
    render() {
        // 로그를 사용해 HTML 요소 생성 --- (※6)
        const messages = this.state.logs.map(e => (
            <div key={e.key} style={styles.log}>
                <span style={styles.name}>{e.name}</span>
                <span style={styles.msg}>: {e.message}</span>
                <p style={{ clear: 'both' }} />
            </div>
        ))
        return (
            <div>
                <h1 style={styles.h1}>실시간 채팅</h1>
                <ChatForm />
                <div>{messages}</div>
            </div>
        )
    }
}

/*
function ChatPage() {
    // 입력 양식 컴포넌트
    



}*/
/*
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
*/

export default withRouter(ChatPage);
