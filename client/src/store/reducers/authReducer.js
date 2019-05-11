import { LOADING_START, GOT_ERROR, USER_REGISTERED } from '../actionTypes';

const initialState = {
    username: '',
    email: '',
    error: null,
    loading: false
}

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case LOADING_START:
            return { ...state, loading: true, error: null }
        case USER_REGISTERED:
            return { ...state, ...action.user, loading: false, error: null }
        case GOT_ERROR:
            return { ...state, error: action.error, loading: false }
        default:
            return state;
    }
}