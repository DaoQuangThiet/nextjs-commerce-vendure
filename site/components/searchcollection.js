import React from 'react'
import Link from 'next/link'
import { StarIcon } from '@chakra-ui/icons'
import { Container, Box, Image, Text, Heading } from '@chakra-ui/react'

const Search_Collection = (props) => {
  const { product } = props
  return (
    <Container h="100%" w="24%" border="1px solid #efefef" m="5" pb="10">
      <Box maxW="100%" p="4">
        <Box align="center">
          <Link href={`/product/${product.slug}`}>
            <a>
              <Image w="100%" src={product.productAsset.preview} alt="" />
            </a>
          </Link>
          <Box>
            {product.productName && (
              <Heading
                as="h3"
                size="2xl"
                noOfLines={1}
                align="center"
                color="#323232"
              >
                <Link href={`/product/${product.slug}`}>
                  <a>{product.productName}</a>
                </Link>
              </Heading>
            )}
            {product.rating && (
              <Box mb="10" alignItems="center">
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < product.rating ? '#81E6D9' : 'gray.200'}
                    />
                  ))}
              </Box>
            )}
            <Text
              mt={2}
              fontSize="xl"
              fontWeight="semibold"
              lineHeight="short"
              align="center"
            >
              ${product.price.value / 100}
            </Text>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
export default Search_Collection
