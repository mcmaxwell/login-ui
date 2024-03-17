import './Separator.css';

const Separator = ({text}) => {
    return (
        <div className='separator-wrapper'>
            <div className='separator-line'></div>
            {text && <div className='separator-text'>{text}</div>}
            <div className='separator-line'></div>
        </div>
    );
};
export default Separator;