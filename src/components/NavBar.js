import React from 'react'
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { logoutSuccess } from './auth/authSlice'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShoppingCart,
  faUser,
  faArrowRightFromBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
export default function NavBar() {
  const dispath = useDispatch()
  const navigate = useNavigate()
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
    window.location.reload()
  }
  const handleCart = async () => {
    navigate('/cart')
    window.location.reload()
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
            </Nav>
            <Nav>
              {!!isLogin ? (
                <div className='nav-link' onClick={handleLogout}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} className='me-2' />
                  Logout
                </div>
              ) : (
                <div className='d-flex flex-row'>
                  <Link to='/login' className='nav-link'>
                    <FontAwesomeIcon icon={faUser} className='me-2' />
                    Login
                  </Link>
                  <Link to='/register' className='nav-link'>
                    <FontAwesomeIcon icon={faUserPlus} className='me-2' />
                    Register
                  </Link>
                </div>
              )}
              <div className='nav-link' onClick={handleCart}>
                <FontAwesomeIcon icon={faShoppingCart} className='me-2' />
                Your Cart
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
