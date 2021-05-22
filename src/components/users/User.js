import React, { useContext, useEffect } from 'react';
import Spinner from '../layout/spinner';
import UserContext from '../../context/user/userContext'

const User = ({ match }) => {
    const userContext = useContext(UserContext)
    const { user, loading, getUser } = userContext;
    useEffect(() => {
        getUser(match.params.id);
    }, [])
    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div style={userStyle}>
                <div key={user.id}>
                    <img key={user.avatar} src={user.avatar} />
                    <div>
                        <label>firstName:</label>
                        <strong className="text-primary">{' '}{user.first_name}</strong>
                    </div>
                    <div>
                        <label>lastName:</label>
                        <strong className="text-primary">{' '}{user.last_name}</strong>
                    </div>
                    <p>{user.email}</p>

                </div>
            </div>
        )
    }
}
const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap: '1rem'
}

export default User;