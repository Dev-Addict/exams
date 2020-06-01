import Router from "next/router";

import BaseLayout from "../components/BaseLayout";
import AdminDashboard from "../components/AdminDashboard";
import exams from "../api/exams";

const Dashboard = ({auth}) => {
    if (process.browser && !auth.isSignedIn) {
        Router.push('/');
        return (<div/>);
    }
    if (!auth.isSignedIn) {
        return (<div/>);
    }

    if (auth.user.rote === 'admin') {
        return (<AdminDashboard auth={auth}/>);
    }

    return (
        <BaseLayout auth={auth} title="Dashboard">
            Dashboard
        </BaseLayout>
    );
};


Dashboard.getInitialProps = async (context, {user}, token) => {
    let users = [];
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
            return {
                users,
                token
            }
        }
        return {
            users,
            token
        };
    }
    return {
        users
    };
};

export default Dashboard;