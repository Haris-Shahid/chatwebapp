import { LOADING_START, GOT_ERROR, USER_REGISTERED, USER_LOG_IN } from '../actionTypes';
import axios from 'axios';

export default class AuthAction {

    static signUp(user, nav) {
        return dispatch => {
            dispatch({
                type: LOADING_START
            })
            let authUser = {
                username: user.username,
                email: user.email,
                password: user.password
            }
            axios.post('auth/register', authUser)
                .then(res => {
                    if (res.data.error) {
                        dispatch({
                            type: GOT_ERROR,
                            error: res.data.error
                        })
                    } else {
                        dispatch({
                            type: USER_REGISTERED,
                            user: res.data.user
                        })
                        nav.goBack();
                    }
                }).catch(err => {
                    dispatch({
                        type: GOT_ERROR,
                        error: err
                    })
                })

        }
    }
    static logIn(user) {
        return dispatch => {
            dispatch({
                type: LOADING_START
            })
            let authUser = {
                email: user.email,
                password: user.password
            }
            axios.post('auth/login', authUser)
                .then(res => {
                    if (res.data.error) {
                        dispatch({
                            type: GOT_ERROR,
                            error: res.data.error
                        })
                    } else {
                        console.log(res.data)
                        // dispatch({
                        //     type: USER_LOG_IN,
                        //     user: res.data.user
                        // })
                    }
                })
                .catch(err => {
                    dispatch({
                        type: GOT_ERROR,
                        error: err
                    })
                })
        }
    }
}