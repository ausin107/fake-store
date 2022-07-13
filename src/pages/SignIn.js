import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { loginSuccess, loginFail, startLogin } from '../components/auth/authSlice'
export default function SignIn() {
  const [error, setError] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispath = useDispatch()
  const navigate = useNavigate()
  const isLogin = useSelector((state) => state.isAuth.isAuth)
  const isLoading = useSelector((state) => state.isAuth.isLoading)
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispath(startLogin())
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispath(loginSuccess(auth.currentUser.uid))
        window.localStorage.setItem('authKey', auth.currentUser.uid)
        setError(false)
        setTimeout(() => {
          navigate('/')
          window.location.reload()
        }, 1000)
      })
      .catch((err) => {
        dispath(loginFail())
        let errorCode = err.code
        errorCode = errorCode.replace('auth/', '').replaceAll('-', ' ').trim()
        let firstLetter = errorCode[0].toUpperCase()
        errorCode = errorCode.slice(1, errorCode.length)
        setError(firstLetter + errorCode + ' !!!')
      })
    setEmail('')
    setPassword('')
  }
  return (
    <div
      className='d-flex align-items-center justify-content-center flex-column'
      style={{ height: '90vh' }}
    >
      <Card className='w-100 ' style={{ maxWidth: '40%' }}>
        <Card.Body>
          <h2 className='text-center mb-4'>Login</h2>
          {!!isLogin && (
            <Alert variant='success' key='success' className='mb-4'>
              Login Successfully !!!
            </Alert>
          )}
          {!!error && (
            <Alert variant='danger' key='danger' className='mb-4'>
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email' className='mb-4'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                placeholder='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {!!isLoading ? (
              <Button variant='primary' type='submit' className='mt-4 w-100' disabled>
                <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true' />
                Loading...
              </Button>
            ) : (
              <Button variant='primary' className='mt-4 w-100' type='submit'>
                Login
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
      <Link className='w-100 text-center mt-4' to='/register'>
        Don't have account ? Register Now
      </Link>
    </div>
  )
}
