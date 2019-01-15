import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'
import Transition from '../components/transition'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import '../styles/index.css'
import config from '../../config/siteConfig'
import * as fonts from '../assets/fonts'
import 'typeface-lato'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'acre-medium';
    src: url(${fonts.AcreMedium2}) format('woff2'),
         url(${fonts.AcreMedium}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: fallback;
  }
  @font-face {
    font-family: 'acre-semibold';
    src: url(${fonts.AcreSemibold2}) format('woff2'),
         url(${fonts.AcreSemibold}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: fallback;
  }
`
const MainWrapper = styled.div`
  text-align: center;
  min-height: 100vh;
  width: 100%;
`

export default ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query {
        polyBackground: file( relativePath: { regex: "/polyBackground/" }) {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 100, traceSVG: {color: "#2541EF"}) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}

    render={data => {
      const childrenWithProps = React.Children.map(children, (child) =>
        React.cloneElement(child, { imgData: data })
      )
      return (
        <div>
          <Helmet>
            <html lang='en-gb'/>
            <title>{config.siteTitle}</title>
            <meta name='charSet' content={'utf-8'} />
          </Helmet>
          <Header location={location}/>
          <Menu bg={data.polyBackground}/>
          <Transition location={location}>
            <MainWrapper>
              {childrenWithProps}
            </MainWrapper>
            <Footer/>
          </Transition>
          <GlobalStyle/>
        </div>
      )
    }}
  />
)
