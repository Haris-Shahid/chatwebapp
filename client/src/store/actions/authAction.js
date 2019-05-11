import { LOADING_START } from '../actionTypes';

export default class AuthAction {

    static signUp(){
        return dispatch => {
            dispatch({
                type: LOADING_START
            })
        }
    }

}