import SearchComponent from '../search/SearchComponent'
import Bookmarkedmovie from './Bookmarkedmovie'
import BookmarkedTV from './BookmarkedTV'
import Search from '../search/Search'
import TvMovies from '../tvmovies/TvMovies'
import { useOutletContext } from "react-router-dom";
import useTitle from '../hooks/useTitle'

const BookmarkList = () => {
  useTitle('My Bookmarks - Entertainment Web App')

  const [
    isLoading,
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
    ElementRef,
    setCount,
    count] = useOutletContext();

  let content

  if (isLoading || isLoading2) content = <p>Loading...</p>

  if (isError || isError2) {
    content = <p className="errmsg">{error?.data?.message} {error2?.data?.message}</p>
  }

  if (isSuccess && isSuccess2) {

    // Mapping over all the tv shows for different components
    const bookmarkedcontentmovie = (isBookmarkedids?.length && !searchTerm)
      ? isBookmarkedids.map(tvmoviesId => <Bookmarkedmovie key={tvmoviesId} tvmoviesId={tvmoviesId} isBookmarkedids={isBookmarkedids}
        email={email} userId={userId} />
      )
      : null

    const bookmarkedcontenttv = (isBookmarkedids?.length && !searchTerm)
      ? isBookmarkedids.map(tvmoviesId => <BookmarkedTV key={tvmoviesId} tvmoviesId={tvmoviesId} isBookmarkedids={isBookmarkedids}
        email={email} userId={userId} />
      )
      : null

    const searchcontent = (isBookmarkedids?.length && searchTerm)
      ? isBookmarkedids.map(tvmoviesId => <Search key={tvmoviesId} tvmoviesId={tvmoviesId} isBookmarkedids={isBookmarkedids}
        email={email} userId={userId} searchTerm={searchTerm} setCount={setCount} />
      )
      : null

    content = (
      <>
        <SearchComponent setSearchTerm={setSearchTerm} placeholder="Search for bookmarked shows" />
        <div className='bookmarked'>
          <div className='moviestv' style={{ display: searchTerm ? "none" : null }}>
            <h1>Bookmarked Movies</h1>
            <div className='moviestv__list'>
              {bookmarkedcontentmovie}
            </div>
          </div>
          <TvMovies searchTerm={searchTerm} count={count} ElementRef={ElementRef}
            content1={bookmarkedcontenttv} content2={searchcontent} name="Bookmarked TV Series"/>
        </div>

      </>
    )
  }

  return content

}

export default BookmarkList