import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Back from '../../../../assets/icons/back-arrow.svg';
import EmptyFile from '../../../../assets/icons/empty-file.svg';
import EditPlayer from '../../../../components/EditPlayer';
import PlayerCard from '../../../../components/PlayerCard';
import Create from '../../../../components/CreateClub';
import CoachDetail from '../../../../components/CoachDetails';
import VideoModal from '../../../../components/VideoModal';

import './index.scss';

const CreateClub = ({ history }) => {
    const { upload }: any = useSelector((state) => state);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const { allUploadData } = upload;

    console.log(allUploadData.data);
    // const { url, TeamA, TeamB } = model_data;
    const [tab, setTab] = useState(1);
    const [showEditModal, setShowEditModal] = useState(false);

    const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const handleChangeTab = (tab, analyzed) => {
        setTab(tab);
    };

    return (
        <div className='step-two'>
            <div
                className='d-flex mt-5 mb-5 mr-3 back '
                onClick={() => history.goBack()}
            >
                <img src={Back} alt='back arrow' className='mr-5' />
                {'   '} Back to Clubs Library
            </div>
            <h3>Coach</h3>
            <CoachDetail />
            <h3 className='mt-5 pt-5'>Club Information</h3>
            <Create />
            <h4 className='mt-5 pt-5'>Video of team in action</h4>
            <div className='col-lg-6 table-row d-flex align-items-center p-3 mt-3'>
                <div className='col-8 d-flex align-items-center'>
                    <div className='mr-2 ml-3'>
                        <img src={EmptyFile} alt='empty-file' />
                    </div>{' '}
                    <div className='pl-5 ml-5'>
                        Manchester United vs Chelsea
                    </div>
                </div>
                <div className='col-2' onClick={() => setShowVideoModal(true)}>
                    View
                </div>
                <div className='col-2 delete'>Add comment</div>
            </div>

            <div className='title mt-5 pt-5'>Players</div>
            <div className='tab-section mt-3'>
                <div
                    className={`tab ${tab === 1 && 'active-tab'}`}
                    onClick={() => handleChangeTab(1, 'all')}
                >
                    Starting 11
                </div>
                <div
                    className={`tab ${tab === 2 && 'active-tab'}`}
                    onClick={() => handleChangeTab(2, true)}
                >
                    Substitutes
                </div>
                <div
                    className={`tab ${tab === 3 && 'active-tab'}`}
                    onClick={() => handleChangeTab(3, false)}
                >
                    Reserves
                </div>
            </div>

            <div className=' form col-lg-8 mt-5'>
                <div className='form-group  mt-5 '>
                    <div>Upload your players details</div>
                    <button className='completete-player px-3'>
                        Players complete
                    </button>{' '}
                    <button className='btn players-add'>11</button>{' '}
                    <button className='completete-player px-3'>
                        View CSV file
                    </button>
                </div>
            </div>

            <div className='player-card-section-cards mt-5'>
                {data.map((item) => (
                    <PlayerCard />
                ))}
            </div>

            {showEditModal && <EditPlayer setShowModal={setShowEditModal} />}
            {showVideoModal && (
                <VideoModal setShowVideoModal={setShowVideoModal} />
            )}
        </div>
    );
};

export default withRouter(CreateClub);
