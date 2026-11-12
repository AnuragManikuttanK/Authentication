
import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

import { useNavigate } from 'react-router-dom';


function DashboardPage() {

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();


    const handleLogout = () => {

        logout();

        navigate('/login');
    };


    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-2xl font-bold">
                        Dashboard
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Logout
                    </button>

                </div>


                <div className="text-center">

                    {user?.avatar ? (

                        <img
                            src={user.avatar}
                            alt="Profile"
                            className="w-28 h-28 rounded-full mx-auto object-cover"
                        />

                    ) : (

                        <div className="w-28 h-28 rounded-full mx-auto bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
                            {user?.fullName?.charAt(0)}
                        </div>

                    )}


                    <h2 className="text-2xl font-bold mt-4">
                        Welcome, {user?.fullName}
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Your profile information
                    </p>

                </div>


                <div className="mt-8 space-y-4">

                    <div className="border p-4 rounded-lg">
                        <p className="text-gray-500 text-sm">
                            Username
                        </p>

                        <p className="font-semibold">
                            {user?.username}
                        </p>
                    </div>


                    <div className="border p-4 rounded-lg">
                        <p className="text-gray-500 text-sm">
                            Full Name
                        </p>

                        <p className="font-semibold">
                            {user?.fullName}
                        </p>
                    </div>


                    <div className="border p-4 rounded-lg">
                        <p className="text-gray-500 text-sm">
                            Email
                        </p>

                        <p className="font-semibold">
                            {user?.email}
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default DashboardPage;
