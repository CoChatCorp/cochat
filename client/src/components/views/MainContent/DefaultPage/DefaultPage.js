import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fade from '@material-ui/core/Fade';
import withRoot from '../../modules/withRoot';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop:100,
        maxWidth: 1920,
        maxHeight: 1080,
        width:1920,
        height:1500,
        margin: '0 auto',
        textAlign: 'center',
        boxShadow: '0 3px 5px 2px rgba(250, 250, 250, .5)',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    media: {
        marginTop:'10%',
        textAlign:'center',
        width: 465,
        height: 460,
        verticalAlign:'middle',
    },
}));

function DefaultPage() {
    const classes = useStyles();

    return (
        <Fade
        in={true}
        timeout={{enter:500}}
        >
              <div className={classes.root}>
                  <img className={classes.media} src ="https://i.imgur.com/gMFp15i.png"></img>
              </div>
        </Fade>
    );
};

export default withRouter(withRoot(DefaultPage));
