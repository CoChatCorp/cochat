import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
    color:'white'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    color:'white',
    marginTop: theme.spacing(1)
  }
}));


// 리덕스에서 데이터 조회하기

function Profile(props) {
  const { className, ...rest } = props;
  const classes = useStyles();
  const profiles = {
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Member',
    channel: '가입한 채널 : 3개'
  };
  
  
  const user = useSelector(state => state.user);
  const test = user.userData;
  var parsedList = JSON.stringify(test,["name"])
  var parsing = String(parsedList).slice(0,-2).substr(9)

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={profiles.avatar}
        to="/settings"
      />
      <Typography
        variant="h4"
        className={classes.name}
      >
        {parsing}
      </Typography>
      <Typography>회원님</Typography>
      <br/>
      <Typography variant="body1">{profiles.channel}</Typography>
    </div>
  );
};

export default Profile;
