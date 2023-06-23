import React from 'react'

const TvMovies = ({ searchTerm, count, ElementRef, content1, content2, name }) => {
    return (
        <div className='moviestv'>
            <h1
                style={{ display: searchTerm ? "none" : null }}>
                {name}</h1>
            <h1
                style={{ display: searchTerm ? "flex" : "none" }}>
                Found {count - 1} results for ‘{searchTerm}’</h1>
            <div className='moviestv__list' ref={ElementRef}>
                {content1}
                {content2}
            </div>
        </div>
    )
}

export default TvMovies