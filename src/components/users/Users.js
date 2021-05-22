import React, { useContext, useEffect } from 'react';
import Spinner from '../layout/spinner';
import UserContext from '../../context/user/userContext'
import { Link } from 'react-router-dom';

const Users = () => {
    const userContext = useContext(UserContext)
    const { users, loading, getUsers } = userContext;
    useEffect(() => {
        getUsers();
    }, [])
    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div style={userStyle}>
                { users.map(user =>
                    <div key={user.id}>
                        <Link to={`/user/${user.id}`} className='btn btn-dark btn-sm my-1'>
                            <strong>{user.first_name}</strong>
                        </Link>
                        <p>{user.email}</p>
                        <img key={user.avatar} src={user.avatar} />
                    </div>
                )}
            </div>
        )
    }
}
const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap: '1rem'
}

export default Users;
