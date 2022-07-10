import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Banner from '../components/Banner'
export default function Home() {
  const [products, setProducts] = useState()
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
            return (
              <div
                className='d-flex align-items-center justify-content-center flex-column bg-white rounded'
                key={product.id}
                style={{ width: '28.8vw' }}
              >
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
