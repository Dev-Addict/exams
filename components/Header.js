const Header = ({auth, className}) => {
    return (
        <div className="header-container">
            <div className="header-brand">Exams</div>
            {auth.isSignedIn &&
            <div className="header-dashboard">Dashboard</div>
            }
        </div>
    );
};

export default Header;