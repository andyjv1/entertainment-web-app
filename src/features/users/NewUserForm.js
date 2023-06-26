import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAddNewUserMutation } from './usersApiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../auth/authSlice'
import { useLoginMutation } from '../auth/authApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import useTitle from '../hooks/useTitle'

const NewUserForm = () => {
  useTitle('Signup - Entertainment Web App')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [addNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewUserMutation()

  const [login, { isLoading: isLoading2 }] = useLoginMutation()

  const [image, setImage] = useState(null)
  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [password2, setPassword2] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordError2, setPasswordError2] = useState(false)
  const [validUsernameError, setValidUsernameError] = useState("")
  const [validPasswordError, setValidPasswordError] = useState("")

  // Check regex of username and password
  useEffect(() => {
    const USER_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  // Check function to get the image from form
  function previewFiles(file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setImage(reader.result)
    }
  }

  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)
  const onPassword2Changed = e => setPassword2(e.target.value)
  const onImageChoosen = e => {
    const file = e.target.files[0]
    previewFiles(file)
  }

  // Login after user is created
  useEffect(() => {
    if (isSuccess) {
      const loginSetup = async (username, password) => {
        try {
          const { accessToken } = await login({ username, password }).unwrap()
          dispatch(setCredentials({ accessToken }))
          setUsername('')
          setPassword('')
          navigate('/browse')
        } catch (err) {
          if (!err.status) {
            setErrMsg('No Server Response');
          } else if (err.status === 400) {
            setErrMsg('Missing Username or Password');
          } else if (err.status === 401) {
            setErrMsg('Unauthorized');
          } else {
            setErrMsg(err.data?.message);
          }
        }
      }
      loginSetup(username, password)
    }
  }, [isSuccess, navigate, username, password, login, dispatch])

  const canSave = [validUsername, validPassword].every(Boolean) && !isLoading && password === password2

  useEffect(() => {
    if (isError) {
      setErrMsg(error?.data?.message)
    }
  }, [isError, error?.data?.message])

  // Function to create user
  const onSaveUserClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewUser({ username, password, image })
    }
  }

  // Function to check for input errors
  const onSaveUserClickedError = () => {
    const USER_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    setValidUsername(USER_REGEX.test(username))
    const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
    setValidPassword(PWD_REGEX.test(password))
    if (!username) {
      setUsernameError(true)
      setPasswordError2(false)
      setValidUsernameError('')
      setValidPasswordError('')
    } else if (!password) {
      setUsernameError(false)
      setPasswordError(true)
      setValidUsernameError('')
      setValidPasswordError('')
    } else if (password !== password2) {
      setPasswordError(false)
      setPasswordError2(true)
      setValidUsernameError('')
      setValidPasswordError('')
    } else if (!validUsername) {
      setValidUsernameError("Enter a valid email")
      setPasswordError2(false)
    } else if (!validPassword) {
      setValidUsernameError("")
      setValidPasswordError("Enter a valid password at least 4 characters long")
    } else {
      setValidUsernameError('')
      setValidPasswordError('')
    }
  }

  const goToLogin = () => {
    navigate(`/login`)
  }

  if (isLoading || isLoading2) return <p>Loading...</p>

  const content = (
    <>
      <div className='signup'>
        <img src={logo} alt="Site logo" />

        <form className='signup__login'
          onSubmit={onSaveUserClicked}
          encType="multipart/form-data">
          <h1>Sign Up</h1>

          <div className="signup__input">
            <input
              type="email"
              placeholder='Email address'
              name="username"
              autoComplete="off"
              value={username}
              onChange={onUsernameChanged}></input>
            <span
              style={usernameError || validUsernameError !== '' ? { display: "inline-block" } : { display: "none" }}
            ><FontAwesomeIcon icon={faCircleExclamation} /> {usernameError ? "Missing Username" : validUsernameError}</span>
          </div>

          <div className="signup__input">
            <input
              placeholder='Password'
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChanged}></input>
            <span
              style={passwordError || validPasswordError !== '' ? { display: "inline-block" } : { display: "none" }}
            ><FontAwesomeIcon icon={faCircleExclamation} /> {passwordError ? "Missing Password" : validPasswordError}</span>
          </div>

          <div className="signup__input">
            <input
              placeholder='Repeat password'
              name="password"
              type="password"
              value={password2}
              onChange={onPassword2Changed}></input>
            <span
              style={passwordError2 || errMsg ? { display: "inline-block" } : { display: "none" }}
            ><FontAwesomeIcon icon={faCircleExclamation} /> {errMsg ? errMsg : "Passwords are not matching"}</span>
          </div>

          <input
            onChange={onImageChoosen}
            type="file"
            id="image"
            accept="image/png, image/jpeg, image/jpg, image/jfif"
            name="image"></input>

          <button type='submit'
            onClick={onSaveUserClickedError}
            style={{ backgroundColor: !canSave ? "grey" : null }}
            disabled={!canSave}
          >Create an account</button>
          <p>Already have an account? <span onClick={goToLogin}
          >Login</span></p>
        </form>
      </div >
    </>
  )
  return content

}

export default NewUserForm