import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { addProduct } from '../components/cart/cartSlice'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export default function Products({ products }) {
  const navigate = useNavigate()
  const dispath = useDispatch()
  return (
    <div className='row row-cols-3 mt-4 mx-5 mb-5' style={{ rowGap: '3rem', columnGap: '3rem' }}>
      {products.map((product) => {
        const hanldeCart = () => {
          console.log(product)
          navigate(`/products/${product.id}`, { state: product })
        }
        const hanldeAddCart = (e) => {
          e.stopPropagation()
          const productInfo = {
            id: product.id,
            price: product.price,
            title: product.title,
            image: product.image,
            quantity: 1,
          }
          dispath(addProduct(productInfo))
        }
        return (
          <div
            className='d-flex align-items-center justify-content-center flex-column bg-white rounded position-relative product'
            key={product.id}
            style={{ width: '28.8vw' }}
            onClick={hanldeCart}
          >
            <OverlayTrigger
              key='top'
              placement='top'
              overlay={<Tooltip id={`tooltip-top`}>Add to Cart</Tooltip>}
              onClick={(e) => e.stopPropagation()}
            >
              <FontAwesomeIcon
                icon={faCartPlus}
                className='position-absolute top-0 end-0 fs-4 p-3'
                onClick={(e) => hanldeAddCart(e)}
              />
            </OverlayTrigger>

            <div className='h-100 d-flex align-items-center mb-3'>
              <img src={product.image} className='pt-4' style={{ width: '15vw' }} />
            </div>
            <h6 className='text-black text-center mb-2'>{product.title}</h6>
            <h4 className='text-black'>{product.price}$</h4>
          </div>
        )
      })}
    </div>
  )
}
