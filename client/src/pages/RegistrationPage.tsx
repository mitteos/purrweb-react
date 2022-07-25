import React, {FC, useState} from 'react';
import RegisterForm from "../components/RegisterForm";
import BackArrow from '../static/backArrow.svg';

const RegistrationPage: FC = () => {

    const [step, setStep] = useState(1);

    return (
        <div className="auth__container container">
            {step === 2 &&
				<div
					className="auth__back"
					onClick={() => setStep(1)}
				>
					<img src={BackArrow} alt="" className="auth__back-arrow"/>
					<div className="auth__back-text">Назад</div>
				</div>
            }
            <RegisterForm step={step} setStep={setStep}/>
        </div>
    );
};

export default RegistrationPage;
