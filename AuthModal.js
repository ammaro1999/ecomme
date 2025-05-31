function AuthModal({ isOpen, onClose, language }) {
    try {
        const [mode, setMode] = React.useState('login'); // 'login' or 'signup'
        const [loginMethod, setLoginMethod] = React.useState('email'); // 'email' or 'phone'
        const [formData, setFormData] = React.useState({
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            verificationCode: ''
        });
        const [error, setError] = React.useState('');
        const [isVerifying, setIsVerifying] = React.useState(false);
        const [isLoading, setIsLoading] = React.useState(false);

        const t = translations[language];

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
            setError('');
        };

        const validateForm = () => {
            if (mode === 'signup') {
                if (formData.password !== formData.confirmPassword) {
                    setError(t.passwordsDoNotMatch);
                    return false;
                }
                if (!validatePassword(formData.password)) {
                    setError(t.passwordTooShort);
                    return false;
                }
            }

            if (loginMethod === 'email' && !validateEmail(formData.email)) {
                setError(t.invalidEmail);
                return false;
            }

            if (loginMethod === 'phone' && !validatePhone(formData.phone)) {
                setError(t.invalidPhone);
                return false;
            }

            return true;
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setIsLoading(true);

            try {
                if (!validateForm()) {
                    setIsLoading(false);
                    return;
                }

                const identifier = loginMethod === 'email' ? formData.email : formData.phone;
                const existingUser = await findUserByEmailOrPhone(identifier);

                if (mode === 'signup') {
                    if (existingUser) {
                        setError(t.userAlreadyExists);
                        setIsLoading(false);
                        return;
                    }

                    const verificationCode = generateVerificationCode();
                    // In a real app, send this code via email or SMS
                    console.log('Verification code:', verificationCode);
                    setIsVerifying(true);
                } else {
                    if (!existingUser) {
                        setError(t.userNotFound);
                        setIsLoading(false);
                        return;
                    }

                    const hashedPassword = await hashPassword(formData.password);
                    if (hashedPassword !== existingUser.objectData.password) {
                        setError(t.invalidPassword);
                        setIsLoading(false);
                        return;
                    }

                    // Login successful
                    localStorage.setItem('user', JSON.stringify(existingUser));
                    onClose();
                }
            } catch (error) {
                console.error('Authentication error:', error);
                setError(t.authError);
            }

            setIsLoading(false);
        };

        const handleVerificationSubmit = async (e) => {
            e.preventDefault();
            setIsLoading(true);

            try {
                // In a real app, verify the code here
                const userData = {
                    email: loginMethod === 'email' ? formData.email : '',
                    phone: loginMethod === 'phone' ? formData.phone : '',
                    password: await hashPassword(formData.password),
                    createdAt: new Date().toISOString()
                };

                const user = await saveUser(userData);
                localStorage.setItem('user', JSON.stringify(user));
                onClose();
            } catch (error) {
                console.error('Verification error:', error);
                setError(t.verificationError);
            }

            setIsLoading(false);
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
                <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                        <i className="fas fa-times"></i>
                    </button>

                    <h2 className="text-2xl font-bold mb-6 text-center">
                        {mode === 'login' ? t.login : t.signup}
                    </h2>

                    {!isVerifying ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex gap-4 mb-4">
                                <button
                                    type="button"
                                    className={`flex-1 py-2 rounded ${
                                        mode === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                                    }`}
                                    onClick={() => setMode('login')}
                                >
                                    {t.login}
                                </button>
                                <button
                                    type="button"
                                    className={`flex-1 py-2 rounded ${
                                        mode === 'signup' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                                    }`}
                                    onClick={() => setMode('signup')}
                                >
                                    {t.signup}
                                </button>
                            </div>

                            <div className="flex gap-4 mb-4">
                                <button
                                    type="button"
                                    className={`flex-1 py-2 rounded ${
                                        loginMethod === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                                    }`}
                                    onClick={() => setLoginMethod('email')}
                                >
                                    {t.email}
                                </button>
                                <button
                                    type="button"
                                    className={`flex-1 py-2 rounded ${
                                        loginMethod === 'phone' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                                    }`}
                                    onClick={() => setLoginMethod('phone')}
                                >
                                    {t.phone}
                                </button>
                            </div>

                            {loginMethod === 'email' ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t.email}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t.phone}
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t.password}
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>

                            {mode === 'signup' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t.confirmPassword}
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                </div>
                            )}

                            {error && (
                                <div className="text-red-500 text-sm">{error}</div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                            >
                                {isLoading ? t.processing : (mode === 'login' ? t.login : t.signup)}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerificationSubmit} className="space-y-4">
                            <p className="text-center text-gray-600 mb-4">
                                {t.verificationCodeSent}
                            </p>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t.verificationCode}
                                </label>
                                <input
                                    type="text"
                                    name="verificationCode"
                                    value={formData.verificationCode}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm">{error}</div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                            >
                                {isLoading ? t.processing : t.verify}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('AuthModal component error:', error);
        reportError(error);
        return null;
    }
}
export default AuthModal;