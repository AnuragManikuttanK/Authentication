
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { validateRegister } from '../utils/validation';
import './RegisterPage.css';

function RegisterPage() {

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        fullName: ''
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

        const validationErrors = validateRegister(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            setLoading(true);
            setMessage('');

            await register(form);

            alert('Registration successful!');
            navigate('/login');

        } catch (error) {
            setMessage(error.response?.data?.message || error.message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">

            <form
                onSubmit={handleSubmit}
                className="register-form"
            >

                <h1>
                    Create Account
                </h1>

                {message && (
                    <p className="register-message">
                        {message}
                    </p>
                )}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="register-input"
                />

                {errors.username && (
                    <p className="register-error">
                        {errors.username}
                    </p>
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="register-input"
                />

                {errors.email && (
                    <p className="register-error">
                        {errors.email}
                    </p>
                )}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="register-input"
                />

                {errors.password && (
                    <p className="register-error">
                        {errors.password}
                    </p>
                )}

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={handleChange}
                    className="register-input"
                />

                {errors.fullName && (
                    <p className="register-error">
                        {errors.fullName}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="register-button"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>

                <p className="register-footer">
                    Already have an account?{' '}

                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default RegisterPage;
