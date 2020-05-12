import React, {useEffect} from 'react';
import Axios from 'axios'
import {useDispatch} from 'react-redux'
import {auth} from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null){

    // option 에는 null(아무나 출입가능한 페이지), true(로그인한 유저만),
    // false(로그인한 유저는 출입 불가한 페이지)가 있다.

    function AuthenticationCheck (props){

        const dispatch = useDispatch();

        useEffect(()=>{
            // 백엔드에서 처리해서 가져온 모든 정보가 response에 저장되어 있다.
            dispatch(auth()).then(response => {

                // 로그인하지 않은 상태라면,
                if(!response.payload.isAuth){
                    if(option){ // option 이 true면, 허용 불가(로그인한 유저만 가야 하므로)
                        props.history.push('/login')
                    }
                }
                else{
                    // 로그인한 상태라면,
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    }
                    else{
                        if (option == false){
                            props.history.push('/')
                        }
                    }
                }
            });

        }, [])

        return (
            <SpecificComponent />

        )
    }
    return AuthenticationCheck
}
