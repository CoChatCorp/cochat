import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withRoot from '../modules/withRoot';
import AppAppBar from '../modules/views/AppAppBar';
import CssBaseline from '@material-ui/core/CssBaseline';

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
    textfield:{
      marginBottom:10,
    }
}));

function LoginPage(props) {

    const dispatch = useDispatch();

    // props , state -> 이 안에서는 state 를 변화시켜서 이 안의 데이터를 변화시킬 수 있음
    // 입력한 이메일과 비밀번호를 서버에 넘길 수 있도록 state 에서 받고 있음
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 아무 동작 안하고 버튼만 눌러도 리프레쉬 되는 것을 막는다

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/main') // react 에서의 페이지 이동 코드
                } else {
                    alert('이메일 혹은 비밀번호를 다시 확인해 주세요.');
                }
            })
        // 완료가 잘 되었을 경우 이동


    }

    const classes = useStyles();
    return (
    <React.Fragment>
      <AppAppBar />
            <Container component="main" maxWidth="xs" className={classes.root}>
              <CssBaseline />
              <div className={classes.paper}>
                
                <CardMedia
                className={classes.media}
                  image="/login_logo.png"
                  title="CODECHAT"
                />
                <Typography component="h2" variant="h6">
                  COCHAT에 로그인하여 코딩 스터디를 시작해 보세요
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
                    <Grid item xs={12}>
                      <TextField
                       className={classes.textfield}
                        autoComplete="email"
                        name="email"
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="이메일"
                        value={Email}
                        onChange={onEmailHandler}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                      className={classes.textfield}
                        variant="outlined"
                        required
                        fullWidth
                        value={Password}
                        onChange={onPasswordHandler}
                        id="password"
                        label="비밀번호"
                        name="password"
                        autoComplete="password"
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
                    로그인
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link href="/register" variant="body2">
                        아직 회원이 아니라면, 회원가입을 해 주세요!
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Box mt={5}>
                
              </Box>
            </Container>
            </React.Fragment>




/*
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '400', height: '100vh'
        }}>

            <form className={classes.root} style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <TextField id="standard-basic" label="이메일" type="email" value={Email} onChange={onEmailHandler} />
                <TextField id="standard-basic" label="비밀번호" type="password" value={Password} onChange={onPasswordHandler} />
                
                <br />
                <Button variant="contained" type="submit" color="primary" onSubmit={onSubmitHandler}>
                    Login
                </Button>
            </form>

        </div>*/
    )
}

export default withRouter(withRoot(LoginPage));
