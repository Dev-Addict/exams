import Router from "next/router";

import BaseLayout from "../components/BaseLayout";
import AdminDashboard from "../components/AdminDashboard";

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

export default Dashboard;