import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Itemtype from '../Itemtype'
import './index.css'

class Home extends Component {
  state = {list: [], status: 'Salads and Soup', count: 0}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch(
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
    )
    const data = await response.json()
    this.setState({list: data[0]})
  }

  changeStatus = text => {
    this.setState({status: text})
  }

  incCount = () => {
    this.setState(pre => ({
      count: pre.count + 1,
    }))
  }

  decCount = () => {
    this.setState(pre => ({
      count: pre.count - 1 < 0 ? 0 : pre.count - 1,
    }))
  }

  render() {
    const {count, list, status} = this.state

    if (list.length !== 0) {
      const filArray = list.table_menu_list.filter(
        each => each.menu_category === status,
      )

      return (
        <>
          <div className="headingCont">
            <h1>{list.restaurant_name}</h1>
            <p>My Orders</p>
            <div className="cartCont">
              <AiOutlineShoppingCart className="cart" />
              <p className="cartItems">{count}</p>
            </div>
          </div>
          <div className="buttonCont">
            {list.table_menu_list.map(each => {
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
              <Itemtype
                details={each}
                key={each.dish_id}
                incCount={this.incCount}
                decCount={this.decCount}
              />
            ))}
          </ul>
        </>
      )
    }
    return null
  }
}

export default Home
