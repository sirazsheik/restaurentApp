import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    heading: '',
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.dishId) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.dishId === id,
    )
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.dishId) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  addHeading = tex => {
    this.setState({heading: tex})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.dishId !== id,
    )
    this.setState({cartList: updatedCartList})
  }

  changeCartQuantity = product => {
    const {id, n} = product
    if (n === 0) {
      this.removeCartItem(id)
    } else {
      const {cartList} = this.state
      const productObject = cartList.find(
        eachCartItem => eachCartItem.dishId === id,
      )
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.dishId) {
            return {...eachCartItem, quantity: n}
          }
          return eachCartItem
        }),
      }))
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.dishId === product.dishId,
    )

    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (productObject.dishId === eachCartItem.dishId) {
            const updatedQuantity = eachCartItem.quantity + product.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]

      this.setState({cartList: updatedCartList})
    }
  }

  render() {
    const {cartList, heading} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          heading,
          addHeading: this.addHeading,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          changeCartQuantity: this.changeCartQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
