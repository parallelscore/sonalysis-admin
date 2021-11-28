import './index.scss';
import Modal from '../layouts/Modal';
import { withRouter } from 'react-router-dom';

const Approved = ({ setShowModal }) => {
    return (
        <Modal>
            <div className='container'>
                <div className='approved col-lg-6 mx-auto text-center'>
                    <div className='text'>
                        Please state why you are pending Jim’s club creation
                    </div>
                    <form>
                        <div>
                            <textarea
                                className='col-lg-9'
                                placeholder='Please type in your reason...'
                            ></textarea>
                        </div>
                        <div className='d-flex justify-content-between col-lg-7 mx-auto'>
                            <button
                                className='btn-cancel'
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className='btn-submit'
                                onClick={() => setShowModal(false)}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default withRouter(Approved);
