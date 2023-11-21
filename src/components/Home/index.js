import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Itemtype from '../Itemtype'
import CartContext from '../../context/CartContext'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    list: [],
    status: 'Salads and Soup',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductData()
  }

  getProductData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({
        list: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  changeStatus = text => {
    this.setState({status: text})
  }

  renderProductDetailsView = () => (
    <CartContext.Consumer>
      {value => {
        const {list, status} = this.state
        const filArray = list[0].table_menu_list.filter(
          each => each.menu_category === status,
        )
        const {cartList, heading, addHeading} = value
        if (heading === '') {
          addHeading(list[0].restaurant_name)
        }
        const cartItemsCount = cartList.length
        return (
          <>
            <Header details={list[0].restaurant_name} />
            <div className="buttonCont">
              {list[0].table_menu_list.map(each => {
                const change = () => {
                  this.changeStatus(each.menu_category)
                }
                return (
                  <button
                    onClick={change}
                    className={`buttonItem ${
                      status === each.menu_category ? 'active' : ''
                    }`}
                    key={each.menu_category_id}
                    type="button"
                  >
                    {each.menu_category}
                  </button>
                )
              })}
            </div>
            <ul>
              {filArray[0].category_dishes.map(each => (
                <Itemtype details={each} key={each.dish_id} />
              ))}
            </ul>
          </>
        )
      }}
    </CartContext.Consumer>
  )

  renderProductDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}

export default Home
