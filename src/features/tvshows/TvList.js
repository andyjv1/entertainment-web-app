import React from 'react'
import TVseries from './TVseries'
import Search from '../search/Search'
import SearchComponent from '../search/SearchComponent'
import TvMovies from '../tvmovies/TvMovies'
import { useOutletContext } from "react-router-dom";
import useTitle from '../hooks/useTitle'

const TvList = () => {
  useTitle('TV Shows - Entertainment Web App')

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
    const tvseriescontent = (ids?.length && !searchTerm)
      ? ids.map(tvmoviesId => <TVseries key={tvmoviesId} tvmoviesId={tvmoviesId} isBookmarkedids={isBookmarkedids}
        email={email} userId={userId} />
      )
      : null

    const searchcontent = (ids?.length && searchTerm)
      ? ids.map(tvmoviesId => <Search key={tvmoviesId} tvmoviesId={tvmoviesId} isBookmarkedids={isBookmarkedids}
        email={email} userId={userId} searchTerm={searchTerm} setCount={setCount} />
      )
      : null

    content = (
      <>
        <SearchComponent setSearchTerm={setSearchTerm} placeholder="Search for TV series" />
        <TvMovies searchTerm={searchTerm} count={count} ElementRef={ElementRef}
          content1={tvseriescontent} content2={searchcontent} name="TV Series"/>
      </>
    )
  }

  return content
}

export default TvList