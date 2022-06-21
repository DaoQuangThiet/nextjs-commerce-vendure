import { isEmpty } from 'lodash'

const colorHover = '#40c6ff'

const styles = {
  product_price: {
    fontSize: '20px',
    color: `${colorHover}`,
    padding: '0px',
    margin: '0px',
    '& span': {
      '&.regular_price': {
        textDecoration: 'line-through',
        marginRight: '15px',
        color: '#999',
      },
      '&:nth-child(2)': {
        margin: '0px 15px',
      },
      '&:nth-child(3)': {
        display: 'none',
      },
    },
  },
}

const Price = ({ regularPrice = 0, salesPrice }) => {
  const classes = useStyle_price()

  if (isEmpty(salesPrice)) {
    return null
  }

  /**
   * Get discount percent.
   *
   * @param {String} regularPrice
   * @param {String} salesPrice
   */
  const discountPercent = (regularPrice, salesPrice) => {
    if (isEmpty(regularPrice) || isEmpty(salesPrice)) {
      return null
    }

    const formattedRegularPrice = parseInt(regularPrice?.substring(1))
    const formattedSalesPrice = parseInt(salesPrice?.substring(1))

    const discountPercent =
      ((formattedRegularPrice - formattedSalesPrice) / formattedRegularPrice) *
      100

    return {
      discountPercent:
        formattedSalesPrice !== formattedRegularPrice
          ? `(${discountPercent.toFixed(2)}%) OFF`
          : null,
      strikeThroughClass:
        formattedSalesPrice < formattedRegularPrice ? 'regular_price' : '',
    }
  }

  const productMeta = discountPercent(regularPrice, salesPrice)

  return (
    <h6 styles={styles.product_price}>
      {/* Discounted price */}
      <span styles={productMeta?.strikeThroughClass}>{regularPrice}</span>

      {/* Regular price */}
      {productMeta?.discountPercent ? (
        <span styles={styles.price_sales}>{salesPrice}</span>
      ) : null}

      {/* Discount percent */}
      <span styles={styles.discount}>{productMeta?.discountPercent}</span>
    </h6>
  )
}

export default Price
