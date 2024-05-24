import {Component} from 'react'
import {v4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  onClickWebsite = event => {
    this.setState({website: event.target.value})
  }

  onClickUsername = event => {
    this.setState({username: event.target.value})
  }

  onClickPaswword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitValue = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }

    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachItem => eachItem.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {latestList, isShow, website, username, password, searchInput} =
      this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="image1"
          alt="app logo"
        />
        <div className="container1">
          <div>
            <div className="container11">
              <form className="form" onSubmit={this.onSubmitValue}>
                <h1 className="heading">Add New Password</h1>
                <div className="container1111">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    className="image3"
                    alt="website"
                  />
                  <input
                    type="text"
                    className="text"
                    placeholder="Enter Website"
                    value={website}
                    onChange={this.onClickWebsite}
                  />
                </div>
                <div className="container2222">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    className="image3"
                    alt="username"
                  />
                  <input
                    type="text"
                    className="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={this.onClickUsername}
                  />
                </div>
                <div className="container3333">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    className="image3"
                    alt="password"
                  />
                  <input
                    type="password"
                    className="text"
                    placeholder="Enter Password"
                    value={password}
                    onChange={this.onClickPaswword}
                  />
                </div>
                <button type="submit" className="button1">
                  Add
                </button>
              </form>
            </div>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="image2"
            alt="password manager"
          />
        </div>
        <div className="container2">
          <div className="container4">
            <div>
              <div className="me">
                <h1 className="heading2">Your Passwords</h1>
                <p className="paragraph">{newList.length}</p>
              </div>
            </div>
            <div>
              <div className="container4444">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  className="image3"
                  alt="search"
                />
                <input
                  type="search"
                  className="text"
                  placeholder="Search"
                  onChange={this.onSearch}
                  value={searchInput}
                />
              </div>
            </div>
          </div>
          <div className="bottom-container">
            <input
              type="checkbox"
              id="label"
              className="text2"
              onChange={this.showPassword}
            />
            <label htmlFor="label" className="label">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="container143">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                className="image5"
                alt="no passwords"
              />
              <p className="heading2">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <div className="container173">
              {newList.map(eachValue => (
                <li className="list-item" id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.classAdd}`}>
                    {eachValue.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="paragraph">{eachValue.websiteName}</p>
                    <p className="paragraph">{eachValue.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="image2"
                        alt="stars"
                      />
                    )}
                    {isShow && (
                      <p className="paragraph">{eachValue.Password}</p>
                    )}
                  </div>
                  <button
                    className="button1"
                    type="button"
                    data-testid="delete"
                    onClick={() => this.deleteItem(eachValue.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="image2"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
