import iconPlay from "../assets/icon-play.svg";
import useName from '../hooks/useName'

const Trending = ({ tvmoviesId, isBookmarkedids, userId }) => {
    const { tvmovie,
        onSaveUserClicked,
        tvmovieIcon,
        isError3,
        error3,
        iconBookmark } = useName(tvmoviesId, isBookmarkedids, userId)

    if (tvmovie) {
        if (tvmovie.isTrending) {
            const image = require(`../assets/thumbnails/${tvmovie.title
                .replace(/ /g, "-")
                .toLowerCase()}/trending/large.jpg`);

            return (
                <div
                    className="trending__image"
                    style={{ backgroundImage: `url(${image}) ` }}
                >
                    <div className="overlay">
                        <div className="overlay__play">
                            <img src={iconPlay} alt="" />
                            <h4>Play</h4>
                        </div>
                    </div>
                    <div className="bookmarked__circle" onClick={onSaveUserClicked}>
                        <div className="bookmarked__icon">{iconBookmark}</div>
                    </div>
                    <div className="trending__textbox">
                        <div className="trending__text">
                            <p>{tvmovie.year}</p>
                            <span>&#183;</span>
                            <img src={tvmovieIcon} alt="" />
                            <p>{tvmovie.category}</p>
                            <span>&#183;</span>
                            <p>{tvmovie.rating}</p>
                        </div>
                        <h3>{tvmovie.title}</h3>
                        <p style={{ display: isError3 ? "inline" : null }} className="error">
                            {error3?.data?.message}
                        </p>
                    </div>
                </div>
            );
        } else return null;
    } else return null;
};

export default Trending;
