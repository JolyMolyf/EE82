'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import { getUser, logoutUser } from '../../auth/utils';
import { setUser } from '../../lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';

export const NavBar = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();
    
    useEffect(() => {
        getUser().then((data) => {
            dispatch(setUser(data.user));
        });
    }, [dispatch]);

    const handleLogout = () => {
        logoutUser().then(() => {
            router.push('/');
            dispatch(setUser(null));
        });
    }
    return (
        <div className='flex flex-row justify-center items-center gap-4 my-5 bg-gray-100 rounded-3xl py-2 px-4 w-fit mx-auto'>
            <div className='text-2xl font-bold'>Cars Let</div> 
            <div className='cursor-pointer hover:bg-gray-300 rounded-md p-2' onClick={() => router.push('/')}>Home</div>
            {user && <div className='cursor-pointer hover:bg-gray-300 rounded-md p-2' onClick={() => router.push('/panel')}>Panel</div>}
            <div className='flex flex-row gap-4'>
                {!user && <div className='cursor-pointer hover:bg-gray-300 rounded-md p-2' onClick={() => router.push('/auth/login')}>Log In</div>}
                {user && <div className='cursor-pointer hover:bg-gray-300 rounded-md p-2' onClick={handleLogout}>Log Out</div>}
                {user && <p className='p-2'>Cześć, {user?.firstName} {user?.lastName}</p>}
            </div>
        </div>
    )
}

export default NavBar;