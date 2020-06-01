import Router from "next/router";
import Cookie from 'js-cookie';

import exams from "../api/exams";

const Header = ({auth}) => {
    return (
        <div className="header-container">
            <div className="header-brand">Exams</div>
            {auth.isSignedIn &&
            <div className="header-dashboard">
                Dashboard
                <div className="header-sign-out"
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