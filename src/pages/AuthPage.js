// --- src/pages/AuthPage.js ---
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';

const AuthPage = ({ mode, navigateTo }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const isLogin = mode === 'login';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await login({ username: email, password });
            navigateTo('home');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            <div className="hidden lg:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2487&auto=format&fit=crop')" }}>
                <div className="w-full h-full bg-black bg-opacity-25"></div>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <div className="flex justify-center mb-12">
                        <div className="cursor-pointer" onClick={() => navigateTo('home')}><Logo /></div>
                    </div>
                    <div className="text-left mb-8">
                        <p className="text-gray-600">{isLogin ? 'Welcome back!' : 'Get started'}</p>
                        <h1 className="text-3xl font-bold text-gray-900">{isLogin ? 'Login to your account' : 'Create an account'}</h1>
                    </div>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">E-mail</label>
                            <input
                                type="email"
                                placeholder="john@mail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-[#F6F5FF] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-[#F6F5FF] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
                                required
                            />
                        </div>
                        {isLogin && (
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary-accent focus:ring-primary-accent border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember Me</label>
                            </div>
                        )}
                        <div>
                            <button type="submit" className="w-full bg-[#EF6B4A] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#e05a39] transition-colors duration-300">{isLogin ? 'Login' : 'Register'}</button>
                        </div>
                        <div>
                            <button type="button" onClick={() => navigateTo(isLogin ? 'register' : 'login')} className="w-full bg-white text-gray-800 font-bold py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-300">{isLogin ? 'Create an account' : 'Already have an account?'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default AuthPage;