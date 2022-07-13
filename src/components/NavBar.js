import React, { useEffect, useRef } from 'react'
import { Navbar, Container, NavDropdown, Nav, Badge } from 'react-bootstrap'
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
  const totalProducts = useSelector((state) => state.cartProducts.products)
  const pageRef = useRef([])
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
  useEffect(() => {
    pageRef.current.map((item) => {
      item.href == window.location.href
        ? item.classList.add('active')
        : item.classList.remove('active')
    })
  }, [])
  const handleActiveLink = (index) => {
    pageRef.current.map((item) => {
      item.classList.remove('active')
    })
    pageRef.current[index].classList.add('active')
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
              <Link
                to='/'
                className='nav-link cursor-pointer'
                ref={(el) => (pageRef.current[0] = el)}
                onClick={() => handleActiveLink(0)}
              >
                Home
              </Link>
              <Link
                to='/for-men'
                className='nav-link cursor-pointer'
                ref={(el) => (pageRef.current[1] = el)}
                onClick={() => handleActiveLink(1)}
              >
                Men Clothing
              </Link>
              <Link
                to='/for-women'
                className='nav-link cursor-pointer'
                ref={(el) => (pageRef.current[2] = el)}
                onClick={() => handleActiveLink(2)}
              >
                Women Clothing
              </Link>
            </Nav>
            <Nav>
              {!!isLogin ? (
                <div className='nav-link cursor-pointer' onClick={handleLogout}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} className='me-2' />
                  Logout
                </div>
              ) : (
                <div className='d-flex flex-row'>
                  <Link to='/login' className='nav-link cursor-pointer'>
                    <FontAwesomeIcon icon={faUser} className='me-2' />
                    Login
                  </Link>
                  <Link to='/register' className='nav-link cursor-pointer'>
                    <FontAwesomeIcon icon={faUserPlus} className='me-2' />
                    Register
                  </Link>
                </div>
              )}
              <div className='nav-link cursor-pointer' onClick={handleCart}>
                <FontAwesomeIcon icon={faShoppingCart} className='me-2' />
                Your Cart
                <Badge bg='secondary' className='ms-2'>
                  {totalProducts.length}
                </Badge>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
