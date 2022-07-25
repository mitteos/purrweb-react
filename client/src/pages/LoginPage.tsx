import React, {FC} from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: FC = () => {
    return (
        <div className="container auth__container">
            <LoginForm/>
        </div>
    );
};

export default LoginPage;
