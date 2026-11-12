
import { useContext, useState } from 'react';

import { AuthContext } from '../context/AuthContext';

import { useNavigate, Link } from 'react-router-dom';

import { validateRegister } from '../utils/validation';


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

        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
            >

                <h1 className="text-3xl font-bold text-center mb-6">
                    Create Account
                </h1>


                {message && (
                    <p className="text-red-500 mb-4">
                        {message}
                    </p>
                )}


                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-2"
                />

                {errors.username && (
                    <p className="text-red-500 text-sm mb-3">
                        {errors.username}
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


                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-2"
                />

                {errors.fullName && (
                    <p className="text-red-500 text-sm mb-3">
                        {errors.fullName}
                    </p>
                )}


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg mt-4 hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>


                <p className="text-center mt-5 text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600">
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default RegisterPage;
