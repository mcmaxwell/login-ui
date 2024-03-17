import { Link } from 'react-router-dom';
import qencodeLogo from '../../assets/images/logo.svg';

const Logo = () => {
    return (
        <Link to='/'>
            <img
                src={qencodeLogo}
                className='app-logo'
                alt='logo'
                width={179}
                height={32}
            />
        </Link>
    );
};
export default Logo;
