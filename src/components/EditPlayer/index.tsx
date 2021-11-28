import { useState, useRef } from 'react';
import './index.scss';
import Modal from '../layouts/Modal';

const DragNdrop = ({ setShowModal }) => {
    return (
        <Modal>
            <div className='container'>
                <div className='edit-player col-lg-6 mx-auto p-5'>
                    <>
                        <h4 className='text-center'>Player details</h4>
                        <form className=' col-lg-10 mt-5 mx-auto'>
                            <div className='form-group col-lg-4 mx-auto'>
                                <label htmlFor='clubLogo' className='logo'>
                                    Upload Image
                                </label>
                                <input
                                    type='file'
                                    name='clubLogo'
                                    id='clubLogo'
                                    className='playerIma'
                                />
                            </div>
                            <div className='col mt-3'>
                                <div className='form-group  d-flex justify-content-between gap-2'>
                                    <div className='col-md-7'>
                                        <label htmlFor='clubName'>
                                            Player name
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='clubName'
                                            placeholder='Enter club name'
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <label htmlFor='Abbrivation'>
                                            Jersey number
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='Abbrivation'
                                            placeholder='eg. ClubFC'
                                        />
                                    </div>
                                </div>
                                <div className='form-group  mt-4 '>
                                    <label htmlFor='Location'>Position</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='Location'
                                        placeholder='Enter Location'
                                    />
                                </div>
                            </div>
                        </form>
                    </>
                    <div className='d-flex min-cancel justify-content-between mt-5 col-lg-9 mx-auto'>
                        <button
                            onClick={() => setShowModal(false)}
                            className=''
                        >
                            Done
                        </button>
                        <button
                            className='cancel'
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default DragNdrop;
