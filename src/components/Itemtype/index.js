import {Component} from 'react'

import CartContext from '../../context/CartContext'

class Itemtype extends Component {
  state = {quantity: 0}

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {details} = this.props

          const {addCartItem, cartList} = value
          const add = () => {
            addCartItem({...details, quantity: 1})
          }
          console.log(cartList)

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
                      {details.dish_Availability && (
                        <button
                          type="button"
                          className="addCartbtn"
                          onClick={add}
                        >
                          ADD TO CART
                        </button>
                      )}
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
