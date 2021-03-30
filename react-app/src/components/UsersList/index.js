import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';


function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        })()
    }, []);

    const userComponents = users.map((user) => {
        return (
            <div key={user.id}>
                <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
            </div>
        );
    });

    return (
        <>
            <h1>User List: </h1>
            <div>{userComponents}</div>
        </>
    );
}


export default UsersList;
