import BaseLayout from "../components/BaseLayout";
import UsersList from "./UsersList";

const AdminDashboard = ({auth, users}) => {
    return (
        <BaseLayout auth={auth} title="Admin Dashboard">
            <UsersList auth={auth} users={users}/>
        </BaseLayout>
    );
};

export default AdminDashboard;