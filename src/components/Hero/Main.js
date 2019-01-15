import React, { Component } from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div`
  position: relative;
  min-height: 1300px;
  height: 140vh;
  background: linear-gradient(to right, rgba(40,65,213,1) 0%, rgba(35,52,209,1) 60%, rgba(35,48,202,1) 100%);
`

class MainHero extends Component {
  render () {
    return (
      <Wrapper>
        hero
      </Wrapper>
    )
  }
}

export default MainHero
