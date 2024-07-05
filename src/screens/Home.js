import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

export default function Home() {
  return (
    <div>
      <div> <Nav /></div>
      <div><Carousel/></div>
      <div className='m-3'>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
      <div><Footer /></div>
    </div>
  )
}
