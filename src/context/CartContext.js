import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  heading: '',
  addHeading: () => {},
  removeAllCartItems: () => {},
  addCartItem: () => {},
  changeCartQuantity: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
