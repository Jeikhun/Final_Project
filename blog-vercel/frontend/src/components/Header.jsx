import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, NavLink} from 'react-router-dom'

import {checkAuthMe, logout} from '../redux/slices/authSlice';


export const Header = () => {

    const isAuth = useSelector(checkAuthMe);
    const dispatch = useDispatch();

    const activeStyles = {
        color: 'white',
    };

    const handleLogout = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
    };

    return (
        <div className='flex py-4 justify-between items-center'>
            <div>
                <NavLink
                    to={'/'}
                    href='/'
                    className='text-white uppercase flex items-center'
                >
                    <img
                        className='w-10 mr-2'
                        src="https://upload.wikimedia.org/wikipedia/en/0/07/Ala-Too_International_University_Seal.png"
                        alt=""/>

                    Alatoshniki
                </NavLink>
            </div>

            {isAuth && (
                <ul className='flex gap-8'>
                    <li>
                        <NavLink
                            to={'/'}
                            href='/'
                            className='text-xs text-gray-400 hover:text-white'
                            style={({isActive}) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/posts'}
                            href='/'
                            className='text-xs text-gray-400 hover:text-white'
                            style={({isActive}) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            My posts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/create'}
                            href='/'
                            className='text-xs text-gray-400 hover:text-white'
                            style={({isActive}) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Write post
                        </NavLink>
                    </li>
                </ul>
            )}
            <div className='flex items-center'>
                <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
                    {isAuth ? (
                        <button onClick={handleLogout}>Log Out</button>
                    ) : (
                        <Link to={'/login'}> Log In </Link>
                    )}
                </div>
            </div>
        </div>
    );
};
