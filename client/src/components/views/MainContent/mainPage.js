import React from 'react';
import { makeStyles } from "@material-ui/core/styles"
import { Link as RouterLink } from 'react-router-dom';

import ChatPage from '../../views/ChatPage/ChatPage';

import { BrowserRouter as Router,
    Switch, Route, Link} from "react-router-dom"

import { Drawer, Button, List, ListItem, ListItemIcon,
ListItemText } from "@material-ui/core"

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import HomeIcon from "@material-ui/icons/Home"
import InfoIcon from "@material-ui/icons/Info"

const useStyles = makeStyles((theme) => ({
    drawerPaper : {width: 'inherit'},
    link: {textDecoration: 'none',
    color: theme.palette.text.primary}
}))

function App(){

    const classes = useStyles(); // 임의로 지정한 style 가져오기
    return (
        <Router>
            <div style={{display:'flex'}}>
                <Drawer
                
                    style={{width: '240px'}}
                    variant="persistent"
                    anchor="left"
                    variant="permanent"
                    open={true}
                    classes={{paper: classes.drawerPaper}}
                >
                    
                    <List>
                        <Link to="/chat" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Chat"}/>
                        </ListItem>
                        </Link>

                        <Link to="/about" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <InfoIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"About"}/>
                        </ListItem>
                        </Link>
                    </List>
                </Drawer>
                

                <Switch>
                    <Route exact path="/chat" component={ChatPage}>
                    </Route>
                    <Route exact path="/about">
                            About
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;