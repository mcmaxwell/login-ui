import { Form } from 'react-router-dom';
import Logo from '../component/Logo/Logo';
import SubmitBtn from '../component/SubmitBtn';
import { loginUser } from '../features/user/userSlice';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { useState } from 'react';
import usePasswordInput from '../hooks/usePasswordInput';
import eye from '../assets/images/eye.svg';
import usePasswordConfirmationInput from '../hooks/usePasswordConfirmationInput';

export const action =
    (store) =>
        async ({ request }) => {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);

            try {
                const response = await customFetch.post(
                    '/v1/auth/password-set',
                    data
                );
                store.dispatch(loginUser(response.data));
                toast.success('request submitted successfully');
            } catch (error) {
                const errorMessage =
                error?.response?.data?.error?.message ||
                'please double check your credentials';
                toast.error(errorMessage);
            }
        };

const CreateNewPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const passwordInput = usePasswordInput('');
    const passwordConfirmationInput = usePasswordConfirmationInput(
        '',
        passwordInput.value
    );

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        if (passwordInput.error === '') {
            // Form submission logic goes here
            console.log('Check your password');
        } else {
            console.log('Form submission blocked due to invalid email');
            e.preventDefault();
        }
    };

    return (
        <main className='main'>
            <div className='ui-login-container'>
                <Logo />
                <h1 className='main-title'>Create new Password?</h1>

                <Form
                    method='POST'
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className='input-password'>
                        <label
                            className='label'
                            htmlFor='confirm-password'
                        >
                            Password
                        </label>
                        <div className='password-field-wrapper'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='Password'
                                {...passwordInput}
                                required
                                id='password'
                                className={passwordInput.error ? 'error' : ''}
                            />
                            <button
                                className='password-visibility-toggle'
                                onClick={(e) => togglePasswordVisibility(e)}
                            >
                                <img
                                    src={eye}
                                    alt='Show password'
                                />
                                <span className='visually-hidden'>
                                    Show password
                                </span>
                            </button>
                        </div>

                        {passwordInput.error && (
                            <p className='error'>{passwordInput.error}</p>
                        )}
                    </div>
                    <div className='input-password'>
                        <label
                            className='label'
                            htmlFor='confirm-password'
                        >
                            Confirm Password
                        </label>
                        <div className='password-field-wrapper'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='Password'
                                {...passwordConfirmationInput}
                                required
                                id='confirm-password'
                                className={
                                    passwordConfirmationInput.error
                                        ? 'error'
                                        : ''
                                }
                            />
                            <button
                                className='password-visibility-toggle'
                                onClick={(e) => togglePasswordVisibility(e)}
                            >
                                <img
                                    src={eye}
                                    alt='Show password'
                                />
                                <span className='visually-hidden'>
                                    Show password
                                </span>
                            </button>
                        </div>
                        {passwordConfirmationInput.error && (
                            <p className='error'>
                                {passwordConfirmationInput.error}
                            </p>
                        )}
                    </div>
                    <SubmitBtn text='Reset Password' />
                </Form>
            </div>
        </main>
    );
};
export default CreateNewPassword;
