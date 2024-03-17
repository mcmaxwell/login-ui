import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';
import {
    Register,
    Login,
    CreateNewPassword,
    ForgotPassword,
    Error,
} from './pages';

// actions
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as forgotPasswordAction } from './pages/ForgotPassword';
import { action as createNewPasswordAction } from './pages/CreateNewPassword';

import { store } from './store';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
        errorElement: <Error />,
        action: loginAction(store),
    },
    {
        path: '/register',
        element: <Register />,
        errorElement: <Error />,
        action: registerAction(store),
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
        errorElement: <Error />,
        action: forgotPasswordAction(store),
    },
    {
        path: '/create-new-password',
        element: <CreateNewPassword />,
        errorElement: <Error />,
        action: createNewPasswordAction(store),
    },
]);

function App() {
    return (
        <div className='app'>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
