import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EmptyFile from '../../../../../assets/icons/empty-file.svg';
import { fetchLocation } from '../../../../../store/locations/actions';
import { LoopingRhombusesSpinner } from 'react-epic-spinners';
import './index.scss';

const CreateClub = ({ handleChangeStep }) => {
    const { profile, upload }: any = useSelector((state) => state);
    const { allUploadData, getLoading } = upload;
    const {
        location: { data = [], loading },
    }: any = useSelector((state) => state);
    const dispatch = useDispatch();

    const [files, setFiles]: any = useState({
        logo: '',
        video: '',
    });
    const [fileLogo, setFileLogo] = useState('');
    const [clubData, setClubData] = useState({
        name: '',
        abbrivation: '',
        location: '',
        logo: '',
        video_url: '',
        reason: '',
        status: 'pending',
        coach_id: profile._id,
    });
    console.log({ clubData, files });

    const handleVideoDelete = ({ id, name }) => {};
    const handleOnchange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log({ name });
        if (name == 'logo' || name == 'video') {
            name == 'logo' &&
                setFileLogo(URL.createObjectURL(e.target.files[0]));
            return setFiles({ ...files, [name]: e.target.files[0] });
        }
        setClubData({ ...clubData, [name]: value });
    };

    useEffect(() => {
        dispatch(fetchLocation());
    }, []);

    return (
        <div className='create-club'>
            <form className=' col-lg-8 mt-5'>
                <div className='d-flex justify-content-between align-item-center'>
                    <div className='form-group col-lg-4'>
                        <label htmlFor='clubLogo' className='logo'>
                            {fileLogo && <img src={fileLogo} alt='logo' />}
                            {!fileLogo && 'Upload Your Logo'}
                        </label>
                        <input
                            type='file'
                            name='logo'
                            id='clubLogo'
                            className='logo-file'
                            onChange={handleOnchange}
                            accept='image/*'
                        />
                    </div>
                    <div className='col'>
                        <div className='form-group  d-flex justify-content-between gap-2'>
                            <div className='col-md-8'>
                                <label htmlFor='clubName'>Club Name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='clubName'
                                    name='name'
                                    placeholder='Enter club name'
                                    onChange={handleOnchange}
                                />
                            </div>
                            <div className='col-md-3'>
                                <label htmlFor='Abbrivation'>Abbrivation</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='Abbrivation'
                                    name='abbrivation'
                                    placeholder='eg. ClubFC'
                                    onChange={handleOnchange}
                                />
                            </div>
                        </div>
                        <div className='form-group  mt-4 '>
                            <label htmlFor='Location'>Location</label>
                            <select
                                name='location'
                                id='country'
                                className='form-control'
                                onChange={handleOnchange}
                            >
                                <option value=''>
                                    Please select a country
                                </option>
                                {data?.map((country, index) => (
                                    <option value={country.country} key={index}>
                                        {country.country}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='form-group  mt-5 '>
                    <div>Upload a video of your team in action</div>
                    <label htmlFor='clubVideo' className='upload-video'>
                        Upload Video
                    </label>
                    <input
                        type='file'
                        name='clubVideo'
                        id='clubVideo'
                        className='logo-file'
                    />
                </div>
            </form>
            {getLoading ? (
                <div className='d-flex align-items-center justify-content-center mt-5'>
                    <LoopingRhombusesSpinner color='#811aff' />
                </div>
            ) : (
                <div>
                    {allUploadData?.data &&
                        allUploadData?.data.slice(0, 1)?.map((item, id) => (
                            <div className='col-lg-6 table-row d-flex align-items-center p-3 mt-5'>
                                <div className='col-5 d-flex align-items-center'>
                                    <div className='mr-2 ml-3'>
                                        <img src={EmptyFile} alt='empty-file' />
                                    </div>{' '}
                                    <div className='pl-5 ml-5'>
                                        {item.filename}
                                    </div>
                                </div>
                                <div
                                    className={`col-2 ${
                                        item.analyzed ? 'success' : 'pending'
                                    } status`}
                                >
                                    {item.analyzed ? 'Success' : 'Pending'}
                                </div>
                                <div
                                    className='col-2 delete'
                                    onClick={() =>
                                        handleVideoDelete({
                                            id: item._id,
                                            name: item.filename,
                                        })
                                    }
                                >
                                    Remove
                                </div>
                            </div>
                        ))}
                </div>
            )}
            <button
                className='btn btn-primary mt-5'
                onClick={() => handleChangeStep(2)}
            >
                NEXT
            </button>
        </div>
    );
};

export default withRouter(CreateClub);
