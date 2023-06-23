import { useEffect } from 'react'
import logo from '../features/assets/logo.svg'
import iconBookmark from '../features/assets/icon-nav-bookmark.svg'
import iconHome from '../features/assets/icon-nav-home.svg'
import iconMovies from '../features/assets/icon-nav-movies.svg'
import iconTv from '../features/assets/icon-nav-tv-series.svg'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { selectCurrentToken } from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { useSelector } from 'react-redux'
import React from 'react'

import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";

const BrowseSidebar = ({ location }) => {
  let picture
  let avatarImage

  const navigate = useNavigate()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()
  
  // Check if token existes
  const token = useSelector(selectCurrentToken)

  if (token) {
    const decoded = jwtDecode(token)
    const { image } = decoded.UserInfo
    picture = image
  }

  // Get picture from Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: "da4z2qeze"
    }
  });

  const myImage = cld.image(picture);

  picture ? avatarImage = (<AdvancedImage cldImg={myImage} />) : avatarImage = (<FontAwesomeIcon icon={faUser} />)

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])
  
  if (isLoading) return <p>Logging Out...</p>

  if (isError) return <p>Error: {error.data?.message}</p>

  const content = (
    <header className='header'>
      <img className='header-logo' src={logo} alt="" />
      <nav className='header-icon'>
        <img src={iconHome} alt="" onClick={() => { navigate("/browse") }}
          style={{ filter: location.pathname === "/browse" ? "invert(100%) sepia(100%) saturate(0%) hue-rotate(2deg) brightness(400%) contrast(101%)" : null }}
        />
        <img src={iconMovies} onClick={() => { navigate("/browse/movies") }} alt=""
          style={{ filter: location.pathname === "/browse/movies" ? "invert(100%) sepia(100%) saturate(0%) hue-rotate(2deg) brightness(400%) contrast(101%)" : null }}
        />
        <img src={iconTv} onClick={() => { navigate("/browse/tvshows") }} alt=""
          style={{ filter: location.pathname === "/browse/tvshows" ? "invert(100%) sepia(100%) saturate(0%) hue-rotate(2deg) brightness(400%) contrast(101%)" : null }}
        />
        <img src={iconBookmark} onClick={() => { navigate("/browse/bookmarked") }} alt=""
          style={{ filter: location.pathname === "/browse/bookmarked" ? "invert(100%) sepia(100%) saturate(0%) hue-rotate(2deg) brightness(400%) contrast(101%)" : null }}
        />
      </nav>
      <div className="header-info">
        <button
          className="header-button"
          title="Logout"
          onClick={sendLogout}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
        <div className='header-avatar'>
          {avatarImage}
        </div>
      </div>
    </header>
  )
  return content
}

export default BrowseSidebar