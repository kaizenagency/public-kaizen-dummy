import React, { Component } from 'react'
import _ from 'lodash'
import styled from 'styled-components/macro'
import posed from 'react-pose'
import { Link } from 'gatsby'
import * as vars from '../../styles/export'

const PosedMenu = posed.div({
  open: {
    delayChildren: 400,
    staggerChildren: 50
  }
})
const StyledMenu = styled(PosedMenu)`
  position: fixed;
  z-index: 999;
  top: 0;
  right: ${props => props.mobile ? '-100%' : '-300px'};
  width: ${props => props.mobile ? '100%' : '300px'};
  height: 100%;
  background-color: ${vars.colors.lightGrey};
  padding: 10rem 2rem 2rem;
  text-align: right;
  transition: right 0.8s cubic-bezier(0.7, 0, 0.3, 1) 0s;

  .menu-open & {
    right: 0;
  }

  @media (max-width: ${vars.sizes.mPhone}) {
    text-align: center;
    padding-top: 9rem;
  }
`
const BurgerButton = styled.div`
  top: ${props => props.shift ? '0.65rem' : '3rem'};
  right: 3rem;
  width: ${props => props.shift ? '45px' : '60px'} !important;
  height: ${props => props.shift ? '45px' : '60px'} !important;
  z-index: 1111 !important;
  background-color: ${vars.colors.turquoise};
  border-radius: 50%;
  position: fixed;
  cursor: pointer;
  overflow: hidden;
  transition: transform .3s ease-out, box-shadow .3s ease-out;

  @media (max-width: ${vars.sizes.mTablet}) {
    top: ${props => props.shift ? '0.65rem' : '1.5rem'};
    right: 1.5rem;
    width: ${props => props.shift ? '35px' : '50px'} !important;
    height: ${props => props.shift ? '35px' : '50px'} !important;
  }
  @media (max-width: ${vars.sizes.mPhone}) {
    top: ${props => props.shift ? '0.55rem' : '1.5rem'};
    width: ${props => props.shift ? '30px' : '40px'} !important;
    height: ${props => props.shift ? '30px' : '40px'} !important;
  }

  &:hover {
    box-shadow: 0px 0px 20px 5px rgba(109,229,232,.5);
    transform: scale(1.05);
  }

  > button {
    font-size: 16px !important;
  }

  span {
    display: block;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${vars.colors.purple};
    width: 60%;
    height: 3px;
    border-radius: 10px;
    position: relative;

    @media (max-width: ${vars.sizes.mTablet}) {
      width: 55%;
      height: ${props => props.shift ? '2px' : '3px'};
    }
    @media (max-width: ${vars.sizes.mPhablet}) {
      width: 50%;
    }
    @media (max-width: ${vars.sizes.mPhone}) {
      height: 2px;
    }

    &:before, &:after {
      content: '';
      border-radius: 10px;
      position: absolute;
      width: 100%;
      height: 100%;
      top: ${props => props.shift ? '-8px' : '-10px'};
      left: 0;
      background-color: ${vars.colors.purple};
      transition: top .3s ease-out, opacity .1s ease-out, transform .3s ease-out;

      @media (max-width: ${vars.sizes.mTablet}) {
        top: ${props => props.shift ? '-6px' : '-8px'};
      }
      @media (max-width: ${vars.sizes.mPhone}) {
        top: ${props => props.shift ? '-4px' : '-6px'};
      }
    }
    &:after {
      top: ${props => props.shift ? '8px' : '10px'};

      @media (max-width: ${vars.sizes.mTablet}) {
        top: ${props => props.shift ? '6px' : '8px'};
      }
      @media (max-width: ${vars.sizes.mPhone}) {
        top: ${props => props.shift ? '4px' : '6px'};
      }
    }

    span {
      display: none;
    }
  }


  .menu-open & {
    transform: rotate(45deg);

    &:hover {
      box-shadow: 0px 0px 20px 10px rgba(109,229,232,.5);
      transform: rotate(45deg) scale(1.05);
    }

    span {
      &:before {
        top: 50%;
        opacity: 0;
      }
      &:after {
        top: 0;
        transform: rotate(-90deg);
      }
    }
  }
`
const Overlay = styled.div`
  position: fixed;
  z-index: 990;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.8s cubic-bezier(0.7, 0, 0.3, 1) 0s, visibility 0.8s cubic-bezier(0.7, 0, 0.3, 1) 0s;

  .menu-open & {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }
`
const PosedLink = posed.div({
  open: { x: 0, opacity: 1 },
  closed: { x: 100, opacity: 0, delay: 400 }
})
const StyledLink = styled(Link)`
  display: inline-block !important;
  color: ${vars.colors.purple};
  text-transform: uppercase;
  text-decoration: none;
  font-size: 1.8rem;
  line-height: 2.5rem;
  margin-bottom: 0.5rem;
  position: relative;

  @media (max-width: ${vars.sizes.mPhone}) {
    color: ${vars.colors.offWhite};
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0; right: 0;
    width: 0;
    height: 3px;
    background-color ${vars.colors.turquoise};
    transition: width .3s ease-out;
  }
  &:hover {
    &:after {
      width: 100%;
    }
  }
`

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {menuOpen: false, mobile: false, shift: false}
    this.throttledScroll = _.throttle(this.handleScroll, 200)
    this.throttledResize = _.throttle(this.handleResize, 200)
  }

  toggleMenu = () => {
    this.setState({menuOpen: !this.state.menuOpen})
  }
  closeMenu = () => {
    this.setState({menuOpen: false})
  }
  componentDidMount() {
    this.setState({
      mobile: window.innerWidth < 500 ? true : false
    })
    window.addEventListener('scroll', this.throttledScroll)
    window.addEventListener('resize', this.throttledResize)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledScroll)
    window.removeEventListener('resize', this.throttledResize)
  }

  handleScroll = () => {
    const doc = document.scrollingElement || document.documentElement
    this.setState({ shift: doc.scrollTop > 50 ? true : false })
  }
  handleResize = (e) => {
    this.setState({
      mobile: e.target.innerWidth < 500 ? true : false
    })
  }

  render () {
    return (
      <div className={this.state.menuOpen ? 'menu-open' : ''} id="menuWrapper">
        <BurgerButton onClick={this.toggleMenu} shift={this.state.shift}><span></span></BurgerButton>
        <Overlay onClick={this.closeMenu}/>
        <StyledMenu shift={this.state.shift} mobile={this.state.mobile} pose={this.state.menuOpen ? 'open' : 'closed'}>
          <PosedLink><StyledLink to={'/'} onClick={this.closeMenu}>Home</StyledLink></PosedLink>
          <PosedLink><StyledLink to={'/'} onClick={this.closeMenu}>Services</StyledLink></PosedLink>
          <PosedLink><StyledLink to={'/'} onClick={this.closeMenu}>About</StyledLink></PosedLink>
          <PosedLink><StyledLink to={'/'} onClick={this.closeMenu}>Case Studies</StyledLink></PosedLink>
          <PosedLink><StyledLink to={'/'} onClick={this.closeMenu}>Content Hub</StyledLink></PosedLink>
          <PosedLink><StyledLink to={'/'} onClick={this.closeMenu}>Blog</StyledLink></PosedLink>
          <PosedLink><StyledLink to={'/'} onClick={this.closeMenu}>Events</StyledLink></PosedLink>
          <PosedLink><StyledLink to={'/'} onClick={this.closeMenu}>Contact</StyledLink></PosedLink>
        </StyledMenu>
      </div>
    )
  }
}

export default Menu
