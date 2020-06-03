import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles"
import { Link as RouterLink } from 'react-router-dom'
import axios from 'axios'

import {
    BrowserRouter as Router,
    Switch, Route, Link, IndexRoute
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
import DefaultPage from '../DefaultPage/DefaultPage'
import Profile from '../Profile/Profile'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import Auth from '../../../../hoc/auth'
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    drawerPaper: {
        width: 'inherit',
        backgroundColor: '#232B42',
    },
    link: {
        textDecoration: 'none',
        color: '#ffffff',
        font: '#ffffff'
    },
    icon: {
        color: '#ffffff'
    }
}))

function SideBar(props) {

    const logoutHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if (response.data.success) {
                    props.history.push('/')
                } else {
                    alert('로그아웃 하는데 실패하였습니다.')
                }
            })
    }

    const classes = useStyles();
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Drawer
                    style={{ width: '300px' }}
                    variant="persistent"
                    anchor="left"
                    variant="permanent"
                    open={true}
                    classes={{ paper: classes.drawerPaper }}
                >

                    <Profile style={{ marginTop: '20px' }} />
                    <hr style={{ width: '60%', color: '#848484' }} />

                    <List>
                        <Link to="/list" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <DashboardIcon className={classes.icon} />
                                </ListItemIcon>
                                <ListItemText primary={"스터디 채널"} />
                            </ListItem>
                        </Link>

                        <Link to="/chat" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <HomeIcon className={classes.icon} />
                                </ListItemIcon>
                                <ListItemText primary={"Chat"} />
                            </ListItem>
                        </Link>

                        <Link to="/about" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <InfoIcon className={classes.icon} />
                                </ListItemIcon>
                                <ListItemText primary={"About"} />
                            </ListItem>
                        </Link>

                        <ListItem button onClick={logoutHandler} className={classes.link}>
                            <ListItemIcon>
                                <ExitToAppIcon className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText primary={"로그아웃"} />
                        </ListItem>

                    </List>
                </Drawer>

                <Switch>
                    <Route path="/main" component={Auth(DefaultPage, true)}></Route>
                    <Route path="/list" component={Auth(listPage, true)}></Route>
                    <Route exact path="/chat" component={ChatPage}></Route>
                    <Route exact path="/about">
                        About
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default withRouter(withRoot(SideBar));