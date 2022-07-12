import React from 'react'
import { useState, useEffect } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addProduct } from '../components/cart/cartSlice'
import { useDispatch } from 'react-redux'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import axios from 'axios'
import Banner from '../components/Banner'
export default function Home() {
  const [products, setProducts] = useState()
  const navigate = useNavigate()
  const dispath = useDispatch()
  useEffect(() => {
    async function getProducts() {
      try {
        const result = await axios.get('https://fakestoreapi.com/products')
        setProducts(result.data)
        // console.log(result.data)
      } catch (err) {
        console.log(err)
      }
    }
    getProducts()
  })
  return (
    <div className=' overflow-hidden' style={{ backgroundColor: '#f2f3f5' }}>
      <Banner />
      <div className='row row-cols-3 mt-4 mx-5 mb-5' style={{ rowGap: '3rem', columnGap: '3rem' }}>
        {!!products &&
          products.map((product) => {
            const hanldeCart = () => {
              console.log(product)
              navigate(`/products/${product.id}`, { state: product })
            }
            const hanldeAddCart = (e) => {
              e.stopPropagation()
              const productInfo = {
                id: product.id,
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
    </div>
  )
}
