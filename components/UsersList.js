const UsersList = ({users, auth}) => {
    const renderUsers = () => users.filter(user => user.rote === 'student').map(user => (
        <div className="users-list-user-card" key={user._id}>
            <table>
                <tbody>
                <tr>
                    <td>Name</td>
                    <td>{user.name}</td>
                </tr>
                <tr>
                    <td>Username</td>
                    <td>{user.username}</td>
                </tr>
                <tr>
                    <td>Roles</td>
                    <td>{user.roles.join(', ')}</td>
                </tr>
                </tbody>
            </table>
        </div>
    ));

    return (
        <div className="users-list-container">
            <h1>Users</h1>
            {renderUsers()}
        </div>
    );
};

export default UsersList;