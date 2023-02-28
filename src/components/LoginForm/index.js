import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  render() {
    return (
      <div className="over-all-container">
        <form className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <label className="label-para" htmlFor="username">
            USERNAME
          </label>
          <input placeholder="Username" id="username" className="Input-style" />
          <label className="label-para" htmlFor="password">
            PASSWORD
          </label>
          <input placeholder="Password" id="password" className="Input-style" />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginForm
