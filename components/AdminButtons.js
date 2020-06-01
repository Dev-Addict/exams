import Link from "next/link";

const AdminButtons = () => {
    return (
        <div className="buttons-container">
            <Link href="/createuser">
                <a>Create User</a>
            </Link>
        </div>
    );
};

export default AdminButtons;