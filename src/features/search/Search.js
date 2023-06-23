import iconPlay from '../assets/icon-play.svg'
import { useLocation } from 'react-router-dom'
import useName from '../hooks/useName'

const Search = ({ tvmoviesId, isBookmarkedids, userId, searchTerm }) => {
    const location = useLocation();

    const { tvmovie,
        onSaveUserClicked,
        tvmovieIcon,
        isError3,
        error3,
        iconBookmark } = useName(tvmoviesId, isBookmarkedids, userId)
    
    const image = require(`../assets/thumbnails/${tvmovie.title.replace(/ /g, "-").replace(/’/g, '').replace(/:/g, '').replace(/II/g, '2').toLowerCase()}/regular/large.jpg`)

    const content = (
                <div className='moviestv__box'>
                    <div className='moviestv__image'
                        style={{ backgroundImage: `url(${image}) ` }}
                    >
                        <div className="overlay">
                            <div className="overlay__play">
                                <img src={iconPlay} alt="" />
                                <h4>Play</h4>
                            </div>
                        </div>
                <div className='bookmarked__circle' onClick={onSaveUserClicked}>
                            <div className='bookmarked__icon'>
                        {iconBookmark}
                            </div>
                        </div>
                    </div>
                    <div className='moviestv__textbox'>
                        <div className='moviestv__text'>
                            <p>{tvmovie.year}</p>
                            <span>&#183;</span>
                            <img src={tvmovieIcon} alt="" />
                            <p>{tvmovie.category}</p>
                            <span>&#183;</span>
                            <p>{tvmovie.rating}</p>
                        </div>
                        <h3>{tvmovie.title}</h3>
                        <p
                            style={{ display: isError3? "inline" : null }}
                            className='error'
                >{error3?.data?.message}</p>
                    </div>
                </div>
    )
// Check the url to help with the search
    if (location.pathname === "/browse/tvshows") {
        if (tvmovie) {
            if (tvmovie.category === "TV Series" && tvmovie.title.toLowerCase().includes(searchTerm)
            ) {
                return content
            } else return null
        } else return null

    } else if (location.pathname === "/browse") {
        if (tvmovie) {
            if (tvmovie.title.toLowerCase().includes(searchTerm)
            ) {
                return content
            } else return null

        } else return null

    } else if (location.pathname === "/browse/movies") {
        if (tvmovie) {
            if (tvmovie.category === "Movie" && tvmovie.title.toLowerCase().includes(searchTerm)
            ) {
                return content
            } else return null

        } else return null

    } else {
        if (tvmovie) {
            if (tvmovie.title.toLowerCase().includes(searchTerm)
            ) {
                return content
            } else return null
        } else return null
    }

}
export default Search