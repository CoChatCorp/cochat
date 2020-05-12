import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {

        margin: theme.spacing(1),
        width: '500',

    },
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
                    props.history.push('/') // react 에서의 페이지 이동 코드
                } else {
                    alert('이메일 혹은 비밀번호를 다시 확인해 주세요.');
                }
            })
        // 완료가 잘 되었을 경우 이동


    }

    const classes = useStyles();
    return (

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

        </div>
    );
}

export default withRouter(LoginPage);
