import { useState } from 'react';

function usePasswordInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleBlur = () => {
        if (value.trim() === '') {
            setError('Password is required');
        } else if (value.length < 8) {
            setError('Password should be at least 8 characters long');
        } else {
            setError('');
        }
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

export default usePasswordInput;
