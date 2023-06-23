import { Outlet } from 'react-router-dom'
import BrowseSidebar from './BrowseSidebar'
import { useLocation } from "react-router-dom";
import { useGetTvmoviesQuery } from '../features/tvmovies/tvmoviesApiSlice';
import { useGetUsersQuery } from '../features/users/usersApiSlice';
import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice';
import jwtDecode from 'jwt-decode'

const BrowseLayout = () => {
    
    const location = useLocation();
    const ElementRef = useRef(null)

    const [count, setCount] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    let isBookmarkedids
    let email
    let userId

    // Determine the number of tv shows in search
    useEffect(() => {
        if (searchTerm) {
            setCount(ElementRef.current.childNodes.length)
        }
    }, [setCount, count, searchTerm])

    // Check if there is a token
    const token = useSelector(selectCurrentToken)

    if (token) {
        const decoded = jwtDecode(token)
        const { username } = decoded.UserInfo
        email = username
    }

    const {
        data: tvmovies,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTvmoviesQuery(undefined, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const {
        data,
        isLoading: isLoading2,
        isSuccess: isSuccess2,
        isError: isError2,
        error: error2
    } = useGetUsersQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const users = data?.ids.map(id => data?.entities[id])

    // Get the curent user ID and the ID of bookmarked shows and movies
    if (!isLoading2) {
        for (var j = 0; j < users?.length; j++) {
            if (users[j].username === email) {
                userId = users[j].id
                isBookmarkedids = users[j].isBookmarked
            }
        }
    }

    return (
        <div className='browse'>
            <BrowseSidebar location={location} />
            <main className='browse__main'>
                <Outlet context={[isLoading,
                    isLoading2,
                    isError,
                    isError2,
                    error,
                    error2,
                    isSuccess,
                    isSuccess2,
                    isBookmarkedids,
                    email,
                    userId,
                    searchTerm,
                    setSearchTerm,
                    setCount,
                    count,
                    tvmovies,
                    ElementRef]} />
            </main>
        </div >
    )
}

export default BrowseLayout

