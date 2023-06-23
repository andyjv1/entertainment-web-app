import React from 'react'
import iconSearch from '../assets/icon-search.svg'

const SearchComponent = ({ setSearchTerm, placeholder }) => {
    return (
        <div className='search'>
            <img className='search__logo' src={iconSearch} alt="" />
            <input
                type="text"
                placeholder={placeholder}
                id="search"
                name="search"
                onChange={(e) => { setSearchTerm(e.target.value) }}></input>
        </div>)
}

export default SearchComponent