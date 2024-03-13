import './index.css'

const PasswordItem = props => {
  const {passwordDetails, isChecked, onDeletePsdItem} = props
  const {website, username, password, bgColor, id} = passwordDetails
  const initial = website.slice(0, 1)
  const onClickButton = () => {
    onDeletePsdItem(id)
  }

  return (
    <li className="each-list-item">
      <div className="first-container">
        <div className={`first-letter ${bgColor}`}>
          <p>{initial}</p>
        </div>
        <div>
          <p className="website-text">{website}</p>
          <p className="website-text">{username}</p>
          {isChecked ? (
            <p className="website-text">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars-img"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        className="delete-btn"
        onClick={onClickButton}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}
export default PasswordItem
