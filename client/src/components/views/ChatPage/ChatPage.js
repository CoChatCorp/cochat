import React, { Component } from 'react'
import TextsmsIcon from '@material-ui/icons/Textsms';
import SendIcon from '@material-ui/icons/Send';
import PanoramaIcon from '@material-ui/icons/Panorama';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { green } from '@material-ui/core/colors';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';

import Box from '@material-ui/core/Box';

import io from "socket.io-client";
import { connect } from "react-redux";
import moment from "moment";
import { getChats, afterPostMessage } from "../../../_actions/chat_actions"
import ChatCard from "./Sections/ChatCard"
import Dropzone from "react-dropzone"
import Axios from 'axios';
import { withRouter } from 'react-router-dom'
import withRoot from '../modules/withRoot';

export class ChatPage extends Component {
    state = {
        chatMessage: "",
    }

    componentDidMount() {
        let server = "http://localhost:5000";

        this.props.dispatch(getChats());

        this.socket = io(server);

        this.socket.on("Output Chat Message", messageFromBackEnd => {
            console.log(messageFromBackEnd)
            this.props.dispatch(afterPostMessage(messageFromBackEnd));
        })
    }

    // 스크롤 꽉차서 내려갈 때마다 부드럽게 자동으로 설정
    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }


    hanleSearchChange = (e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }

    renderCards = () =>
        this.props.chats.chats
        && this.props.chats.chats.map((chat) => (
            <ChatCard key={chat._id}  {...chat} />
        ));

    onDrop = (files) => {

        let formData = new FormData;
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        Axios.post('api/chat/uploadFiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    let chatMessage = response.data.url;
                    let userId = this.props.user.userData._id
                    let userName = this.props.user.userData.name;
                    let userImage = this.props.user.userData.image;
                    let nowTime = moment();
                    let type = "VideoOrImage"

                    this.socket.emit("Input Chat Message", {
                        chatMessage,
                        userId,
                        userName,
                        userImage,
                        nowTime,
                        type
                    });
                }
            })
    }

    submitChatMessage = (e) => {
        e.preventDefault();

        let chatMessage = this.state.chatMessage
        let userId = this.props.user.userData._id
        let userName = this.props.user.userData.name;
        let userImage = this.props.user.userData.image;
        let nowTime = moment();
        let type = "Text"

        // emit
        this.socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userName,
            userImage,
            nowTime,
            type
        });
        this.setState({ chatMessage: "" })
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" style={{ flexGrow: 1 }}>

                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>

                    <Card style={{ maxWidth: '810px', padding:'5px',marginLeft: '10px', marginTop: '10px' }} variant="outlined">
                        <CardHeader
                            avatar={
                                <TextsmsIcon />
                            }
                            title={
                                <Typography variant="h4" >
                                    채팅방
                        </Typography>
                            }
                            subheader={
                                <Typography variant="h6" gutterBottom>
                                    사진 업로드와 동영상 업로드도 즐겨보세요.
                        </Typography>
                            }
                        />

                        <CardContent style={{ width: '800px', margin: '0 auto', height: '600px', overflowY: 'scroll', padding: '10px 10px' }}>
                            <div>
                                {this.props.chats && (
                                    this.renderCards()
                                )}
                                <div
                                    ref={el => {
                                        this.messagesEnd = el;
                                    }}
                                    style={{ float: "left", clear: "both" }}
                                />
                            </div>
                        </CardContent>

                        <Paper variant="outlined" component="form"
                            style={{
                                display: 'flex',
                                padding: '3px',
                                margin: '5px',
                                borderColor:'black',
                            }}
                            onSubmit={this.submitChatMessage}>
                            <InputBase
                                id="message"
                                placeholder="여기에 메세지를 입력하세요"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                value={this.state.chatMessage}
                                onChange={this.hanleSearchChange}
                                style={{flex:'1',marginLeft:'10px'}}
                            />
                            <Dropzone onDrop={this.onDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <IconButton>
                                                <PanoramaIcon style={{ color: green[600] }} />
                                            </IconButton>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                            <IconButton type="primary"
                                onClick={this.submitChatMessage}
                                htmltype="submit">
                                <SendIcon color="primary" />
                            </IconButton>
                        </Paper>
                    </Card>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        chats: state.chat
    }
}


export default connect(mapStateToProps)(withRoot(ChatPage));