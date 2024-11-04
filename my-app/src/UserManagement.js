import React, { useState } from 'react';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    const handleAddUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const contacts = e.target.contacts.value;
        const password = e.target.password.value; // Password is captured but not displayed

        if (name && contacts && password) {
            setUsers([...users, { name, contacts, password }]);
            e.target.reset();
        }
    };

    const handleRemoveUser = (nameToRemove) => {
        setUsers(users.filter(user => user.name !== nameToRemove));
    };

    return (
        <div>
            <h2>User Management</h2>
            <form onSubmit={handleAddUser}>
                <input type="text" name="name" placeholder="Name" required />
                <input type="text" name="contacts" placeholder="Contacts" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Add User</button>
            </form>
            <h3>Users</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contacts</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.contacts}</td>
                            <td>
                                <button onClick={() => handleRemoveUser(user.name)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;