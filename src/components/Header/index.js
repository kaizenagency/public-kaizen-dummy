import React, { Component } from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0; left: 0;
  height: 70px;
  background-color: rgba(37,65,239,.95);
  z-index: 10;
  text-align: center;
  transition: height .3s ease-out;
`

class Header extends Component {
  render () {
    return (
      <Wrapper>
        header
      </Wrapper>
    )
  }
}

export default Header
