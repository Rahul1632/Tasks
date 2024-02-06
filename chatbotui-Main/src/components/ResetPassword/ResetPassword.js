import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import logo from "../../Images/brilworks-logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { doResetPassword, doGetResetToken } from "./action";
import withRouter from "../WrapperComponents/withRouter";
import { passwordRegex } from "../constant/Regex";

const formValidation = ({ password, confirmPassword }, type) => {
  const errors = { isError: true };
  if (type === "password" || type === "confirmPassword") {
    if (password.trim() === "") {
      errors.password = "Please enter your password";
      // errors.isError = true;
    } else if (!passwordRegex.test(password)) {
      errors.password = "Password is too weak";
      // errors.isError = true;
    } else if (type === "confirmPassword") {
      if (confirmPassword.trim() === "") {
        errors.confirmPassword = "This field is required";
        errors.isError = true;
      } else if (confirmPassword !== password) {
        errors.confirmPassword = "password confirmation does not match";
        errors.isError = true;
      } else if (password === confirmPassword) {
        errors.isError = false;
      }
    }
  }

  return errors;
};
class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      error: { isError: true },
      loading: false,
      data: null,
    };
  }
  handleChange = (e) => {
    this.setState({ ...this.state, [e.target?.name]: e.target?.value }, () => {
      const err = formValidation(this.state, e.target?.name);
      this.setState({ error: err });
    });
  };

  componentDidMount() {
    this.doGetResetToken();
  }
  doResetPassword = async (e) => {
    const { password, confirmPassword, error, data } = this.state;
    const datas = {
      ...data,
      password: password,
      confirmPassword: confirmPassword,
    };
    e.preventDefault();
    if (!error.isError) {
      this.setState({ loading: true });
      await this.props
        .doResetPassword(datas)
        .then((response) => {
          if (response && !response.errorMessage && !response.error) {
            this.setState({ loading: false });
            this.props?.handleAlert(response.message);
            this.props?.history("/login");
          } else {
            this.setState({ loading: false });
            this.props?.handleAlert(
              response?.errorMessage ||
                response?.error?.message ||
                "Something went wrong",
              "error"
            );
          }
        })
        .catch((error) => {
          this.props?.handleAlert(
            error?.message || "Something went wrong",
            "error"
          );
          this.setState({ loading: false });
        });
    } else {
      this.props?.handleAlert("Please enter correct password.", "error");
    }
  };
  doGetResetToken = async () => {
    const { params } = this.props;
    const { token } = params || {};

    await this.props
      .doGetResetToken(token)
      .then((response) => {
        if (response && !response.errorMessage && !response.error) {
          this.setState({ data: response });
          this.props?.handleAlert(`token`);
        } else {
          this.props?.handleAlert(
            response?.errorMessage ||
              response?.error?.message ||
              "Something went wrong",
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
  };
  render() {
    const { password, confirmPassword, error, loading } = this.state;
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
              <span className="grey-text-link">New user?</span>
              <Link to="/signup" className="link-to-formPage">
                SIGN UP
              </Link>
            </p>
          </div>
          <div className="form-container">
            <h3>Reset Password?</h3>
            <hr />
            <br />
            <Form className="forgot-form">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>

                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                  placeholder="Enter your password "
                  isInvalid={!!error?.password}
                />
                <Form.Control.Feedback type="invalid">
                  {error?.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>

                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onBlur={this.handleChange}
                  onChange={this.handleChange}
                  placeholder="Password"
                  isInvalid={!!error?.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {error?.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Button
                disabled={error?.isError || loading}
                className="signUpSubmitButton w-100 m-0 mt-4 mb-3 brilCrmButton btn btn-primary"
                onClick={this.doResetPassword}
              >
                {loading ? (
                  <div className="dot-pulse" />
                ) : (
                  <h5 className="reset-btn m-0 p-0">Reset Password</h5>
                )}
              </Button>
            </Form>
          </div>
          <div className="copyright-text">
            <p>© 2021, Brilworks Software LLP. All Rights Reserved</p>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
  doResetPassword,
  doGetResetToken,
};
const mapStateToProps = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResetPassword));
