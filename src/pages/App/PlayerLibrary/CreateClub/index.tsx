import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Back from '../../../../assets/icons/back-arrow.svg';
import Step1 from '../../../../assets/images/step-1.svg';
import StepOneSuccess from '../../../../assets/images/step-success.svg';
import Step2 from '../../../../assets/images/step-2.svg';
import StepTwoSuccess from '../../../../assets/images/step-two-active.svg';
import './index.scss';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

const CreateClub = (props) => {
    const [step, setStep] = useState(1);
    const handleChangeStep = (step) => {
        setStep(step);
    };

    return (
        <div className='create-club'>
            <div
                className='d-flex mt-5 mb-5 mr-3 back '
                onClick={() => props.history.goBack()}
            >
                <img src={Back} alt='back arrow' className='mr-5' />
                {'   '} Back to Created Clubs
            </div>
            <h3>Create Your Club</h3>
            <div className='d-flex mt-5 col-lg-6 justify-content-between '>
                <div className='d-flex align-items-center '>
                    <img
                        src={step === 1 ? Step1 : StepOneSuccess}
                        alt='step 1'
                        className='mr-5'
                    />{' '}
                    <h4 className={step === 1 ? 'step-1' : 'step-success'}>
                        Club Information
                    </h4>
                </div>
                <div className='d-flex align-items-center '>
                    <img
                        src={step === 1 ? Step2 : StepTwoSuccess}
                        alt='step 2'
                        className='mr-5 '
                    />{' '}
                    <h4 className={step === 2 ? 'step-1' : ''}>
                        Add Your Players
                    </h4>
                </div>
            </div>
            {step === 1 ? (
                <StepOne handleChangeStep={handleChangeStep} />
            ) : (
                <StepTwo handleChangeStep={handleChangeStep} />
            )}
        </div>
    );
};

export default withRouter(CreateClub);
