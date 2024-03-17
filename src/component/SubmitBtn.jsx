import { useNavigation } from 'react-router-dom';

const SubmitBtn = ({ text }) => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <button
            type='submit'
            className='button primary submit-button'
            disabled={isSubmitting}
        >
            {isSubmitting ? (
                <>
          sending...
                </>
            ) : (
                text || 'submit'
            )}
        </button>
    );
};
export default SubmitBtn;
