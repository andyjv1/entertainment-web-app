import TvMoviesBox from '../tvmovies/TvMoviesBox'
import iconBookmarkFull from '../assets/icon-bookmark-full.svg'
import useName from '../hooks/useName'

const Bookmarkedmovie = ({ tvmoviesId, isBookmarkedids, userId }) => {
    
    const { tvmovie,
        onSaveUserClicked,
        tvmovieIcon,
        isError3,
        error3 } = useName(tvmoviesId, isBookmarkedids, userId)

    if (tvmovie) {

        if (tvmovie.category === "Movie") {
            const image = require(`../assets/thumbnails/${tvmovie.title.replace(/ /g, "-").replace(/’/g, '').replace(/:/g, '').replace(/II/g, '2').toLowerCase()}/regular/large.jpg`)

            return (<TvMoviesBox image={image}
                onSaveUserClicked={onSaveUserClicked}
                tvmovieIcon={tvmovieIcon}
                tvmovie={tvmovie}
                isError={isError3}
                error={error3}
                iconBookmark={<img src={iconBookmarkFull} alt="" />} />)
        } else return null

    } else return null

}

export default Bookmarkedmovie