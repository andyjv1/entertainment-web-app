import React from 'react'
import SearchComponent from '../search/SearchComponent'
import Recommended from './Recommended'
import Trending from './Trending'
import Search from '../search/Search'
import TvMovies from '../tvmovies/TvMovies'
import { useOutletContext } from "react-router-dom";
import useTitle from '../hooks/useTitle'

const TrendingList = () => {
  useTitle('Home - Entertainment Web App')

  const [isLoading,
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
    ElementRef] = useOutletContext();

  let content

  if (isLoading || isLoading2) content = <p className='white'>Loading...</p>

  if (isError || isError2) {
    content = <p className="errmsg">{error?.data?.message} {error2?.data?.message}</p>
  }

  if (isSuccess && isSuccess2) {

    const { ids } = tvmovies

    // Mapping over all the tv shows for different components
    const trendingcontent = (ids?.length && !searchTerm)
      ? ids.map(tvmoviesId => <Trending key={tvmoviesId} tvmoviesId={tvmoviesId} isBookmarkedids={isBookmarkedids}
        email={email} userId={userId} />
      )
      : null

    const searchcontent = (ids?.length && searchTerm)
      ? ids.map(tvmoviesId => <Search key={tvmoviesId} tvmoviesId={tvmoviesId} isBookmarkedids={isBookmarkedids}
        email={email} userId={userId} searchTerm={searchTerm} setCount={setCount} />
      )
      : null

    const recommendedcontent = (ids?.length && !searchTerm)
      ? ids.map(tvmoviesId => <Recommended key={tvmoviesId} tvmoviesId={tvmoviesId} isBookmarkedids={isBookmarkedids}
        email={email} userId={userId} />
      )
      : null

    content = (
      <>
        <SearchComponent setSearchTerm={setSearchTerm} placeholder="Search for movies or TV series" />
        <div className='trending' style={{ display: searchTerm ? "none" : null }}>
          <h1>Trending</h1>
          <div className='trending__list'>
            {trendingcontent}
          </div>
        </div>
        <TvMovies searchTerm={searchTerm} count={count} ElementRef={ElementRef}
          content1={recommendedcontent} content2={searchcontent} name="Recommended for you" />
      </>
    )
  }

  return content
}


export default TrendingList