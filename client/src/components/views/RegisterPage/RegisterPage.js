import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import { palette } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
    root:{
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    media: {
      marginTop:50,
      width: 300,
      height: 85,
      marginBottom: 30,
    },
    avatar: {
      margin: theme.spacing(1),
      //backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      margin: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const validatePassword = passwordEntered => {
    if (passwordEntered.length >= 5) {
      this.setState({
        isValid: true,
        passwordEntered
      });
    } else {
      this.setState({
        isValid: false,
        passwordEntered
      });
    }
  };

function RegisterPage(props) {

    const dispatch = useDispatch();

    // props , state -> 이 안에서는 state 를 변화시켜서 이 안의 데이터를 변화시킬 수 있음
    // 입력한 이메일과 비밀번호를 서버에 넘길 수 있도록 state 에서 받고 있음
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onconfirmPasswordHandler = (event) => {
        setconfirmPassword(event.currentTarget.value)
    }

    const hasError = passwordEntered =>
        Password.length < 5 ? true : false;

    const hasNotSameError = passwordEntered =>
        Password != confirmPassword ? true : false;    

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 아무 동작 안하고 버튼만 눌러도 리프레쉬 되는 것을 막는다

        if(Password !== confirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name,
        }
        dispatch(registerUser(body))
            .then(response =>{
                if(response.payload.success){
                    alert('회원가입이 완료되었습니다!');
                    props.history.push('/login') // react 에서의 페이지 이동 코드
                } else{
                    alert('Error!!');
                }
            })
        // 완료가 잘 되었을 경우 이동
    }

    const classes = useStyles();

    return (
            <Container component="main" maxWidth="xs" className={classes.root}>
              <CssBaseline />
              <div className={classes.paper}>
                
                <CardMedia
                className={classes.media}
                  image="/login_logo.png"
                  title="CODECHAT"
                />
                <Typography component="h1" variant="h5">
                  
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="filled"
                        value={Name}
                        onChange={onNameHandler}
                        required
                        fullWidth
                        id="firstName"
                        label="이름"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                         variant="filled"
                        required
                        fullWidth
                        value={Email}
                        onChange={onEmailHandler}
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="filled"
                        required
                        fullWidth
                        value={Password}
                        onChange={onPasswordHandler}
                        name="password"
                        error={hasError('password')}
                        label="Password(5글자 이상 필수)"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="filled"
                        required
                        fullWidth
                        value={confirmPassword}
                        onChange={onconfirmPasswordHandler}
                        name="confirmPassword"
                        error={hasNotSameError('confirmPassword')}
                        helperText={
                            hasNotSameError('confirmPassword') ? "입력한 비밀번호와 일치하지 않습니다." : null
                        }
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                      />
                    </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onSubmit={onSubmitHandler}
                    color="primary"
                    className={classes.submit}
                  >
                    회원가입
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2">
                        이미 가입하셨다면, 로그인해 주세요!
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Box mt={5}>
                
              </Box>
            </Container>
    )
}

export default withRouter(RegisterPage);
