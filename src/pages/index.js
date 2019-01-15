import React from 'react'
import MainHero from '../components/Hero/Main'

const IndexPage = ({imgData}) => (
  <div>
    <MainHero data={imgData}/>
    <div>
      <h2>Our Services</h2>
    </div>
  </div>
)
export default IndexPage
