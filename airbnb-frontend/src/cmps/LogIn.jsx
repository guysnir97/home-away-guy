import { TextField } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { userService } from "../services/user.service";
import { onAddUser, onSetUser } from "../store/user.action"
export class _LogIn extends React.Component {

  state = {
    credentials: {
      username: '',
      password: '',
      fullname: '',
      imgUrl: '',
      isAdmin: false
    },
    isSignup: false,
    msg: '',

  }
  inputRef = React.createRef(null)

  componentDidMount() {
    window.addEventListener('click', this.props.toggleLogIn)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.props.toggleLogIn)

  }

  handleChange = (ev) => {
    const { credentials } = this.state
    const field = ev.target.name
    const value = ev.target.value
    this.setState({ credentials: { ...credentials, [field]: value } })
  }


  onSetColor = (ev) => {
    let x = ev.clientX
    let y = ev.clientY
    this.inputRef.current.style.setProperty('--mouse-x', x)
    this.inputRef.current.style.setProperty('--mouse-y', y)
  }

  toggleSignup = () => {
    this.setState({ isSignup: true })
  }



  onSubmit = async (ev) => {
    ev.preventDefault()
    const { credentials, isSignup } = this.state
    const { username, password } = this.state.credentials
    if (!username || !password) {
      this.setState({ msg: 'All inputs required' })
      return
    }
    try {
      if (isSignup) {
        await this.props.onAddUser(credentials)
      } else {
        await this.props.onSetUser(credentials)
      }
      this.props.onToggleLogin()
    } catch (err) {
      this.setState({ msg: 'Invalid username | password' })
    }
  }
  onLoginDemoUser = async () => {
    const DemoUser = userService.getDemoUser()
    await this.props.onSetUser(DemoUser)
    this.props.onToggleLogin()
  }

  render() {
    const { isSignup, msg } = this.state
    return (
      <section>
        <div onClick={() => this.props.onCloseLogin()} className="screen"></div>
        <form className={`login-form flex column align-center`} onClick={(ev) => ev.stopPropagation()} onSubmit={this.onSubmit}>
          <p className="login-header fs16 fh20 bold">Log in or sign up</p>
          <div className="seperation-line-login "></div>
          <div className="login-main-container">
            <h2 className="login-welcome fw-unset fs22 fh26 medium">Welcome to Homeaway</h2>
            {msg && <h3>{msg}</h3>}
            <div className="login-input-continer flex column gap10">
              <TextField
                id="outlined-basic"
                label="Enter username"
                variant="outlined"
                name='username'
                onChange={this.handleChange}
              />
              <TextField
                id="outlined-basic-2"
                label="Enter password"
                variant="outlined"
                name='password'
                type='password'
                onChange={this.handleChange}
              />
              {isSignup && <TextField
                id="outlined-basic-3"
                label="Enter fullname"
                variant="outlined"
                name='fullname'
                onChange={this.handleChange}
              />}
              {!isSignup && <div className="fh32">
                <p>New to Homeaway? <span onClick={this.toggleSignup}>Sign up!</span></p>

                <p>Or Login with <span></span> <span className="text-align" onClick={this.onLoginDemoUser}>  Demo-User</span> </p>
              </div>
              }
            </div>
            <button ref={this.inputRef} onMouseMove={this.onSetColor} className="continue-btn fs16 fh20 medium ">Continue</button>
          </div>
          <button onClick={() => this.props.onCloseLogin()} className="login-close-btn fs22 fh26 bold">X</button>
        </form>
      </section >
    )
  }
}

function mapStateToProps(state) {
  return state
}
const mapDispatchToProps = {
  onAddUser,
  onSetUser

}


export const LogIn = connect(mapStateToProps, mapDispatchToProps)(withRouter(_LogIn))

