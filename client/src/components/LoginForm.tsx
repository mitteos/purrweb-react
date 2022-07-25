import React, {FC} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import CustomButton from "./UI/CustomButton/CustomButton";
import {SubmitHandler, useForm} from 'react-hook-form';
import FormInput from "./UI/FormInput/FormInput";
import {FormInputsType} from "../types/types";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {login} from "../store/asyncActions/fetchUser";

const LoginForm: FC = () => {

    const {isLoading, isAuth} = useAppSelector(state => state.UserReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const {register, handleSubmit, setValue, watch, reset, formState: {errors}} = useForm<FormInputsType>({mode: 'onBlur'})

    const onSubmit: SubmitHandler<FormInputsType> = async (data) => {
        try {
            dispatch(login(data.email, data.password))
            if(isAuth) navigate('/profile')
        } catch (e) {
            return reset()
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form__container">
            <h1 className="form__title">Авторизация</h1>
            <FormInput
                watch={watch}
                setInputValue={setValue}
                patternValue={{value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu, message: 'Неверный формат'}}
                inputName='email'
                label='Электронная почта'
                register={register}
                error={errors.email?.message}
                requiredProps={true}
                placeholder={'Введите адрес электронной почты'}
            />

            <FormInput
                watch={watch}
                setInputValue={setValue}
                type='password'
                inputName='password'
                label='Пароль'
                requiredProps={true}
                register={register}
                error={errors.password?.message}
                placeholder={'Введите пароль'}
                minLengthProps={{value: 8, message: 'Минимум 8 символов'}}
                maxLengthProps={{value: 20, message: 'Максимум 20 символов'}}
            />

            <CustomButton
                variant={"primary"}
                type={'submit'}
                disabled={!watch('email') || !watch('password') || errors.email || errors.password ? true : false}
                isLoading={isLoading}
            >
                Продолжить
            </CustomButton>

            <div className="form__redirect">
                <span className="form__redirect-text">Еще нет аккаунта?</span>
                <Link to="/registration" className="form__redirect-button">Зарегистрироваться</Link>
            </div>
        </form>
    );
};

export default LoginForm;
