import { useState, useEffect } from 'react';
import './index.scss';
import CoachPhoto from '../../../../assets/images/coach-photo.svg';
import { getCall, postCall } from '../../../../api/request';
import endPoint from '../../../../api/endPoints';

import Allclubs from '../../../../components/AllClubs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUploadRequest } from '../../../../store/upload/actions';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const Analytics = () => {
    const { profile, upload }: any = useSelector((state) => state);
    const { allUploadData = [], getLoading, getError } = upload;

    const [coachData, setCoachData] = useState([]);
    const [clubData, setClubData] = useState();
    const [postLoading, setPostLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const userId = profile._id;
        handleFetchData({ userId, page: 1, analyzed: 'all' });
        getAllClubs();
    }, []);

    const handleFetchData = ({ userId, page = 1, analyzed }) => {
        dispatch(fetchUploadRequest(userId, page, analyzed));
    };

    const getAllClubs = () => {
        getCall(endPoint.getAllClub)
            .then((response) => {
                console.log('response.data.data vnvkvnklv', response.data.data);
                if (response.status === 200) {
                    setClubData(response.data.data);
                }
                if (response.status === 404 || response.status === 403) {
                }
            })
            .catch(() => {});
    };

    const sendCSV = (e) => {
        setPostLoading(true);
        const data = e.target.files[0];
        let formData = new FormData();
        formData.append('file', data);
        console.log({ data });
        postCall(endPoint.csvUpload, formData)
            .then((response) => {
                setPostLoading(false);
                console.log('response.data.data vnvkvnklv', response);
                if (response.status === 200) {
                    swal('Success', 'players created successfully!', 'success');
                    return;
                }
                swal('Error', 'something happen try again', 'error');
            })
            .catch(() => {
                setPostLoading(false);
                swal('Error', 'something happen try again', 'error');
            });
    };

    const getApprovedOrPending = (clubs, value) => {
        return clubs.filter((item) => item.status === value).length;
    };

    return (
        <div className='all-video'>
            <div className='top-coach'>
                <div className='d-flex justify-content-between align-items-center col-12 mt-5'>
                    <div className='title'>Coaches</div>
                    <Link to='/app/clubs/all-coaches' className='see-all'>
                        See All
                    </Link>
                </div>
                <div className='card-section d-flex justify-content-evenly flex-wrap'>
                    {allUploadData.length &&
                        allUploadData
                            .filter((item) => item.role === 'coach')
                            ?.slice(0, 4)
                            ?.map((coach) => (
                                <div className='card-coach mt-5 mr-5'>
                                    <img src={CoachPhoto} alt='coach photo' />
                                    <div className='name mt-2'>Name:</div>
                                    <div className=''>{coach.fullName}</div>
                                    <div className='name mt-2'>
                                        Approved Clubs
                                    </div>
                                    <div className='approve'>
                                        {getApprovedOrPending(
                                            coach.clubs,
                                            'approved'
                                        )}
                                    </div>
                                    <div className='name'>Pending Clubs</div>
                                    <div className='pending'>
                                        {getApprovedOrPending(
                                            coach.clubs,
                                            'pending'
                                        )}
                                    </div>

                                    <Link
                                        to={`/app/clubs/view-coach/${coach._id}`}
                                    >
                                        <button>View</button>
                                    </Link>
                                </div>
                            ))}
                </div>
                <div className='d-flex'>
                    <Link to='/app/clubs/create-club'>
                        <button className='new-btn'>Create new</button>
                    </Link>
                    {/* <form>
            <label htmlFor="csv-upload" className=" upload-btn">
            {postLoading?<LoopingRhombusesSpinner />:
              "Upload players via CSV"}
            </label>
            <input type="file" id="csv-upload" className="d-none" accept="text/csv" onChange={sendCSV} />
          </form> */}
                </div>
            </div>

            <Allclubs />
        </div>
    );
};

export default Analytics;
