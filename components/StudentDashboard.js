import BaseLayout from "../components/BaseLayout";
import StudentExamsList from "./StudentExamsList";

const StudentDashboard = ({auth, exams}) => {
    return (
        <BaseLayout auth={auth} title="Student Dashboard">
            <StudentExamsList exams={exams} auth={auth}/>
        </BaseLayout>
    );
};

export default StudentDashboard;