
import { useContext, useState } from 'react';

import { AuthContext } from '../context/AuthContext';

import { useNavigate, Link } from 'react-router-dom';

import { validateLogin } from '../utils/validation';


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

        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
            >

                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>


                {message && (
                    <p className="text-red-500 mb-4">
                        {message}
                    </p>
                )}


                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-2"
                />

                {errors.email && (
                    <p className="text-red-500 text-sm mb-3">
                        {errors.email}
                    </p>
                )}


                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-2"
                />

                {errors.password && (
                    <p className="text-red-500 text-sm mb-3">
                        {errors.password}
                    </p>
                )}


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg mt-4 hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>


                <p className="text-center mt-5 text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600">
                        Register
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default LoginPage;
