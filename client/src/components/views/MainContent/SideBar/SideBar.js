import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles"
import { Link as RouterLink } from 'react-router-dom';

import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom"

import {
    Drawer, Button, List, ListItem, ListItemIcon,
    ListItemText
} from "@material-ui/core"

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import HomeIcon from "@material-ui/icons/Home"
import InfoIcon from "@material-ui/icons/Info"
import DashboardIcon from '@material-ui/icons/Dashboard';
import withRoot from '../../modules/withRoot';

import listPage from '../../PostListPage/PostListPage'
import ChatPage from '../../ChatPage/ChatPage'
import Profile from '../Profile/Profile'

import Auth from '../../../../hoc/auth'

const useStyles = makeStyles((theme) => ({
    root:{
    },
    drawerPaper: {
        width: 'inherit',
        backgroundColor:'#232B42', 
    },
    link: {
        textDecoration: 'none',
        color: '#ffffff',
        font:'#ffffff'
    },
    icon:{
        color:'#ffffff'
    }
}))

function SideBar() {

    const classes = useStyles();
    return (
        <Router>
            <div style={{display:'flex'}}>
                <Drawer
                    style={{width: '300px'}}
                    variant="persistent"
                    anchor="left"
                    variant="permanent"
                    open={true}
                    classes={{paper: classes.drawerPaper}}
                >

                    <Profile style={{marginTop:'20px'}}/>
                    <hr style={{width:'60%',color:'#848484'}}/>
                    
                    <List>
                        <Link to="/list" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <DashboardIcon className={classes.icon}/>
                            </ListItemIcon>
                            <ListItemText primary={"스터디 채널"}/>
                        </ListItem>
                        </Link>

                        <Link to="/chat" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon className={classes.icon}/>
                            </ListItemIcon>
                            <ListItemText primary={"Chat"}/>
                        </ListItem>
                        </Link>

                        <Link to="/about" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <InfoIcon className={classes.icon}/>
                            </ListItemIcon>
                            <ListItemText primary={"About"}/>
                        </ListItem>
                        </Link>
                    </List>
                </Drawer>
                

                <Switch>
                    <Route exact path="/list" component={Auth(listPage, false)}></Route>
                    <Route exact path="/chat" component={Auth(ChatPage, false)}></Route>
                    <Route exact path="/about">
                            About
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default withRoot(SideBar);