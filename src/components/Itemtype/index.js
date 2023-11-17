import {Component} from 'react'

import CartContext from '../../context/CartContext'

class Itemtype extends Component {
  state = {n: 0}

  inc = () => {
    const {n} = this.state
    this.setState(pre => ({
      n: pre.n + 1,
    }))
  }

  dec = () => {
    const {n} = this.state
    this.setState(pre => ({
      n: pre.n - 1 < 0 ? 0 : pre.n - 1,
    }))
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {details} = this.props
          const {n} = this.state
          const {addCartItem, decrementCartItemQuantity, cartList} = value
          const add = () => {
            addCartItem({...details, quantity: 1})
            this.inc()
          }
          const decc = () => {
            decrementCartItemQuantity(details.dish_id)
            this.dec()
          }
          console.log(cartList)

          const cartButtons = () => (
            <div className="buttons">
              <button type="button" className="NButtons" onClick={decc}>
                -
              </button>
              <span className="spanCount">{n}</span>
              <button type="button" className="pButtons" onClick={add}>
                +
              </button>
            </div>
          )

          return (
            <li>
              <div className="card">
                <div className="decription">
                  <img
                    src="https://hi-static.z-dn.net/files/dc5/672c30fc583025d203c28d45992024d8.jpg"
                    className="sideImg"
                    alt="hii"
                  />
                  <div className="discCont">
                    <div className="details">
                      <h1>{details.dish_name}</h1>
                      <p className="dp">{details.dish_currency}</p>
                      <p className="dp">{details.dish_price}</p>
                      <div className="sideHead">
                        <p>
                          {details.dish_currency} {details.dish_price}
                        </p>
                      </div>
                      <p>{details.dish_description}</p>
                      {details.dish_Availability && cartButtons()}
                      {details.addonCat.length > 0 && (
                        <p>Customization available</p>
                      )}
                      {!details.dish_Availability && <p>Not available</p>}
                    </div>
                    <p className="calories">{details.dish_calories} calories</p>
                    <img
                      src={details.dish_image}
                      className="dishImg"
                      alt="dish"
                    />
                  </div>
                </div>
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Itemtype
