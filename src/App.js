import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import DetailProduct from './pages/DetailProduct'
import Home from './pages/Home'
import MenPage from './pages/MenPage'
import WomenPage from './pages/WomenPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/for-men' element={<MenPage />} />
        <Route path='/for-women' element={<WomenPage />} />
        <Route path='/products/:productId' element={<DetailProduct />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </>
  )
}

export default App
