import TvMoviesBox from '../tvmovies/TvMoviesBox'
import useName from '../hooks/useName'

const Recommended = ({ tvmoviesId, isBookmarkedids, userId }) => {
  const { tvmovie,
    onSaveUserClicked,
    tvmovieIcon,
    isError3,
    error3,
    iconBookmark } = useName(tvmoviesId, isBookmarkedids, userId)
  
  if (tvmovie) {
    if (!tvmovie.isTrending) {
      const image = require(`../assets/thumbnails/${tvmovie.title.replace(/ /g, "-").replace(/’/g, '').replace(/:/g, '').replace(/II/g, '2').toLowerCase()}/regular/large.jpg`)

      return (<TvMoviesBox image={image}
        onSaveUserClicked={onSaveUserClicked}
        tvmovieIcon={tvmovieIcon}
        tvmovie={tvmovie}
        isError={isError3}
        error={error3}
        iconBookmark={iconBookmark} />)
    } else return null
  } else return null

}

export default Recommended