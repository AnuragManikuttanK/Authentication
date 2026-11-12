
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

function DashboardPage() {

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">

            <div className="dashboard-card">

                <div className="dashboard-header">

                    <h1>Dashboard</h1>

                    <button
                        onClick={handleLogout}
                        className="logout-btn"
                    >
                        Logout
                    </button>

                </div>

                <div className="profile-section">

                    {user?.avatar ? (

                        <img
                            src={user.avatar}
                            alt="Profile"
                            className="profile-image"
                        />

                    ) : (

                        <div className="profile-placeholder">
                            {user?.fullName?.charAt(0)}
                        </div>

                    )}

                    <h2>
                        Welcome, {user?.fullName}
                    </h2>

                    <p>
                        Your profile information
                    </p>

                </div>

                <div className="profile-details">

                    <div className="profile-item">
                        <p>Username</p>
                        <p>{user?.username}</p>
                    </div>

                    <div className="profile-item">
                        <p>Full Name</p>
                        <p>{user?.fullName}</p>
                    </div>

                    <div className="profile-item">
                        <p>Email</p>
                        <p>{user?.email}</p>
                    </div>

                </div>

                <div className="dashboard-footer">
                    <p>Welcome to your dashboard!</p>
                </div>

            </div>

        </div>
    );
}

export default DashboardPage;
