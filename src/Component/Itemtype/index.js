import {Component} from 'react'

class Itemtype extends Component {
  state = {n: 0, update: false}

  inc = incCount => {
    const {n, update} = this.state
    // if (update === false) {
    //   incCount()
    // }
    this.setState(pre => ({
      n: pre.n + 1,
      update: true,
    }))
    incCount()
  }

  dec = decCount => {
    const {n, update} = this.state

    // if (n === 1) {
    //   decCount()
    // }
    this.setState(pre => ({
      n: pre.n - 1 < 0 ? 0 : pre.n - 1,
      update: n - 1 !== 0,
    }))
    if (n !== 0) {
      decCount()
    }
  }

  render() {
    const {n} = this.state
    const {details, incCount, decCount} = this.props
    const decr = () => {
      this.dec(decCount)
    }
    const incr = () => {
      this.inc(incCount)
    }
    const cartButtons = () => (
      <div className="buttons">
        <button type="button" className="NButtons" onClick={decr}>
          -
        </button>
        <span className="spanCount">{n}</span>
        <button type="button" className="pButtons" onClick={incr}>
          +
        </button>
      </div>
    )
    console.log(details.addonCat.length)

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
                {details.addonCat.length > 0 && <p>Customization available</p>}
                {!details.dish_Availability && <p>Not available</p>}
              </div>
              <p className="calories">{details.dish_calories} calories</p>
              <img src={details.dish_image} className="dishImg" alt="dish" />
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default Itemtype
