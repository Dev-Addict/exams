import Router from "next/router";

import BaseLayout from "../components/BaseLayout";

const Dashboard = ({auth}) => {
    if (process.browser && !auth.isSignedIn) {
        Router.push('/');
        return (<div/>);
    }
    if (auth.isSignedIn) {
        return (<div/>);
    }

    return (
        <BaseLayout auth={auth}>
            Dashboard
        </BaseLayout>
    );
};

export default Dashboard;