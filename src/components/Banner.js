import React from 'react'
import { Carousel } from 'react-bootstrap'
import banner4 from '../access/banner4.jpg'
import banner2 from '../access/banner2.jpg'
import banner3 from '../access/banner3.jpg'
export default function Banner() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src={banner4}
          alt='First slide'
          style={{ maxHeight: '85vh' }}
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src={banner2}
          alt='Second slide'
          style={{ maxHeight: '85vh' }}
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src={banner3}
          alt='Third slide'
          style={{ maxHeight: '85vh' }}
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
