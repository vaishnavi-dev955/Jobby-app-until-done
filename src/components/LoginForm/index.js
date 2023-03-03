import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMessage: '', onError: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    history.replace('/')
    Cookies.set('jwt_token', jwtToken, {expires: 30})
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMessage: errorMsg, onError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const ApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(ApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      const data = await response.json()
      console.log(data)
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {onError, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="over-all-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <label className="label-para" htmlFor="username">
            USERNAME
          </label>
          <input
            placeholder="Username"
            id="username"
            className="Input-style"
            onChange={this.onChangeUsername}
            type="text"
          />
          <label className="label-para" htmlFor="password">
            PASSWORD
          </label>
          <input
            placeholder="Password"
            id="password"
            className="Input-style"
            onChange={this.onChangePassword}
            type="Password"
          />
          <button className="login-button" type="submit">
            Login
          </button>
          {onError && <p className="Error-msg">*{errorMessage}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
