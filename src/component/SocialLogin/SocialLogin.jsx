import qoogleLogo from '../../assets/images/google.svg';
import githubLogo from '../../assets/images/github.svg';
import './SocialLogin.css';

const SocialLogin = () => {
    const handleClick = (e) => { 
        e.preventDefault();
        alert('Sign in with ' + e.target.textContent + ' is not implemented yet');
    };

    return (
        <div className='social-login-wrapper'>
            <button
                className='button social-login'
                onClick={(e) => handleClick(e)}
            >
                <img
                    src={qoogleLogo}
                    alt='Google logo'
                    width={18}
                    height={18}
                />
                Google
            </button>
            <button
                className='button social-login'
                onClick={(e) => handleClick(e)}
            >
                <img
                    src={githubLogo}
                    alt='Github logo'
                    width={19}
                    height={18}
                />
                Github
            </button>
        </div>
    );
};
export default SocialLogin;