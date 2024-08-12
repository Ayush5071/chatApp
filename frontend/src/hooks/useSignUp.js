// hooks/useSignUp.js
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignUp = () => {
    const { setAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        setLoading(true);
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
        if (!success) return;

        try {
            const res = await fetch('http://localhost:8000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullname: fullName, username, password, confirmPassword, gender })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

const handleInputErrors = ({ fullName, username, password, confirmPassword, gender }) => {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill in all the fields');
        return false;
    }
    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }
    if (password.length < 6) {
        toast.error('Password must contain at least 6 characters');
        return false;
    }
    return true;
};

export default useSignUp;
