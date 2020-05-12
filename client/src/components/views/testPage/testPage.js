// this example use icon from material-ui/icons, you can use your own!
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import MenuRounded from '@material-ui/icons/MenuRounded';
import { withRouter } from 'react-router-dom'
import ChatPage from '../../views/ChatPage/ChatPage';
import HomeIcon from "@material-ui/icons/Home"
import InfoIcon from "@material-ui/icons/Info"
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom"

import {
    Drawer, Button, List, ListItem, ListItemIcon,
    ListItemText
} from "@material-ui/core"

import {
    Root,
    Header,
    Nav,
    Content,
    Footer,
    presets,
} from 'mui-layout';

const baseTheme = createMuiTheme(); // or use your own theme;
const config = presets.createStandardLayout();

const App = () => (
    <ThemeProvider theme={baseTheme}>
        <Root config={config}>
            <Header
                renderMenuIcon={open => (open ? <ChevronLeft /> : <MenuRounded />)}
            >
                header
     </Header>
            <Nav
                renderIcon={collapsed =>
                    collapsed ? <ChevronRight /> : <ChevronLeft />
                }
            >
                <List>
                    <Link to="/chat">
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Chat"} />
                        </ListItem>
                    </Link>

                    <Link to="/about">
                        <ListItem button>
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText primary={"About"} />
                        </ListItem>
                    </Link>
                </List>

            </Nav>
                <Content >
                <Route exact path="/chat" component={ChatPage}></Route>
                        blank
                </Content>
        </Root>
    </ThemeProvider>
)

export default withRouter(App);