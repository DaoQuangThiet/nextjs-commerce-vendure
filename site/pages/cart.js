import CartItemsContainer from '../components/cart/Cart-Page/CartItemsContainer'
import { AppProvider } from '../lib/context/AppContext'
import { Flex, Heading, Spacer, Box, Container, Center } from '@chakra-ui/react'
import commerce from '@lib/api/commerce'

const Cart = (props) => {
  const { categories } = props
  console.log('categories-CART', categories)
  return (
    <AppProvider>
      <Box h="240px">
        <Box>
          <Box
            color="#fff"
            backgroundImage="/assets/banner_page.png"
            h="200px"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            mb="60px"
          >
            <Flex>
              <Box>
                <Heading component="h3" variant="h3">
                  About
                </Heading>
              </Box>
              <Spacer />
              <Box>
                <Heading component="h6" variant="h6">
                  About
                </Heading>
                <Heading component="h6" variant="h6">
                  My account
                </Heading>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
      <Center>
        <Container>
          <CartItemsContainer />
          {props.children}
        </Container>
      </Center>
    </AppProvider>
  )
}

export default Cart
export async function getStaticProps({ preview, locale, locales }) {
  const config = { locale, locales }

  const siteInfoPromise = commerce.getSiteInfo({ config, preview })

  const { categories } = await siteInfoPromise

  return {
    props: {
      categories,
    },
    revalidate: 60,
  }
}
