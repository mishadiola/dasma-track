import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));

        // Clear field validation errors
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
        // Clear global login error
        if (loginError) setLoginError('');
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) {
            newErrors.username = 'Please enter your username';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Please enter your password';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setLoginError('');

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);

            // Check credentials
            if (formData.username === 'admin' && formData.password === 'admin123') {
                console.log('Login successful');
                navigate('/dashboard');
            } else {
                setLoginError('Invalid username or password. Try admin / admin123');
                // Shake effect logic typically handled via CSS class re-trigger, 
                // but just setting state is enough for the message to appear.
            }
        }, 1500);
    };

    return (
        <div className="login-page">
            <div className="login-page__content">
                <div className="login-page__header">
                    <div className="login-page__logo-placeholder">
                        <img src="/src/assets/images/logo-placeholder.png" alt="City Health Office Logo" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
                        <div style={{ display: 'none', width: '80px', height: '80px', background: 'white', borderRadius: '50%', margin: '0 auto' }}></div>
                    </div>
                    <h1 className="login-page__title">Dasmariñas City Health Office 3</h1>
                    <h2 className="login-page__subtitle">Patient & Resource Management System</h2>
                </div>

                <div className="login-card">
                    <h3 className="login-card__title">Staff Login</h3>

                    {loginError && <div className="error-text" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }}>{loginError}</div>}

                    <form className="login-form" onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">Email or Username</label>
                            <div className={`input-wrapper ${errors.username ? 'input-error' : ''}`}>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-input"
                                    placeholder="Enter your email or username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.username && <span className="error-text">{errors.username}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className={`input-wrapper ${errors.password ? 'input-error' : ''}`}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="form-input"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <span className="error-text">{errors.password}</span>}
                        </div>

                        <div className="form-footer">
                            <a href="#" className="forgot-password">Forgot Password?</a>
                        </div>

                        <button type="submit" className="btn-login" disabled={isLoading}>
                            {isLoading ? (
                                <div className="btn-loading-content">
                                    <Loader2 className="spinner" size={20} />
                                    <span>Logging in...</span>
                                </div>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>

                    <div className="login-card__signup">
                        <p>Don't have an account yet? <Link to="/signup" className="signup-link">Sign up</Link></p>
                    </div>

                    <div className="login-card__footer">
                        <hr />
                        <p>Authorized personnel only. Please contact your system administrator for access.</p>
                    </div>
                </div>

                <footer className="login-page__footer">
                    <p>&copy; 2025 City Health Office 3. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default Login;
