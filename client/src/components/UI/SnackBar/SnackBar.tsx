import React, {useEffect, useState} from 'react';
import cl from './SnackBar.module.css';
import {useAppSelector} from "../../../hooks/redux";

const SnackBar = () => {

    const {error, isLoading} = useAppSelector(state => state.UserReducer);
    const [active, setActive] = useState<boolean>(!!error)

    useEffect(() => {
        if(error && !isLoading) {
            setActive(true)
            setTimeout(() => {
                setActive(false)
            }, 3000)
        }
    }, [isLoading])

    return (
        <div className={cl.snackbar__container}>
            {active && <div className={cl.snackbar__item}>{error}</div>}
        </div>
    );
};

export default SnackBar;