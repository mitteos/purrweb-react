import React, {FC} from 'react';
import CustomButton from "./UI/CustomButton/CustomButton";
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import FormInput from "./UI/FormInput/FormInput";
import {FormInputsType} from "../types/types";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {registration} from "../store/asyncActions/fetchUser";


interface RegisterFormProps {
    step: number;
    setStep: (num: number) => void
}


const RegisterForm: FC<RegisterFormProps> = ({step, setStep}) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {isLoading} = useAppSelector(state => state.UserReducer)

    const {
        register,
        setValue,
        reset,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<FormInputsType>({mode: 'onBlur'})

//todo: не работает try catch((
    const onSubmit: SubmitHandler<FormInputsType> = async (data) => {
        try {
            dispatch(registration(data.email, data.password, data.name, data.surname, data.phone))
            navigate('/login')
        } catch (e) {
            reset()
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                { step === 1 && <div className="form__container">
                    <h1 className="form__title">Регистрация</h1>

                    <FormInput
                        watch={watch}
                        error={errors.email?.message}
                        requiredProps={true}
                        inputName='email'
                        type='email'
                        label='Электронная почта'
                        placeholder='example@mail.ru'
                        register={register}
                        minLengthProps={{value: 3, message: 'Минимум 3 символа'}}
                        setInputValue={setValue}
                        patternValue={{
                            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                            message: 'Неверный формат'
                        }}
                    />

                    <FormInput
                        watch={watch}
                        error={errors.password?.message}
                        inputName='password'
                        type='password'
                        placeholder='Введите пароль'
                        label='Пароль'
                        register={register}
                        requiredProps={true}
                        setInputValue={setValue}
                        minLengthProps={{value: 8, message: 'Минимум 8 символов'}}
                        maxLengthProps={{value: 20, message: 'Максимум 20 символов'}}
                    />

                    <FormInput
                        watch={watch}
                        inputName='password_repeat'
                        type='password'
                        label='Повтор пароля'
                        placeholder='Повторите пароль'
                        register={register}
                        error={errors.password_repeat?.message}
                        validateValue={value => value === watch('password') || 'Пароли не совпадают'}
                        setInputValue={setValue}
                        requiredProps={false}
                    />

                    <CustomButton
                        variant={"primary"}
                        onClick={() => setStep(2)}
                        disabled={!watch('email', 'password') || !watch('password_repeat') || errors.email || errors.password || errors.password_repeat ? true : false}
                    >
                        Продолжить
                    </CustomButton>

                    <div className="form__redirect">
                        <span className="form__redirect-text">Уже есть аккаунт?</span>
                        <Link to="/login" className="form__redirect-button">Войти</Link>
                    </div>
                </div> }

                { step === 2 && <div className="form__container">
                    <h1 className="form__title">Заполните данные о себе</h1>

                    <FormInput
                        watch={watch}
                        error={errors.name?.message}
                        requiredProps={true}
                        inputName='name'
                        label='Имя'
                        placeholder='Введите имя'
                        register={register}
                        setInputValue={setValue}
                    />

                    <FormInput
                        watch={watch}
                        error={errors.surname?.message}
                        inputName='surname'
                        placeholder='Введите фамилию'
                        label='Фамилия'
                        register={register}
                        requiredProps={true}
                        setInputValue={setValue}
                    />

                    <FormInput
                        watch={watch}
                        inputName='phone'
                        label='Телефон'
                        placeholder='+7 (333)-333-33-33'
                        register={register}
                        error={errors.phone?.message}
                        setInputValue={setValue}
                        requiredProps={true}
                        patternValue={{value: /^(\+7|7|8)?\s?\(?[489]\d{2}\)?\s?\d{3}\s?\d{2}\s?\d{2}$/, message: 'Неверный формат'}}
                    />

                    <CustomButton
                        variant={"primary"}
                        type="submit"
                        disabled={!watch('name', 'surname') || !watch('phone') || errors.name || errors.surname || errors.phone ? true : false}
                        isLoading={isLoading}
                    >
                        Продолжить
                    </CustomButton>
                </div> }
            </form>
        </div>
    );
};

export default RegisterForm;
