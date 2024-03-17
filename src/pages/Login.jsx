import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { loginUser } from '../features/user/userSlice';
import { Form, Link } from 'react-router-dom';
import Logo from '../component/Logo/Logo';
import SocialLogin from '../component/SocialLogin/SocialLogin';
import Separator from '../component/Separator/Separator';
import { useState } from 'react';
import useEmailInput from '../hooks/useEmailInput';
import eye from '../assets/images/eye.svg';
import usePasswordInput from '../hooks/usePasswordInput';
import SubmitBtn from '../component/SubmitBtn';

export const action =
    (store) =>
        async ({ request }) => {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);

            try {
                const response = await customFetch.post('/v1/auth/login', data);
                store.dispatch(loginUser(response.data));
                toast.success('logged in successfully');
            } catch (error) {
                const errorMessage =
                error?.response?.data?.error?.message ||
                'please double check your credentials';
                toast.error(errorMessage);
                return null;
            }
        };

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const emailInput = useEmailInput('');
    const passwordInput = usePasswordInput('');

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        if (emailInput.error === '' && passwordInput.error === '') {
            // Form submission logic goes here
            console.log('Form submitted with email:', emailInput.value);
        } else {
            console.log('Form submission blocked due to invalid email');
            e.preventDefault();
        }
    };

    
    return (
        <main className='main'>
            <div className='ui-login-container'>
                <Logo />
                <h1 className='main-title'>Log in to your account</h1>
                <SocialLogin />

                <Separator text='Or' />
                <Form
                    method='POST'
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className='input-email'>
                        <input
                            type='text'
                            name='email'
                            placeholder='Work Email'
                            value={emailInput.value}
                            onChange={emailInput.onChange}
                            onBlur={emailInput.onBlur}
                            required
                            className={emailInput.error ? 'error' : ''}
                        />
                        {emailInput.error && (
                            <p className='error'>{emailInput.error}</p>
                        )}
                    </div>
                    <div className='input-password'>
                        <div className='password-field-wrapper'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='Password'
                                {...passwordInput}
                                required
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
                    <div className='forgot-password-wrapper'>
                        <Link to='/forgot-password'>Forgot your password?</Link>
                    </div>
                    <SubmitBtn text='Log in to Qencode' />
                    <div className='forgot-password'>
                        Is your company new to Qencode? &nbsp;
                        <Link to='/register'>Sign up</Link>
                    </div>
                </Form>
            </div>
        </main>
    );
};
export default Login;
