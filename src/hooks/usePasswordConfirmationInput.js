import { useState, useEffect } from 'react';

function usePasswordConfirmationInput(initialValue, passwordValue) {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState('');
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        if (touched && value.trim() === '') {
            setError('Password confirmation is required');
        } else if (touched && value !== passwordValue) {
            setError('Passwords do not match');
        } else {
            setError('');
        }
    }, [value, passwordValue, touched]);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleBlur = () => {
        setTouched(true);
    };

    return {
        value,
        onChange: handleChange,
        onBlur: handleBlur,
        error,
    };
}

export default usePasswordConfirmationInput;
