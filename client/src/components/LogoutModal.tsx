import React, {FC, useState} from 'react';
import CloseModal from '../static/closeModal.svg';
import CustomButton from "./UI/CustomButton/CustomButton";
import {useAppDispatch} from "../hooks/redux";
import {userSlice} from "../store/reducers/userSlice";

interface LogoutModalProps {
    visibleLogoutModal: boolean;
    setVisibleLogoutModal: (visibleLogoutModal: boolean) => void
}

const LogoutModal: FC<LogoutModalProps> = ({visibleLogoutModal, setVisibleLogoutModal}) => {

    document.body.style.overflow = visibleLogoutModal ? 'hidden' : 'auto'

    const [dragValue, setDragValue] = useState<number>(0);
    const [dragStart, setDragStart] = useState<number>(0);
    const [transitionValue, setTransitionValue] = useState('');
    const [dragged, setDragged] = useState<boolean>(false);
    const dispatch = useAppDispatch()

    const dragModal = (e: React.TouchEvent<HTMLDivElement>) => {
        if(dragged) {
            setDragValue(e.touches[0].pageY - dragStart)
        }
    }

    const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setDragged(true)
        setDragStart(e.touches[0].pageY)
        setTransitionValue('all 0s')
    }
    const touchEnd = () => {
        setDragged(false)
        setTransitionValue('all .3s ease')
        if(dragValue > 60) {
            setVisibleLogoutModal(false)
        }
        setDragValue(0)
    }

    const logout = () => {
        dispatch(userSlice.actions.userLogout())
        setVisibleLogoutModal(false)
    }

    return (
        <div
            className={`logout ${!visibleLogoutModal ? 'disabled' : ''}`}
            onClick={() => setVisibleLogoutModal(false)}
        >
            <div
                className="logout__container"
                style={window.innerWidth < 450 ? {bottom: '-' + dragValue + 'px', transition: transitionValue} : {}}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="logout__title">Вы уверены что хотите выйти из аккаунта?</div>
                <div className="logout__control">
                    {/*<button*/}
                    {/*    className="secondary__button"*/}
                    {/*    onClick={() => setVisibleLogoutModal(false)}*/}
                    {/*>*/}
                    {/*    Отмена*/}
                    {/*</button>*/}
                    <CustomButton
                        variant='secondary'
                        additionalClass='logout__button'
                        onClick={() => setVisibleLogoutModal(false)}
                    >Отмена</CustomButton>

                    <CustomButton
                        variant='primary'
                        additionalClass='logout__button'
                        onClick={() => logout()}
                    >Выйти</CustomButton>

                </div>
                <img
                    src={CloseModal}
                    alt="close modal icon"
                    className="logout__close"
                    onClick={() => setVisibleLogoutModal(false)}
                />
                <div
                    onTouchStart={(e) => touchStart(e)}
                    onTouchMove={(e) => dragModal(e)}
                    onTouchEnd={() => touchEnd()}
                    className="logout__mobile-button"
                ></div>
            </div>
        </div>
    );
};

export default LogoutModal;
