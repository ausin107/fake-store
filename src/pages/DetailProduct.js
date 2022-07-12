import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Button, Breadcrumb } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux/es/exports'
import { addProduct } from '../components/cart/cartSlice'
import { Link } from 'react-router-dom'
export default function DetailProduct() {
  let [quantity, setQuantity] = useState(1)
  const location = useLocation()
  const data = location.state
  const dispath = useDispatch()
  const { productId } = useParams()
  const handleDecrease = () => {
    setQuantity(quantity - 1)
  }
  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }
  const handleAddProduct = () => {
    const product = {
      id: productId,
      quantity: quantity,
    }
    dispath(addProduct(product))
  }
  return (
    <div className='w-100 h-100 pb-5' style={{ backgroundColor: '#f2f3f5' }}>
      <Breadcrumb className='mx-5 py-2'>
        <Link to='/' className='breadcrumb-item'>
          Home
        </Link>
        <Link to='/' className='breadcrumb-item'>
          Products
        </Link>
        <Breadcrumb.Item active>{data.title}</Breadcrumb.Item>
      </Breadcrumb>
      <div className='bg-white mx-5 d-flex p-5'>
        <div className='me-5'>
          <img src={data.image} className='' style={{ height: '66vh' }} />
        </div>
        <div className='d-flex ms-5 flex-column'>
          <h3 className='my-3'>{data.title}</h3>
          <h1 className='my-3 ms-3'>{data.price}$</h1>
          <p className='my-3 ms-3 w-75 fs-4'>Description: {data.description}</p>
          <div className='my-2 ms-3 fs-3'>
            <strong>Category</strong>: {data.category}
          </div>
          <div className='d-flex flex-row align-items-center my-2 ms-3 '>
            <div className='me-5 fs-5'>Số lượng: </div>
            <button className='px-2 py-1' onClick={handleDecrease} disabled={quantity <= 1}>
              <FontAwesomeIcon icon={faMinus} className='' />
            </button>
            <input
              type='text'
              className='p-1 text-center'
              style={{ width: '3rem' }}
              value={quantity}
              readOnly
            />
            <button className='px-2 py-1' onClick={handleIncrease}>
              <FontAwesomeIcon icon={faPlus} className='' />
            </button>
          </div>
          <div className='d-flex my-5 ms-4'>
            <div className='me-4 d-flex flex-row'>
              <Button size='lg' onClick={handleAddProduct}>
                <FontAwesomeIcon icon={faCartPlus} className='me-3' />
                Add to Cart
              </Button>
            </div>
            <Button variant='danger' size='lg'>
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
