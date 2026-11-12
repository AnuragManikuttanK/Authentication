import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';


function HomeRedirect() {

    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <Navigate
            to={isAuthenticated() ? '/dashboard' : '/login'}
            replace
        />
    );
}


function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<HomeRedirect />}
            />

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/register"
                element={<RegisterPage />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default App;
