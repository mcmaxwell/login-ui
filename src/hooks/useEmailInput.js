import { useState } from 'react';

function useEmailInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleBlur = () => {
        if (value.trim() === '') {
            setError('Email is required');
        } else if (!validateEmail(value)) {
            setError('Invalid email address');
        } else if (value.length < 15) {
            setError('Email should be at least 15 characters long');
        } else {
            setError('');
        }
    };

    const validateEmail = (email) => {
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return emailRegex.test(email);
    };

    const onReset = () => {
        setValue(initialValue);
    };

    return {
        value,
        onChange: handleChange,
        onBlur: handleBlur,
        error,
        onReset,
    };
}

export default useEmailInput;
