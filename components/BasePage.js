const BasePage = ({children, className = '', title = ''}) => {
    return (
        <div className={`base-page-container ${className}`}>
            <Container>
                <div className="base-page-header-container">
                    <h1 className="base-page-header">{title}</h1>
                </div>
                {children}
            </Container>
        </div>
    );
};

export default BasePage;