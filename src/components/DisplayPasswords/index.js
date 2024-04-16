import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import NoPasswordView from '../NoPasswordView'
import PasswordItem from '../PasswordItem'
import './index.css'

const backgroundColors = [
  'color1',
  'color2',
  'color3',
  'color4',
  'color5',
  'color6',
  'color7',
  'color8',
]

const getPreviousPasswordList = () => {
  const listItems = localStorage.getItem('passwordsData')
  if (listItems === null) {
    return []
  }
  const parsedData = JSON.parse(listItems)
  return parsedData
}

const previousPasswordList = getPreviousPasswordList()

class DisplayPasswords extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    passwordsList: previousPasswordList,
    isChecked: false,
  }

  onClickCheckbox = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {usernameInput, passwordInput, websiteInput} = this.state
    const num = Math.ceil(Math.random() * backgroundColors.length - 1)
    const newPsd = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      bgColor: backgroundColors[num],
    }
    console.log(newPsd)
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPsd],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onDeletePsdItem = id => {
    const {passwordsList} = this.state
    const filteredList = passwordsList.filter(each => each.id !== id)
    this.setState({passwordsList: filteredList})
    // localStorage.setItem('passwordsData', JSON.stringify(filteredList))
  }

  onClickSave = () => {
    const {passwordsList} = this.state
    localStorage.setItem('passwordsData', JSON.stringify(passwordsList))
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordsList,
      searchInput,
      isChecked,
    } = this.state
    console.log(passwordsList)

    const searchResults = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="psd-form-img-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="sm-psd-img"
          />
          <div className="form-details-container">
            <h1 className="heading">Add New Password</h1>
            <form onSubmit={this.onSubmitForm}>
              <div className="each-input-item">
                <div className="logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-logo"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  value={websiteInput}
                  onChange={this.onChangeWebsite}
                  required
                />
              </div>
              <div className="each-input-item">
                <div className="logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-logo"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  value={usernameInput}
                  onChange={this.onChangeUsername}
                  required
                />
              </div>
              <div className="each-input-item">
                <div className="logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-logo"
                  />
                </div>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  value={passwordInput}
                  onChange={this.onChangePassword}
                  required
                />
              </div>
              <div className="button-container">
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="lg-psd-img"
          />
        </div>
        <div className="display-psds-container">
          <div className="search-psd-container">
            <div className="psd-count-container">
              <h1 className="show-psd">Your Passwords</h1>
              <p className="psd-count">{searchResults.length}</p>
            </div>
            <div className="search-item">
              <div className="logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="input-logo"
                />
              </div>
              <input
                type="search"
                placeholder="Search"
                className="input"
                value={searchInput}
                onChange={this.onChangeSearch}
                required
              />
            </div>
          </div>
          <hr className="separator" />
          <div className="button-container">
            <button
              type="button"
              className="add-btn"
              onClick={this.onClickSave}
            >
              Save
            </button>
            <div className="checkbox-container">
              <input
                type="checkbox"
                onClick={this.onClickCheckbox}
                checked={isChecked}
                id="checkbox"
              />
              <label className="show-psd" htmlFor="checkbox">
                Show passwords
              </label>
            </div>
          </div>
          {searchResults.length === 0 ? (
            <NoPasswordView />
          ) : (
            <ul className="unordered-result-container">
              {searchResults.map(eachResult => (
                <PasswordItem
                  key={eachResult.id}
                  passwordDetails={eachResult}
                  isChecked={isChecked}
                  onDeletePsdItem={this.onDeletePsdItem}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default DisplayPasswords
