import React, { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import Users from '../users/Users'
const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
    }, [])

    return (
        <Fragment>
            <Users />
        </Fragment>
    )
};

export default Home
