import { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { authenticateUser } from '../../statefeatures/authentication/authSlice';
import { getCsrfToken } from '../../functions/Authentication/auth';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const _dispatch = {
    "/login": "/dashboard",
    "/signup": "/dashboard",
}

// a wrapper function that will be used to wrap the authentication pages
export default function Authentication({ children }) {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentPathName = window.location.pathname;

    useEffect(() => {
        getCsrfToken();
    }, []);

    useEffect(() => {
        if (auth.isAuthenticated) {
            if (_dispatch[currentPathName]) {
                navigate(_dispatch[currentPathName]);
            }
        }
        else if (auth.error) {
            if (currentPathName !== '/signup') {
                navigate('/login');
            }
        }
        else {
            dispatch(authenticateUser());
        }
    }, [auth.isAuthenticated, auth.error, dispatch, navigate, currentPathName]);

    if (auth.loading === true && !auth.isAuthenticated) {
        return (
        <div className='w-full h-full flex justify-center items-center'>
            <div>
                <CircularProgress />
            </div>
        </div>
        );
    }
    else {
        return children;
    }
}