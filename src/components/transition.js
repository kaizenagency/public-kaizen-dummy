import React from 'react'
import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group'
import styled from 'styled-components/macro'

const AnimatedWrapper = styled.div`
  opacity: .2;
  filter: blur(20px);
  transform: translateY(20px);
  transition: opacity .3s ease-in-out, transform .3s ease-in-out, filter .3s ease-in-out;
`
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: .2,
    filter: `blur(20px)`,
    transform: `translateY(20px)`
  },
  entered: {
    opacity: 1,
    filter: `blur(0px)`,
    transform: `none`
  },
  exiting: {
    opacity: .2,
    filter: `blur(20px)`,
    transform: `translateY(20px)`
  }
}

class Transition extends React.PureComponent {
  render() {
    const { children, location } = this.props
    return (
      <TransitionGroup>
        <ReactTransition key={location.pathname} appear timeout={300}>
          {status => (
            <AnimatedWrapper style={{ ...getTransitionStyles[status] }}>
              {children}
            </AnimatedWrapper>
          )}
        </ReactTransition>
      </TransitionGroup>
    )
  }
}

export default Transition
