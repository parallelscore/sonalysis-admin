import { useState } from 'react';
import { withRouter } from 'react-router-dom';

import EditPlayer from '../../../../../components/EditPlayer';
import PlayerCard from '../../../../../components/PlayerCard';

import './index.scss';

const CreateClub = ({ handleChangeStep }) => {
    const [tab, setTab] = useState(1);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleChangeTab = (tab) => {
        setTab(tab);
    };

    return (
        <div className='step-two'>
            <div className='tab-section mt-5'>
                <div
                    className={`tab ${tab === 1 && 'active-tab'}`}
                    onClick={() => handleChangeTab(1)}
                >
                    Starting 11
                </div>
                <div
                    className={`tab ${tab === 2 && 'active-tab'}`}
                    onClick={() => handleChangeTab(2)}
                >
                    Substitutes
                </div>
                <div
                    className={`tab ${tab === 3 && 'active-tab'}`}
                    onClick={() => handleChangeTab(3)}
                >
                    Reserves
                </div>
            </div>

            <div className=' form col-lg-8 mt-5'>
                <div className='form-group  mt-5 '>
                    <div>Upload your players details</div>
                    <button
                        className='upload-player px-3'
                        onClick={() => setShowEditModal(true)}
                    >
                        Upload player
                    </button>{' '}
                    <label
                        htmlFor='csvFile'
                        className='upload-player pt-2 px-3 csv-btn'
                    >
                        Upload players from CSV file
                    </label>{' '}
                    <button className='btn players-add'>2</button>
                    <input
                        type='file'
                        name='csvFile'
                        id='csvFile'
                        className='logo-file'
                    />
                </div>
            </div>

            <div className='player-card-section-cards mt-5'>
                <PlayerCard />
                <PlayerCard />
            </div>

            <div className='col-lg-7 d-flex justify-content-between'>
                <button
                    className='btn btn-secondary mt-5'
                    onClick={() => handleChangeStep(1)}
                >
                    Previous step
                </button>
                <button
                    className='btn btn-primary mt-5'
                    onClick={() => handleChangeStep(2)}
                >
                    NEXT
                </button>
            </div>
            {showEditModal && <EditPlayer setShowModal={setShowEditModal} />}
        </div>
    );
};

export default withRouter(CreateClub);
