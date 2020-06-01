import BaseLayout from "../components/BaseLayout";
import UsersList from "./UsersList";
import AdminButtons from "./AdminButtons";

const AdminDashboard = ({auth, users}) => {
    return (
        <BaseLayout auth={auth} title="Admin Dashboard">
            <AdminButtons/>
            <UsersList auth={auth} users={users}/>
        </BaseLayout>
    );
};

export default AdminDashboard;