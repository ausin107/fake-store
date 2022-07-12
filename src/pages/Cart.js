import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { faShoppingCart, faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Breadcrumb, Button } from 'react-bootstrap'
import {
  increaseProduct,
  decreaseProduct,
  removeProduct,
  checkOutProduct,
} from '../components/cart/cartSlice'
import { Link } from 'react-router-dom'
export default function Cart() {
  const products = useSelector((state) => state.cartProducts.products)
  const dispath = useDispatch()
  const calculateTotal = () => {
    let total = 0
    products.map((product) => {
      let price = (product.price * product.quantity).toFixed(2)
      total += parseFloat(price)
    })
    return total.toFixed(2)
  }
  const handleCheckOut = () => {
    products.length != 0 ? alert('Check out successfully !!!') : alert('Your cart is empty')
    dispath(checkOutProduct())
  }
  return (
    <div className='' style={{ backgroundColor: '#f2f3f5' }}>
      <Breadcrumb className='mx-5 py-2'>
        <Link to='/' className='breadcrumb-item'>
          Home
        </Link>
        <Breadcrumb.Item active className='breadcrumb-item'>
          Cart
        </Breadcrumb.Item>
      </Breadcrumb>
      <h1 className='w-100 h-25 text-center bg-white py-5 border-bottom mb-4'>Your Cart</h1>
      <div className='mx-5 bg-white mb-4'>
        {products.length == 0 ? (
          <div
            className='d-flex flex-row justify-content-center align-items-center me-4'
            style={{ height: '50vh' }}
          >
            <FontAwesomeIcon icon={faShoppingCart} className='me-3 fs-2' />
            <h2 className=''>Your cart is empty</h2>
          </div>
        ) : (
          <div className='w-100'>
            <div className='row px-5 py-2'>
              <div className='col-6'>Cart Items</div>
              <div className='col text-center'>Price</div>
              <div className='col text-center'>Quantity</div>
              <div className='col text-center'>Total</div>
              <div className='col text-center'>Delete</div>
            </div>
            <div className='mb-4'>
              {products.map((product) => {
                const handleIncrease = (id) => {
                  const productInfo = {
                    id: id,
                  }
                  dispath(increaseProduct(productInfo))
                }
                const handleDecrease = (id) => {
                  const productInfo = {
                    id: id,
                  }
                  dispath(decreaseProduct(productInfo))
                }
                const handleDeleteProduct = (id) => {
                  const productInfo = {
                    id: id,
                  }
                  dispath(removeProduct(productInfo))
                }
                return (
                  <div
                    className='row border-bottom border-top w-100 d-flex align-items-center m-0'
                    key={product.id}
                  >
                    <div className='col-6 d-flex align-items-center'>
                      <img
                        src={product.image}
                        className='ms-5 py-2 me-3 w-15'
                        style={{ width: '5vw' }}
                      />
                      <div className='fs-6 w-75'>{product.title}</div>
                    </div>
                    <div className='fs-5 col text-center'>{product.price}$</div>
                    <div className='col text-center d-flex flex-row align-items-center justify-content-center'>
                      <button
                        className='px-2 py-1'
                        onClick={() => handleDecrease(product.id)}
                        disabled={product.quantity <= 1}
                      >
                        <FontAwesomeIcon icon={faMinus} className='' />
                      </button>
                      <input
                        type='text'
                        className='p-1 text-center'
                        style={{ width: '3rem' }}
                        readOnly
                        value={product.quantity}
                      />
                      <button className='px-2 py-1' onClick={() => handleIncrease(product.id)}>
                        <FontAwesomeIcon icon={faPlus} className='' />
                      </button>
                    </div>
                    <div className='fs-5 col text-center'>
                      {(product.price * product.quantity).toFixed(2)}$
                    </div>
                    <div
                      className='fs-5 col text-center cursor-pointer pe-4'
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} className='fs-3 pe-4' />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
      <div className='d-flex bg-white mx-5 p-5 justify-content-end'>
        <div className='fs-3 me-4'>
          Total: <strong>{calculateTotal()}$</strong>
        </div>
        <Button variant='primary' key='primary' size='lg' className='w-15' onClick={handleCheckOut}>
          Check Out
        </Button>
      </div>
    </div>
  )
}
