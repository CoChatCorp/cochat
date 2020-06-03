import React from 'react'
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

function ChatCard(props) {

    var firstLetter = String(props.sender.name).charAt(0);
    //console.log(props.message.substring(0, 8))
    return (
        <div style={{ width: '100%' }}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar>{firstLetter}</Avatar>
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <h3 style={{ margin: 0, textAlign: "left" }}>{props.sender.name} </h3>
                    <Typography>
                        {
                            props.message.substring(0, 8) === "uploads\\" ?
                                // this will be either video or image 

                                props.message.substring(props.message.length - 3, props.message.length) === 'mp4' ?
                                    <video
                                        style={{ maxWidth: '200px' }}
                                        src={`http://localhost:5000/${props.message}`} alt="video"
                                        type="video/mp4" controls
                                    />
                                    :
                                    <img
                                        style={{ maxWidth: '200px' }}
                                        src={`http://localhost:5000/${props.message}`}
                                        alt="img"
                                    />
                                :
                                <p>
                                    {props.message}
                                </p>
                        }
                    </Typography>
                    <p style={{ textAlign: "left", color:"gray"}}>
                        {moment().fromNow()}
                    </p>
                </Grid>
            </Grid>
        </div>
    )
}

export default ChatCard
