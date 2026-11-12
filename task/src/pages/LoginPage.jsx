
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { validateLogin } from '../utils/validation';
import './LoginPage.css';

function LoginPage() {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const validationErrors = validateLogin(form);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {

            setLoading(true);
            setMessage('');

            await login(form);

            navigate('/dashboard');

        } catch (error) {

            setMessage(error.response?.data?.message || error.message);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="login-container">

            <form
                onSubmit={handleSubmit}
                className="login-form"
            >

                <h1>
                    Login
                </h1>

                {message && (
                    <p className="login-message">
                        {message}
                    </p>
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="login-input"
                />

                {errors.email && (
                    <p className="login-error">
                        {errors.email}
                    </p>
                )}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="login-input"
                />

                {errors.password && (
                    <p className="login-error">
                        {errors.password}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="login-button"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <p className="login-footer">
                    Don't have an account?{' '}

                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default LoginPage;
