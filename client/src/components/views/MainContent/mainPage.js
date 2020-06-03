import React, {Suspense} from 'react';
import ReactDOM from 'react-dom'
import { makeStyles } from "@material-ui/core/styles"
import { Link as RouterLink } from 'react-router-dom';

import SideBar from './SideBar/SideBar';

import { BrowserRouter as Router,
    Switch, Route, Link} from "react-router-dom"

import { Drawer, Button, List, ListItem, ListItemIcon,
ListItemText } from "@material-ui/core"

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import HomeIcon from "@material-ui/icons/Home"
import InfoIcon from "@material-ui/icons/Info"

import DefaultPage from './DefaultPage/DefaultPage'

const useStyles = makeStyles((theme) => ({
    drawerPaper : {width: 'inherit'},
    link: {textDecoration: 'none',
    color: theme.palette.text.primary}
}))

function mainPage(){
    return(

        <div>
        <Suspense fallback={(<div>Loading...</div>)}>
            <SideBar/>
        </Suspense>
        </div>
    );
}

export default mainPage;