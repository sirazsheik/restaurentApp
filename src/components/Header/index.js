import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList, heading} = value
      console.log(heading)
      const cartItemsCount = cartList.length

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const renderCartItemsCount = () => (
        <>
          {cartItemsCount > 0 ? (
            <span className="cart-count-badge">{cartList.length}</span>
          ) : null}
        </>
      )
      const clic = () => {
        const {history} = props
        history.push('/cart')
      }
      return (
        <nav className="nav-header">
          <div className="nav-content">
            <div className="nav-bar-large-container">
              <Link to="/">
                <h1>{heading}</h1>
              </Link>

              <div className="cartAndLogout">
                <p>Myorders</p>
                <button type="button" onClick={clic} className="cartButton">
                  <AiOutlineShoppingCart className="cart" />
                  {renderCartItemsCount()}
                </button>

                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(Header)
