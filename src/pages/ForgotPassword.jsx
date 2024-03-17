import { Form, useNavigate, redirect } from 'react-router-dom';
import Logo from '../component/Logo/Logo';
import SubmitBtn from '../component/SubmitBtn';
import { loginUser } from '../features/user/userSlice';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import useEmailInput from '../hooks/useEmailInput';

export const action =
    (store) =>
        async ({ request }) => {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);

            try {
                const response = await customFetch.post('/v1/auth/password-reset', data);
                store.dispatch(loginUser(response.data));
                toast.success('request submitted successfully');
                return redirect('/create-new-password');
            } catch (error) {
                const errorMessage =
                error?.response?.data?.error?.message ||
                'please double check your credentials';
                toast.error(errorMessage);
                return redirect('/create-new-password');
            }
        };

const ForgotPassword = () => {
    const emailInput = useEmailInput('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        if (emailInput.error === '') {
            // Form submission logic goes here
            console.log('Form submitted with email:', emailInput.value);
        } else {
            console.log('Form submission blocked due to invalid email');
            e.preventDefault();
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/');
    };
    
    return (
        <main className='main'>
            <div className='ui-login-container'>
                <Logo />
                <h1 className='main-title'>Forgot Password?</h1>

                <Form
                    method='POST'
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className='input-email'>
                        <input
                            type='text'
                            name='email'
                            placeholder='Enter your email'
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
                    <SubmitBtn text='Sent' />
                    <button className='button' onClick={(e) => handleClick(e)}>Cancel</button>
                </Form>
            </div>
        </main>
    );
};
export default ForgotPassword;
