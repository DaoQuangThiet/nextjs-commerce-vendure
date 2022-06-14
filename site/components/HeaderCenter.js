import React from 'react'
import { Container, Grid } from '@mui/material'
import MenuListComposition from './Menu'
import ListPages from './ListPages'
const HeaderCenter = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Grid container direction="row">
          <Grid item xs={9} sm={5} md={3} lg={3}>
            <MenuListComposition />
          </Grid>
          <Grid item xs={3} sm={7} md={9} lg={9}>
            <ListPages />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
export default HeaderCenter
