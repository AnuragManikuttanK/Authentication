
import { useContext } from 'react';

import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {

    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
