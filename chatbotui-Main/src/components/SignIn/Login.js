import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import withRouter from "../WrapperComponents/withRouter";
import logo from "../../Images/brilworks-logo.png";
import { connect } from "react-redux";
import { doLogin } from "./action";
import { selectorUserData } from "../../Selectors/selector";

const formValidation = ({ email, password }, type) => {
  const errors = { isError: false };
  if (type === "email") {
    if (email.trim() === "") {
      errors.email = "enter your email id";
      errors.isError = true;
    }
  } else if (type === "password") {
    if (password.trim() === "") {
      errors.password = "Password field is empty";
      errors.isError = true;
    }
  }
  return errors;
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: {},
      type: "password",
      loading: false,
      userData: {},
    };
  }

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target?.name]: e.target.value }, () => {
      const err = formValidation(this.state, e.target?.name);
      this.setState({ error: err });
    });
  };

  doLogin = async (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    if (this.state.email !== "") {
      if (this.state.password !== "") {
        this.setState({ loading: true });
        await this.props
          .doLogin({
            email,
            password,
          })
          .then(async (response) => {
            if (response && !response.errorMessage) {
              this.setState({ loading: false, userData: response });
              this.props?.handleAlert("Login successfully", "success");
              this.props?.history("/dashboard");
            } else {
              this.setState({ loading: false });
              this.props?.handleAlert(
                response?.errorMessage || "Something went wrong",
                "error"
              );
            }
          })
          .catch((error) => {
            this.props?.handleAlert(
              error?.message || "Something went wrong",
              "error"
            );
          });
      } else {
        this.props?.handleAlert("Please enter your password ", "error");
      }
    } else {
      this.props?.handleAlert("Please enter your email", "error");
    }
  };

  handleClick = () => {
    this.setState({ type: !this.state?.type });
  };
  render() {
    const { email, password, error, type, loading } = this.state;
    return (
      <div className="main-container">
        <div className="left-view">
          <div className="left-center-view">
            <img className="login-logo" alt="logo" src={logo} />
            <span>BrilBOT</span>
          </div>
        </div>
        <div className="right-view">
          <div className="new-user">
            <p>
              <span className="grey-text-link">New user? </span>
              <Link to="/signup" className="link-to-formPage">
                SIGN UP
              </Link>
            </p>
          </div>
          <div className="form-container">
            <h3>Sign in to BrilBot</h3>
            <hr />
            <Form className="login-form">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  Email <span className="text-danger">*</span>
                </Form.Label>

                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  isInvalid={!!error?.email}
                />
                <Form.Control.Feedback type="invalid">
                  {error?.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mb-3 login-password-field"
                controlId="formBasicPassword"
              >
                <Form.Label>
                  Password <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  type={type ? "password" : "text"}
                  value={password}
                  isInvalid={!!error?.password}
                />
                <span className="show-password" onClick={this.handleClick}>
                  {type ? (
                    <i className="fa fa-eye-slash"></i>
                  ) : (
                    <i className="fa fa-eye"></i>
                  )}
                </span>
                <Form.Control.Feedback type="invalid">
                  {error?.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Link to="/forgot" className="float-end">
                Forgot Password?
              </Link>
              <Button
                className="signUpSubmitButton w-100 m-0 mt-4 mb-3 brilCrmButton"
                type="submit"
                onClick={this.doLogin}
              >
                {loading ? (
                  <div className="dot-pulse" />
                ) : (
                  <h5 className="login-btn m-0 p-0 ">SIGN IN</h5>
                )}
              </Button>
            </Form>
          </div>
          <div className="copyright-text">
            <p>© 2021, Brilworks Software LLP. All Right Reserved.</p>
          </div>
        </div>
      </div>
    );
  }
}
// export default withRouter(Login);

const mapDispatchToProps = {
  doLogin,
};

const mapStateToProps = (state) => {
  return {
    userData: selectorUserData(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
