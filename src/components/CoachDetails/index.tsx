import { useState, useEffect } from 'react';
import './index.scss';
import CoachPhoto from '../../assets/images/coach-photo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUploadRequest } from '../../store/upload/actions';
import { Link, withRouter } from 'react-router-dom';
import ApproveModal from '../ApproveModal';

const Analytics = ({ all = true }) => {
    const { profile }: any = useSelector((state) => state);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const userId = profile._id;
        handleFetchData({ userId, page: 1, analyzed: 'all' });
    }, []);

    const handleFetchData = ({ userId, page = 1, analyzed }) => {
        dispatch(fetchUploadRequest(userId, page, analyzed));
    };

    return (
        <div className='details-coach'>
            <div className='d-flex align-items-center'>
                <div className='coach-photo mr-5'>
                    <img src={CoachPhoto} alt='images photo' />
                </div>
                <div className='ml-5'>
                    <div className='name'>Jim Halpert</div>
                    <div className='mt-2'>jimhalpert@gmail.com</div>
                    <div className='mt-2'>32yrs Old. Lagos, Nigeria</div>
                </div>
            </div>
            {!all ? (
                <div className='mt-3'>
                    <button className='delete'>Delete</button>{' '}
                    <Link to='/app/clubs/create-club'>
                        <button className='new-btn'>Create new club</button>
                    </Link>
                </div>
            ) : (
                <div className='mt-3'>
                    <button
                        className='approve'
                        onClick={() => setShowModal(true)}
                    >
                        Approve
                    </button>{' '}
                    <button
                        className='pending'
                        onClick={() => setShowModal(true)}
                    >
                        Pending
                    </button>{' '}
                    <button
                        className='delete'
                        onClick={() => setShowModal(true)}
                    >
                        Disapprove
                    </button>
                </div>
            )}
            {showModal && <ApproveModal setShowModal={setShowModal} />}
        </div>
    );
};

export default withRouter(Analytics);
