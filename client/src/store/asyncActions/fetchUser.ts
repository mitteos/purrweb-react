import { AppDispatch } from "../store";
import {$authHost, $host} from "../../API";
import jwt_decode from "jwt-decode";
import {userSlice} from "../reducers/userSlice";

export const login = (email: string, password: string) => async (dispatch: AppDispatch) =>{
    try {
        dispatch(userSlice.actions.userFetching())
        const {data} = await $host.post('api/user/login', {email, password})
        localStorage.setItem('token', data.token)
        dispatch(userSlice.actions.setUserSuccess(jwt_decode(data.token)))
    } catch (e: any) {
        dispatch(userSlice.actions.setUserError(e.response.data.message))
    }
}

//todo: IUser props

export const registration = (email: string, password: string, name: string, surname: string, phone: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        await $host.post('api/user/registration', {email, password, name, surname, phone,})
        dispatch(userSlice.actions.userRegister())
    } catch (e: any) {
        dispatch(userSlice.actions.setUserError(e.response.data.message))
    }
}

export const check = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        const {data} = await $authHost.get('api/user/auth')
        dispatch(userSlice.actions.setUserSuccess(jwt_decode(data.token)))
        localStorage.setItem('token', data.token)
    } catch (e: any) {
        dispatch(userSlice.actions.userLogout())
    }
}