import { useRouteError, Link } from 'react-router-dom';
import Logo from '../component/Logo/Logo';

const Error = () => {
    const error = useRouteError();

    if (error.status === 404) {
        return (
            <main className='main'>
                <div className='ui-login-container'>
                    <Logo />

                    <p>404</p>
                    <h1 className='main-title'>page not found</h1>
                    <p>Sorry, we couldn’t find the page you’re looking for.</p>
                    <div>
                        <Link to='/'>go back home</Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className='main'>
            <div className='ui-login-container'>
                <Logo />
                <h1 className='main-title'>there was an error...</h1>
                <h4 className='text-center font-bold text-4xl'>there was an error...</h4>
            </div>
        </main>
    );
};
export default Error;
