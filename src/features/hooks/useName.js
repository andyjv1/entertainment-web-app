import { useUpdateUserMutation } from '../users/usersApiSlice';
import iconMovies from '../assets/icon-nav-movies.svg'
import iconTv from '../assets/icon-nav-tv-series.svg'
import iconBookmarkEmpty from '../assets/icon-bookmark-empty.svg'
import iconBookmarkFull from '../assets/icon-bookmark-full.svg'
import { useState } from 'react'
import { useGetTvmoviesQuery } from '../tvmovies/tvmoviesApiSlice';

const useName = (tvmoviesId, isBookmarkedids, userId) => {
     // Get Tv/Movie information

    const { tvmovie } = useGetTvmoviesQuery("tvmoviesList", {
        selectFromResult: ({ data }) => ({
            tvmovie: data?.entities[tvmoviesId]
        }),
    })
        const tvmovieIcon = tvmovie?.category === "TV Series" ? iconTv : iconMovies

        // Check to see if the Tv/Movie is bookedmarked
        let newBookmarkedids
        isBookmarkedids ? newBookmarkedids = [...isBookmarkedids] : newBookmarkedids = []
        const [bookmarked, setBookmarked] = useState(newBookmarkedids.includes(tvmoviesId))

        const [updateUser, {
            isLoading: isLoading3,
            isError: isError3,
            error: error3
        }] = useUpdateUserMutation()

        // Function to bookmark tv/Movie
        const onSaveUserClicked = async (e) => {
            if (newBookmarkedids.includes(tvmoviesId) && !isLoading3) {
                const index = newBookmarkedids.indexOf(tvmoviesId);
                setBookmarked(false)
                if (index > -1) {
                    newBookmarkedids.splice(index, 1)
                }
                await updateUser({
                    id: userId, isBookmarked: newBookmarkedids
                })
            } else {
                setBookmarked(true)
                newBookmarkedids.push(tvmoviesId)
                await updateUser({
                    id: userId, isBookmarked: newBookmarkedids
                })
            }
        }

        // Set the bookmark icon
        let iconBookmark

        !bookmarked ? iconBookmark = (<img src={iconBookmarkEmpty} alt="" />) : iconBookmark = (<img src={iconBookmarkFull} alt="" />)

        return {
            tvmovie,
            onSaveUserClicked,
            tvmovieIcon,
            isError3,
            error3,
            iconBookmark
        }
}

export default useName