import React from 'react'
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { logoutSuccess } from './auth/authSlice'
import { auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
export default function NavBar() {
  const dispath = useDispatch()
  const isLogin = useSelector((state) => state.isAuth.isAuth)
  const handleLogout = async () => {
    dispath(logoutSuccess())
    await signOut(auth)
      .then(() => {
        window.localStorage.removeItem('authKey')
        alert('Logout successfully !!')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container className=''>
          <Link to='/' className=' navbar-brand'>
            Logo Website
          </Link>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Link to='/' className='nav-link'>
                Home
              </Link>
              <Link to='/products/' className='nav-link'>
                Men Clothing
              </Link>
              <Link to='' className='nav-link'>
                Women Clothing
              </Link>
              <Link to='' className='nav-link'>
                Electronics
              </Link>
              <Link to='' className='nav-link'>
                Jewelery
              </Link>
            </Nav>
            <Nav>
              {!!isLogin ? (
                <div className='nav-link' onClick={handleLogout}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} className='' />
                </div>
              ) : (
                <Link to='/login' className='nav-link'>
                  <FontAwesomeIcon icon={faUser} className='' />
                </Link>
              )}
              <Link to='/register' className='nav-link'>
                Register
              </Link>
              <Link to='/card' className='nav-link'>
                <FontAwesomeIcon icon={faShoppingCart} className='' />
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
