import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      console.log(cartList)

      return (
        <ul className="cart-list">
          {cartList.map(eachCartItem => (
            <CartItem
              cartItemDetails={eachCartItem}
              key={eachCartItem.dish_id}
            />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
