import {IUser} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface stateProps {
    userInfo: IUser;
    isAuth: boolean;
    isLoading: boolean;
    error: string;
}

const initialState: stateProps = {
    userInfo: {} as IUser,
    isAuth: false,
    isLoading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userFetching(state) {
            state.isLoading = true
        },
        setUserSuccess(state, action: PayloadAction<IUser>) {
            state.isLoading = false
            state.error = ''
            state.userInfo = action.payload
            state.isAuth = true
        },
        setUserError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        userRegister(state) {
            state.isLoading = false
            state.error = ''
        },
        userLogout(state) {
            state.userInfo = {} as IUser
            state.isLoading= false
            state.isAuth = false
            localStorage.removeItem('token')
        }
    }
})

export default userSlice.reducer;