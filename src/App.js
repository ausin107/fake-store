import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import DetailProduct from './pages/DetailProduct'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:productId' element={<DetailProduct />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/card' element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
