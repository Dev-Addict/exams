import Router from "next/router";

import AdminDashboard from "../components/AdminDashboard";
import StudentDashboard from "../components/StudentDashboard";
import exams from "../api/exams";

const Dashboard = ({auth, users, exams, user, studentExams}) => {
    if (process.browser && !auth.isSignedIn) {
        Router.push('/');
        return (<div/>);
    }
    if (!auth.isSignedIn) {
        return (<div/>);
    }

    if (auth.user.rote === 'admin') {
        return (<AdminDashboard auth={auth} users={users} exams={exams}/>);
    }

    return (
        <StudentDashboard auth={auth} exams={exams} user={user} studentExams={studentExams}/>
    );
};


Dashboard.getInitialProps = async (context, {user}, token) => {
    let users = [];
    let examsData = [];
    let studentExams = [];
    if (user) {
        if (user.rote === 'admin') {
            try {
                const res = await exams.get('/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                users = res.data.data.docs;
            } catch (err) {
                users = [];
            }
            try {
                const res = await exams.get('/exams', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                examsData = res.data.data.docs;
            } catch (err) {
                examsData = [];
            }
            return {
                users,
                exams: examsData,
                token
            }
        }
        try {
            const res = await exams.get('/exams', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            examsData = res.data.data.docs;
        } catch (err) {
            examsData = [];
        }
        try {
            const res = await exams.get(`/studentexams?student=${user._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            studentExams = res.data.data.docs;
        } catch (err) {
            studentExams = [];
        }
        return {
            users,
            exams: examsData.filter(exam => user.roles.includes(exam.for)),
            studentExams,
            token,
            user
        };
    }
    return {
        users
    };
};

export default Dashboard;