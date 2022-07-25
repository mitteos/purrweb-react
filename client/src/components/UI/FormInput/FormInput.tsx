import React, {FC, HTMLProps, useState} from 'react';
import {Path, UseFormRegister, UseFormSetValue, Validate} from 'react-hook-form';
import {FormInputsType} from "../../../types/types";
import cl from './FormInput.module.css';
import EyeCloseIcon from '../../../static/eye_close.svg';
import EyeOpenIcon from '../../../static/eye_open.svg';

interface FormInputProps {
    setInputValue: UseFormSetValue<FormInputsType>
    inputName: Path<FormInputsType>
    label: string;
    patternValue?: {
        value: RegExp;
        message: string;
    };
    requiredProps: boolean;
    register: UseFormRegister<FormInputsType>
    watch: (names?: string | string[]) => string
    watchInputName?: string;
    validateValue?: Validate<any>
    error: string | undefined;
    minLengthProps?: {
        value: number,
        message: string;
    }
    maxLengthProps?: {
        value: number,
        message: string
    };
}

const FormInput: FC<FormInputProps & HTMLProps<HTMLInputElement>> = ({watch, type, setInputValue, error, inputName, label, register, requiredProps, patternValue, validateValue, minLengthProps, maxLengthProps, ...standartInputProps}) => {

    const [swapType, setSwapType] = useState(type);

    return (
        <div className={cl.form__container}>
            <label htmlFor={`form__input-${inputName}`} className={cl.form__input_label}>{label}</label>
            <div className={cl.input__wrapper}>
                <input
                    className={[cl.form__input, watch(inputName) && !error && cl.valid, error && cl.invalid].join(' ')}
                    // className={[cl.form__input, watch(inputName) && error ? cl.invalid : cl.valid].join(' ')}
                    id={inputName}
                    type={swapType}
                    {...standartInputProps}
                    {...register(inputName, {required: {value: requiredProps, message: 'Не может быть пустым'}, pattern: patternValue, validate: validateValue, minLength: minLengthProps, maxLength: maxLengthProps})}
                />
                <div className={cl.input__control}>
                    {type === 'password' &&
						<img
                            className={cl.input__control_swap}
                            src={swapType === 'password' ? EyeCloseIcon : EyeOpenIcon}
                            onClick={() => setSwapType(swapType === 'password' ? 'text' : 'password')}
                            alt=""
                        />
                    }
                    {error
                        ? <svg
                            onClick={() => setInputValue(inputName, '')}
                            className={[cl.input__control_clear, !watch(inputName) ? '' : cl.active, error && cl.invalid].join(' ')}
                            width="12" height="12" viewBox="0 0 12 12"
                            fill="none" xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.9998 0.999848C10.8436 0.843622 10.6317 0.755859 10.4107 0.755859C10.1897 0.755859 9.97779 0.843622 9.82152 0.999848L5.99985 4.82152L2.17818 0.999848C2.02191 0.843622 1.80998 0.755859 1.58901 0.755859C1.36804 0.755859 1.15612 0.843622 0.999848 0.999848C0.843622 1.15612 0.755859 1.36804 0.755859 1.58901C0.755859 1.80998 0.843622 2.02191 0.999848 2.17818L4.82152 5.99985L0.999848 9.82152C0.843622 9.97779 0.755859 10.1897 0.755859 10.4107C0.755859 10.6317 0.843622 10.8436 0.999848 10.9998C1.15612 11.1561 1.36804 11.2438 1.58901 11.2438C1.80998 11.2438 2.02191 11.1561 2.17818 10.9998L5.99985 7.17818L9.82152 10.9998C9.97779 11.1561 10.1897 11.2438 10.4107 11.2438C10.6317 11.2438 10.8436 11.1561 10.9998 10.9998C11.1561 10.8436 11.2438 10.6317 11.2438 10.4107C11.2438 10.1897 11.1561 9.97779 10.9998 9.82152L7.17818 5.99985L10.9998 2.17818C11.1561 2.02191 11.2438 1.80998 11.2438 1.58901C11.2438 1.36804 11.1561 1.15612 10.9998 0.999848Z"/>
                        </svg>
                        : watch(inputName) && <svg className={cl.input__control_success} width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.26127 8.90543L3.73294 12.3771C4.20176 12.8458 4.83753 13.1091 5.50044 13.1091C6.16335 13.1091 6.79912 12.8458 7.26794 12.3771L17.9896 1.65542C18.1414 1.49826 18.2254 1.28775 18.2235 1.06926C18.2216 0.850759 18.134 0.641748 17.9795 0.487242C17.8249 0.332735 17.6159 0.245094 17.3974 0.243196C17.1789 0.241297 16.9684 0.325292 16.8113 0.477091L6.0896 11.1988C5.93333 11.355 5.72141 11.4427 5.50044 11.4427C5.27947 11.4427 5.06754 11.355 4.91127 11.1988L1.4396 7.72709C1.28244 7.57529 1.07193 7.4913 0.853436 7.4932C0.634939 7.49509 0.425928 7.58274 0.271421 7.73724C0.116915 7.89175 0.0292739 8.10076 0.0273753 8.31926C0.0254766 8.53775 0.109472 8.74826 0.26127 8.90543Z" fill="#17BC77"/>
                        </svg>
                    }
                </div>
            </div>
            {error && <div className={cl.input__error}>{error}</div>}
        </div>
    );
};

export default FormInput;
