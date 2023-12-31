import { store } from '../../app/store'
import { tvmoviesApiSlice } from '../tvmovies/tvmoviesApiSlice'; 
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        store.dispatch(tvmoviesApiSlice.util.prefetch('getTvmovies', 'tvmoviesList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch