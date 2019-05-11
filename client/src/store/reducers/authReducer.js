import { LOADING_START } from '../actionTypes';

const initialState = {
    username: '',
    email: '',
    error: '',
    loading: false
}

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case LOADING_START:
            return { ...state, loading: true }
        default:
            return state;
    }
}