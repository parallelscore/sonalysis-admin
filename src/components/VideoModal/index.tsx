import './index.scss';
import Modal from '../layouts/Modal';
import CancelIcon from '../../assets/icons/cancel.svg';
import { withRouter } from 'react-router-dom';

const Approved = ({ setShowVideoModal }) => {
    const vid =
        'https://parallelscore-staging.s3.amazonaws.com//home/pmunis/SonalysisFile/SonalysisVideoProcessingService//jobs/2b278203-fc32-42a1-bfbe-fb487b372722/actionsdetected/vjnVWZKDGTQjiUn7qFkjDu_0_3.mp4';
    return (
        <Modal>
            <div className='container'>
                <div className='video-page col-lg-9 mx-auto text-center'>
                    <div className='cancel-imgage '>
                        <img
                            src={CancelIcon}
                            alt='icon'
                            className=''
                            onClick={() => setShowVideoModal(false)}
                        />
                    </div>
                    <video
                        width='320'
                        height='240'
                        controls
                        id='playBackVideo'
                        className='col-12'
                    >
                        <source src={vid} type='video/mp4' />
                        {/* <source src="movie.ogg" type="video/ogg"> */}
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </Modal>
    );
};

export default withRouter(Approved);
