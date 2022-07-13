import React from 'react'
import { useState, useEffect } from 'react'
import Products from '../components/Products'
import axios from 'axios'
import Banner from '../components/Banner'
import '../styles/Home.css'
export default function MenPage() {
  const [products, setProducts] = useState()
  useEffect(() => {
    async function getProducts() {
      try {
        const result = await axios.get(
          `https://fakestoreapi.com/products/category/men's%20clothing`
        )
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
      {!!products && <Products products={products} />}
    </div>
  )
}
