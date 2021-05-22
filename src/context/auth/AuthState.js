import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Load User
    const loadUser = async () => {
        if (localStorage.getItem('token')) {
            setAuthToken(localStorage.getItem('token'));
        }
        try {
            const res = await axios.get('https://reqres.in/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    };

    //Register User
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application-json'
            }
        }
        try {
            const res = await axios.post('https://reqres.in/api/register', formData);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.error
            })
        }
    }



    //Login User
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application-json'
            }
        }
        try {
            const res = await axios.post('https://reqres.in/api/login', formData);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.error
            })
        }
    }

    //Logout
    const logout = () => dispatch({ type: LOGOUT })

    //Clear Errors
    const clearErrors = () => console.log('clear Errors');



    return <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            login,
            loadUser,
            logout,
            clearErrors
        }}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthState;