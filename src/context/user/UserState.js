import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import UserReducer from './userReducer';
import {
    SET_LOADING,
    GET_USERS,
    GET_USER
} from '../types';

const UserState = props => {
    const initialState = {
        users: [],
        user: '',
        loading: false
    }
    const [state, dispatch] = useReducer(UserReducer, initialState);

    //set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    //Get Users
    const getUsers = async () => {
        setLoading();

        const res = await axios.get(`https://reqres.in/api/users?page=2`);
        dispatch({
            type: GET_USERS,
            payload: res.data.data
        })
    }

    //Get Users
    const getUser = async (id) => {
        setLoading();

        const res = await axios.get(`https://reqres.in/api/users/${id}`);
        dispatch({
            type: GET_USER,
            payload: res.data.data
        })
    }


    return <UserContext.Provider
        value={{
            users: state.users,
            user: state.user,
            loading: state.loading,
            getUsers,
            getUser
        }}>
        {props.children}
    </UserContext.Provider>
}
export default UserState;