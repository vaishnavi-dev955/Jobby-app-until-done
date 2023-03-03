import './index.css'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onClickLogOutButton = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  const SmallView = () => (
    <div>
      <div className="small-medium-view">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo-style1"
            alt="website logo"
          />
        </Link>
        <div className="icons-container">
          <Link to="/">
            <AiFillHome className="Home-icon" />
          </Link>
          <BsFillBriefcaseFill className="Brief-case-icon" />
          <FiLogOut className="Logout-icon" />
        </div>
      </div>

      <div className="medium-view">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo-style2"
            alt="website logo"
          />
        </Link>
        <div className="icons-container2">
          <Link to="/">
            <p className="Home-para">Home</p>
          </Link>
          <Link to="/jobs">
            <p className="Jobs-para">Jobs</p>
          </Link>
          <button
            type="button"
            className="Logout-button"
            onClick={onClickLogOutButton}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
  return <nav>{SmallView()}</nav>
}

export default withRouter(Header)
