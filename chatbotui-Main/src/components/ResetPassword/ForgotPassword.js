import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { doForgotPassword } from "./action";
import logo from "../../Images/brilworks-logo.png";
import withRouter from "../WrapperComponents/withRouter";
export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      loading: false,
    };
  }

  handleChange = (e) => {
    this.setState({ email: e?.target?.value });
  };

  doForgotPassword = (e) => {
    const { email } = this.state;
    e.preventDefault();
    this.setState({ loading: true });
    this.props
      .doForgotPassword(email)
      .then((response) => {
        if (response && !response.errorMessage && !response.error) {
          this.setState({ loading: false });
          this.props?.handleAlert(`${response.message}`, "success");
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
      });
  };

  render() {
    const { email, loading } = this.state;
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
              <span className="grey-text-link">Already have an account? </span>
              <Link to="/login" className="link-to-formPage">
                SIGN IN
              </Link>
            </p>
          </div>
          <div className="form-container">
            <h3>Forgot Password?</h3>
            <hr />
            <p>
              Enter your registered email and we'll send you a link to get back
              into your account.
            </p>
            <br />
            <Form className="forgot-form">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  Email <span className="text-danger">*</span>
                </Form.Label>

                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  placeholder="name@example.com"
                />
              </Form.Group>
              <br />
              <Button
                className="signUpSubmitButton brilCrmButton w-100 m-0 mt-1 mb-3"
                disabled={loading}
                onClick={this.doForgotPassword}
              >
                {loading ? (
                  <div className="dot-pulse" />
                ) : (
                  <h5 className="reset-btn m-0 p-0">RESET PASSWORD</h5>
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
  doForgotPassword,
};
const mapStateToProps = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ForgotPassword));
