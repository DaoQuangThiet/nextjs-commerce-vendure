import React from 'react'
import { useContext } from 'react'
import { AppContext, AppProvider } from '../../lib/context/AppContext'
import Link from 'next/link'
import { HiOutlineShoppingBag } from 'react-icons/hi'

const CartIcon = () => {
  const [cart, setCart] = useContext(AppContext)
  const productsCount =
    null !== cart && Object.keys(cart).length ? cart.totalProductsCount : ''
  const totalPrice =
    null !== cart && Object.keys(cart).length ? cart.totalProductsPrice : ''
  //console.log('productsCount',productsCount);
  // console.log('totalPrice', totalPrice);

  return (
      <Link href="/cart">
        <a>
          <HiOutlineShoppingBag />
         {parseInt(productsCount) && (
            <span>{parseInt(productsCount)}</span>
          )}
          {parseInt(totalPrice) && <span>{parseInt(totalPrice)}</span>}
        </a>
      </Link>
  )
}

export default CartIcon
