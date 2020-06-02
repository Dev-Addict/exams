import BaseLayout from "../components/BaseLayout";
import UsersList from "./UsersList";
import AdminButtons from "./AdminButtons";
import ExamsList from "./ExamsList";

const AdminDashboard = ({auth, users, exams}) => {
    return (
        <BaseLayout auth={auth} title="Admin Dashboard">
            <AdminButtons/>
            <UsersList auth={auth} users={users}/>
            <ExamsList auth={auth} exams={exams}/>
        </BaseLayout>
    );
};

export default AdminDashboard;