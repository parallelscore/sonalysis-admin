import { useEffect } from 'react';
import './index.scss';
import CoachPhoto from '../../../../assets/images/coach-photo.svg';
import Allclubs from '../../../../components/CoachClubs';
import { useDispatch, useSelector } from 'react-redux';
import Back from '../../../../assets/icons/back-arrow.svg';
import { fetchUploadRequest } from '../../../../store/upload/actions';
import { Link, withRouter, useParams } from 'react-router-dom';

const Analytics = ({ history }) => {
    const { profile, upload }: any = useSelector((state) => state);
    const { allUploadData } = upload;
    let { coach_id } = useParams();
    const dispatch = useDispatch();

    const coachDetails = allUploadData.filter(
        (item) => item._id === coach_id
    )[0];

    console.log({ coach_id, coachDetails, allUploadData });
    useEffect(() => {
        const userId = profile._id;
        handleFetchData({ userId, page: 1, analyzed: 'all' });
    }, []);

    const handleFetchData = ({ userId, page = 1, analyzed }) => {
        dispatch(fetchUploadRequest(userId, page, analyzed));
    };

    return (
        <div className='all-video'>
            <div className='top-coach'>
                <div
                    className='d-flex mt-5 mb-5 mr-3 back '
                    onClick={() => history.goBack()}
                >
                    <img src={Back} alt='back arrow' className='mr-5' />
                    {'   '} Back to Clubs Library
                </div>
                <div className='d-flex align-items-center'>
                    <div className='coach-photo mr-5'>
                        <img src={CoachPhoto} alt='images photo' />
                    </div>
                    <div className='ml-5'>
                        <div className='name'>{coachDetails.fullName}</div>
                        <div className='mt-2'>{coachDetails.email}</div>
                        <div className='mt-2'>{coachDetails?.location}</div>
                    </div>
                </div>
                <button className='delete'>Delete</button>{' '}
                <Link to='/app/clubs/create-club'>
                    <button className='new-btn'>Create new club</button>
                </Link>
            </div>

            <Allclubs clubs={coachDetails.clubs} />
        </div>
    );
};

export default withRouter(Analytics);
