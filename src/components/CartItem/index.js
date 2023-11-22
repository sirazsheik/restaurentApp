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

      const dishName = cartItemDetails.dish_name
      const dishImage = cartItemDetails.dish_image
      const onClickDecrement = () => {
        decrementCartItemQuantity(cartItemDetails.dishId)
      }
      const onClickIncrement = () => {
        incrementCartItemQuantity(cartItemDetails.dishId)
      }
      const onRemoveCartItem = () => {
        removeCartItem(cartItemDetails.dishId)
      }
      const totalPrice = cartItemDetails.quantity * cartItemDetails.dish_price
      return (
        <li className="cart-item">
          <img
            className="cart-product-image"
            src={cartItemDetails.dishImage}
            alt={cartItemDetails.dishName}
          />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{cartItemDetails.dishName}</p>
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
                {cartItemDetails.dishCurrencyy} {totalPrice}/-
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
