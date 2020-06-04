import BaseLayout from "../components/BaseLayout";
import StudentExamsList from "./StudentExamsList";

const StudentDashboard = ({auth, exams, user}) => {
    return (
        <BaseLayout auth={auth} title="Student Dashboard">
            <StudentExamsList exams={exams} auth={auth} user={user}/>
        </BaseLayout>
    );
};

export default StudentDashboard;