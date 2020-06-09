import BaseLayout from "../components/BaseLayout";
import StudentExamsList from "./StudentExamsList";

const StudentDashboard = ({auth, exams, user, studentExams}) => {
    return (
        <BaseLayout auth={auth} title="Student Dashboard">
            <StudentExamsList exams={exams} auth={auth} user={user} studentExams={studentExams}/>
        </BaseLayout>
    );
};

export default StudentDashboard;