import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import {Navigate} from "react-router-dom";

// export const routes = [
//     {path: '/profile', element: <ProfilePage />},
//     {path: '/login', element: <LoginPage />},
//     {path: '/registration', element: <RegistrationPage />},
// ]

export const authRoutes = [
    {path: '/profile', element: <ProfilePage />},
    {path: '*', element: <Navigate to='/profile' replace={true} />}
]

export const publicRoutes = [
    {path: '/login', element: <LoginPage />},
    {path: '/registration', element: <RegistrationPage />},
    {path: '*', element: <Navigate to='/login' replace={true} />}
]