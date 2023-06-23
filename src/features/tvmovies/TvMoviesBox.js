import iconPlay from '../assets/icon-play.svg'

const TvMoviesBox = ({ image,
    onSaveUserClicked,
    tvmovieIcon,
    tvmovie,
    isError,
    error,
    iconBookmark }) => {
    return (
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
                <div className='bookmarked__circle' onClick={onSaveUserClicked} >
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
                    style={{ display: isError ? "inline" : null }}
                    className='error'
                >{error?.data?.message}</p>
            </div>
        </div>)
}

export default TvMoviesBox