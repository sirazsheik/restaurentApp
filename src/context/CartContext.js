import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  amount: 0,
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
