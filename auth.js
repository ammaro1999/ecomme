const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePhone = (phone) => {
    const re = /^\+?[\d\s-]{8,}$/;
    return re.test(phone);
};

const validatePassword = (password) => {
    return password.length >= 8;
};

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const hashPassword = async (password) => {
    // In a real application, use a proper password hashing library
    return password; // This is just for demonstration
};

const saveUser = async (userData) => {
    try {
        const user = await trickleCreateObject('user', userData);
        return user;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    }
};

const findUserByEmailOrPhone = async (identifier) => {
    try {
        const users = await trickleListObjects('user');
        return users.items.find(user => 
            user.objectData.email === identifier || 
            user.objectData.phone === identifier
        );
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
};
