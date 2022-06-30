import React from 'react'
import { Container, Grid, Box } from '@chakra-ui/react'
import SwipeableTextMobileStepper from '../components/slider'
import Product from '@components/product'
import ListImages from '@components/ListImages'
import ListImgSeller from '../components/imglist'
import NameForm from '@components/formEmail'
import { AppProvider } from '../lib/context/AppContext'
import DealsOfDay from 'components/DealsOfDay'
import Tab from '@components/tab'
import TabSeller from '@components/tabSeller'
import Logo from '@components/ListLogo'
import commerce from '@lib/api/commerce'
import axios from 'axios'
import ProdutcsSeller from '@components/ProductsSeller'

export async function getStaticProps({ preview, locale, locales, params }) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 8 },
    config,
    preview,
    // Saleor provider only
    ...{ featured: true },
  })

  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  /***ADD QUERY WITH AXIOS */
  const endpoint = process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL
  const headers = {
    'content-type': 'application/json',
    Authorization: '<token>',
  }
  const graphqlQuery = {
    operationName: 'fetchAuthor',
    query: `query fetchAuthor{
    products(options: {take: 8 skip:4} ) {
      items {
        id
        name
        description
        slug
        assets {
          source
        }
        variants {
          currencyCode
          price
          name
        }
      }
  }
}`,
  }
  const QueryproductsDeal = {
    operationName: 'fetchAuthor',
    query: `query fetchAuthor{
      products(options: {take:2}){
      items {
        id
        name
        description
        slug
        assets {
          source
        }
        variants {
          currencyCode
          price
          name
        }
      }
  }
}`,
  }
  const productsdof = await axios({
    url: endpoint,
    method: 'post',
    headers: headers,
    data: QueryproductsDeal,
  })
  const productDeal = productsdof.data.data.products.items
  const response = await axios({
    url: endpoint,
    method: 'post',
    headers: headers,
    data: graphqlQuery,
  })
  const productsSeller = response.data.data.products.items

  return {
    props: {
      products,
      productDeal,
      productsSeller,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

const Home = (props) => {
  const { products, productsSeller, categories, productDeal } = props

  const brands = [
    {
      id: 1,
      imageUrl: '/assets/logo1.png',
    },
    {
      id: 2,
      imageUrl: '/assets/logo2.png',
    },
    {
      id: 3,
      imageUrl: '/assets/logo3.png',
    },
    {
      id: 4,
      imageUrl: '/assets/logo4.png',
    },
    {
      id: 5,
      imageUrl: '/assets/logo5.png',
    },
    {
      id: 6,
      imageUrl: '/assets/logo6.png',
    },
    {
      id: 7,
      imageUrl: '/assets/logo5.png',
    },
    {
      id: 8,
      imageUrl: '/assets/logo6.png',
    },
    {
      id: 9,
      imageUrl: '/assets/logo5.png',
    },
    {
      id: 10,
      imageUrl: '/assets/logo6.png',
    },
    {
      id: 11,
      imageUrl: '/assets/logo5.png',
    },
    {
      id: 12,
      imageUrl: '/assets/logo6.png',
    },
  ]

  return (
    <AppProvider>
      <Box>
        <SwipeableTextMobileStepper />

        <DealsOfDay key={productDeal.id} productsdeal={productDeal} />

        <Container>
          <Tab key={categories.id} collections={categories} />
          <Grid
            spacing={{ sm: 2, md: 2, xs: 4, lg: 3 }}
            columns={{ xs: 4, sm: 6, md: 4, lg: 4 }}
          >
            {products.length > 0 &&
              products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
          </Grid>
          {/* <Grid container spacing={{ sm: 2, md: 2, xs: 4, lg: 3 }} columns={{ xs: 4, sm: 6, md: 4, lg: 4 }}>
            {products.length ? (
              products.map(product => <Product key={product.id} product={product} />)
            ) : ''}
          </Grid> */}
        </Container>

        <ListImages />
        <Container>
          <TabSeller key={categories.id} collections={categories} />
          <Grid
            spacing={{ sm: 2, md: 2, xs: 4, lg: 3 }}
            columns={{ xs: 4, sm: 6, md: 4, lg: 4 }}
          >
            {productsSeller.length > 0 &&
              productsSeller.map((product) => (
                <ProdutcsSeller key={product.id} product={product} />
              ))}
          </Grid>
          {/* <Grid container spacing={{ sm: 2, md: 2, xs: 4, lg: 3 }} columns={{ xs: 4, sm: 6, md: 4, lg: 4 }}>
            {products.length ? (
              products.map(product => <Product key={product.id} product={product} />)
            ) : ''}
          </Grid> */}
        </Container>
        <ListImgSeller />
        <Logo brands={brands} />
        <NameForm />
      </Box>
    </AppProvider>
  )
}
export default Home
