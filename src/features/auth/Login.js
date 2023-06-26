import { useRef, useState, useEffect } from 'react'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import useTitle from '../hooks/useTitle'


const Login = () => {
  useTitle('Login - Entertainment Web App')

  const userRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  const goToSignup = () => {
    navigate(`/sign-up`)
  }

  useEffect(() => {
    setErrMsg('');
  }, [username, password])

  const canSave = username && password

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      try {
        const { accessToken } = await login({ username, password }).unwrap()
        dispatch(setCredentials({ accessToken }))
        setUsername('')
        setPassword('')
        navigate('/browse')
      } catch (err) {
        if (!err.status) {
          setErrMsg('No Server Response');
        } else if (err.status === 401) {
          setErrMsg('The password or the username is incorrect.');
        } else {
          setErrMsg(err.data?.message);
        }
      }
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)


  const onSaveUserClickedError = () => {
    if (!username) {
      setUsernameError(true)
    } else if (!password) {
      setUsernameError(false)
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }

  if (isLoading) return <p>Loading...</p>

  const content = (
    <div className='login' onSubmit={handleSubmit}>
      <img src={logo} alt="" />
      <form className='login__form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="login__input">
          <input
            type="email"
            placeholder='Email address'
            id="email"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
          ></input>
          <span
            style={usernameError ? { display: "inline-block" } : { display: "none" }}
          ><FontAwesomeIcon icon={faCircleExclamation} /> Missing Username</span>
        </div>

        <div className="login__input">
          <input
            placeholder='Password'
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
          ></input>
          <span
            style={passwordError || errMsg ? { display: "inline-block" } : { display: "none" }}
          ><FontAwesomeIcon icon={faCircleExclamation} />{errMsg ? errMsg : "Missing Password"}</span>
        </div>

        <button
          type='submit'
          onClick={onSaveUserClickedError}
        >Login to your account</button>
        <p>Don’t have an account? <span onClick={goToSignup}
        >Sign Up</span></p>
      </form>
    </div>

  )
  return content
}

export default Login