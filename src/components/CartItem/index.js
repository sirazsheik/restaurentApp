import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props

      const onClickDecrement = () => {
        decrementCartItemQuantity(cartItemDetails.dish_id)
      }
      const onClickIncrement = () => {
        incrementCartItemQuantity(cartItemDetails.dish_id)
      }
      const onRemoveCartItem = () => {
        removeCartItem(cartItemDetails.dish_id)
      }
      const totalPrice = cartItemDetails.quantity * cartItemDetails.dish_price
      return (
        <li className="cart-item">
          <img
            className="cart-product-image"
            src={cartItemDetails.dish_image}
            alt={cartItemDetails.dish_name}
          />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{cartItemDetails.dish_name}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                data-testid="minus"
                onClick={onClickDecrement}
              >
                -
              </button>
              <p className="cart-quantity">{cartItemDetails.quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                data-testid="plus"
                onClick={onClickIncrement}
              >
                +
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">
                {' '}
                {cartItemDetails.dish_currency} {totalPrice}/-
              </p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
            data-testid="remove"
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
