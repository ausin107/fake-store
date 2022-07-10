import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { registerSuccess, startLogin } from '../components/auth/authSlice'
export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCF, setPasswordCF] = useState('')
  const [error, setError] = useState()
  const [isRegisterSuccess, setRegisterSuccess] = useState(false)
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.isAuth.isLoading)
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(startLogin())
    if (password === passwordCF) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          dispatch(registerSuccess())
          setRegisterSuccess(true)
        })
        .catch((err) => {
          dispatch(registerSuccess())
          let errorCode = err.code
          errorCode = errorCode.replace('auth/', '').replaceAll('-', ' ').trim()
          let firstLetter = errorCode[0].toUpperCase()
          errorCode = errorCode.slice(1, errorCode.length)
          setError(firstLetter + errorCode + ' !!!')
        })
    } else {
      setError('Password not math !!!')
    }
    setEmail('')
    setPassword('')
    setPasswordCF('')
    dispatch(registerSuccess())
  }
  return (
    <div
      className='d-flex align-items-center justify-content-center flex-column'
      style={{ height: '85vh' }}
    >
      <Card className='w-100' style={{ maxWidth: '40%' }}>
        <Card.Body>
          <h2 className=' text-lg text-center mb-4'>Register</h2>
          {!!error && (
            <Alert variant='danger' key='danger' className='mb-4'>
              {error}
            </Alert>
          )}
          {!!isRegisterSuccess && (
            <Alert variant='success' key='success' className='mb-4'>
              Register successfully !!!
            </Alert>
          )}
          <Form className='' onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                placeholder='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id='password' className='mt-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id='password-confirm' className='mt-4'>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                placeholder='Confirm password'
                type='password'
                value={passwordCF}
                onChange={(e) => setPasswordCF(e.target.value)}
                required
              />
            </Form.Group>
            <Button disabled={!!isLoading} variant='primary' className='mt-4 w-100' type='submit'>
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Link className='text-center mb-4' to='/login'>
        Already have account ? Login
      </Link>
    </div>
  )
}
