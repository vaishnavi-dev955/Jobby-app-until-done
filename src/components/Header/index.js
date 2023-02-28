import './index.css'
import {Link} from 'react-router-dom'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'

const Header = () => {
  const SmallView = () => (
    <div>
      <div className="small-medium-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="website-logo-style1"
          alt="website logo"
        />
        <div className="icons-container">
          <Link to="/">
            <AiFillHome className="Home-icon" />
          </Link>
          <BsFillBriefcaseFill className="Brief-case-icon" />
          <FiLogOut className="Logout-icon" />
        </div>
      </div>

      <div className="medium-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="website-logo-style2"
          alt="website logo"
        />
        <div className="icons-container2">
          <Link to="/">
            <p className="Home-para">Home</p>
          </Link>
          <p className="Jobs-para">Jobs</p>
          <button type="button" className="Logout-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
  return <nav>{SmallView()}</nav>
}

export default Header
