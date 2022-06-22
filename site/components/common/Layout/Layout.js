import React from 'react'
import SideBarTop from '../../sidebar'
import HeaderMid from '../../HeaderMid'
import HeaderCenter from '../../HeaderCenter'
import Footer from '../../Footer'
import Copyright from '../../Copyright'
import { Container } from '@chakra-ui/react'

const Layout = ({ children }) => {
  return (
    <Container>
      <SideBarTop />
      <HeaderMid />
      <HeaderCenter />
      {children}
      <Footer />
      <Copyright />
    </Container>
  )
}
export default Layout
