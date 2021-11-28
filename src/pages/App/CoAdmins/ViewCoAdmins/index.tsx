import React, { useState } from 'react';
import '../../Clubs/ViewCoach/index.scss';
import Back from '../../../../assets/icons/back-arrow.svg';
import CoachPhoto from '../../../../assets/images/coach-photo.svg';
import { useSelector } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import CoAdminClubs from '../../../../components/CoAdminClubs';
import endPoint from '../../../../api/endPoints';
import { deleteCall } from '../../../../api/request';
import swal from 'sweetalert';

const ViewCoAdmins = ({ history }) => {
    const { upload }: any = useSelector((state) => state);
    const [isLoading, setIsLoading] = useState(false);
    const { allUploadData } = upload;
    let { admin_id } = useParams();
    const coAdminData = allUploadData.filter(
        (item) => item._id === admin_id
    )[0];

    const handleUserDelete = ({ id, name }) => {
        setIsLoading(true);
        swal({
            title: `You are about deleting ${name}`,
            text: 'Once deleted, you will not be able to recover this Admin',
            icon: 'warning',
            buttons: ['Cancel', 'Delete'],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                deleteCall(endPoint.deleteUserById(id))
                    .then((response) => {
                        setIsLoading(false);
                        if (response.status === 200) {
                            swal('Admin deleted successfully', {
                                icon: 'success',
                            });
                            setTimeout(() => {
                                history.goBack();
                            }, 1000);
                        }
                        if (response.status !== 200) {
                            swal('Oops! something happan', {
                                icon: 'error',
                            });
                        }
                    })
                    .catch((err) => {
                        swal('Oops! something happan', {
                            icon: 'error',
                        });
                    });
            }
            setIsLoading(false);
        });
    };
    return (
        <div className='all-video'>
            <div className='top-coach'>
                <div
                    className='d-flex mt-5 mb-5 mr-3 back '
                    onClick={() => history.goBack()}
                >
                    <img src={Back} alt='back arrow' className='mr-5' />
                    {'   '} Back
                </div>
                <div className='d-flex align-items-center'>
                    <div className='coach-photo mr-5'>
                        <img src={CoachPhoto} alt='A c0-Admin' />
                    </div>
                    <div className='ml-5'>
                        <div className='name'>{coAdminData.fullName}</div>
                        <div className='mt-2'>{coAdminData.email}</div>
                        <div className='mt-2'>{coAdminData?.location}</div>
                    </div>
                </div>
                <button
                    className='delete'
                    onClick={() =>
                        handleUserDelete({
                            id: coAdminData._id,
                            name: coAdminData.fullName,
                        })
                    }
                    disabled={isLoading}
                >
                    Delete{' '}
                    {isLoading && (
                        <div
                            className='spinner-border text-light spinner-border-sm'
                            role='status'
                        >
                            <span className='visually-hidden'>Loading...</span>
                        </div>
                    )}
                </button>
                <button className='new-btn'>Revoke Edit Access</button>
            </div>

            <CoAdminClubs clubs={coAdminData.clubs} />
        </div>
    );
};

export default withRouter(ViewCoAdmins);
