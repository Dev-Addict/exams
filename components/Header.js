import Router from "next/router";
import Link from "next/link";
import Cookie from 'js-cookie';

import exams from "../api/exams";

const Header = ({auth}) => {
    return (
        <div className="header-container">
            <Link href="/">
                <a className="link">
                    <div className="header-brand">Exams</div>
                </a>
            </Link>
            {auth.isSignedIn &&
            <div className="header-dashboard">
                <Link href="/dashboard">
                    <a className="link">Dashboard</a>
                </Link>
                <div className="sign-out"
                     onClick={() => {
                         exams.post('/users/auth/singout');
                         Cookie.remove('jwtClient');
                         Router.push('/');
                     }}>
                    Sign Out
                </div>
            </div>
            }
        </div>
    );
};

export default Header;