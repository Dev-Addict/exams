import Router from "next/router";

import AdminDashboard from "../components/AdminDashboard";
import StudentDashboard from "../components/StudentDashboard";
import exams from "../api/exams";

const Dashboard = ({auth, users, exams}) => {
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
        <StudentDashboard auth={auth} exams={exams}/>
    );
};


Dashboard.getInitialProps = async (context, {user}, token) => {
    let users = [];
    let examsData = [];
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
                exams: examsData.filter(exam => user.roles.includes(exam.for)),
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
        return {
            users,
            exams: examsData,
            token
        };
    }
    return {
        users
    };
};

export default Dashboard;