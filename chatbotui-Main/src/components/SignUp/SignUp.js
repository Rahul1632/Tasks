import React, { Component } from "react";
import logo from "../../Images/brilworks-logo.png";
import { Form, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { doSignUp } from "./action";
import { trim } from "lodash";
import { connect } from "react-redux";
import withRouter from "../WrapperComponents/withRouter";
import withUseFormHook from "../WrapperComponents/ReactHookForm";
import { emailValidRegex, passwordRegex } from "../Constant/Regex";

const validation = ({ first_name, last_name }, handleAlert) => {
  if (first_name?.trim() === "") {
    handleAlert("Please enter first name", "error");
    return false;
  }
  if (last_name?.trim() === "") {
    handleAlert("Please enter last name", "error");
    return false;
  }
  return true;
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
      },
      type: true,
      loading: false,
      buttonLoading: false,
    };
  }
  handleChange = (e) => {
    const { form } = this.state;
    form[e.target?.name] = e.target?.value;
    this.setState({ form });
  };

  doSignUp = (e) => {
    let { email, password, first_name, last_name } = this.state?.form;
    first_name = trim(first_name);
    last_name = trim(last_name);
    const { errors } = this.props;
    e.preventDefault();
    if (
      !(
        errors &&
        Object.keys(errors).length === 0 &&
        Object.getPrototypeOf(errors) === Object.prototype &&
        !(!first_name || !last_name || !email || !password)
      )
    ) {
      this.props?.handleAlert("Please enter required fields.", "error");
    } else {
      if (validation(this.state?.form, this.props?.handleAlert)) {
        this.props
          ?.doSignUp({
            email,
            password,
            first_name,
            last_name,
          })
          .then((response) => {
            this.setState({ loading: true });
            if (response && !response.errorMessage) {
              this.setState({ loading: false });
              this.props?.handleAlert("SignUp successfully", "success");
              this.props?.history("/dashboard");
              this.setState({ buttonLoading: false });
            } else {
              this.setState({ loading: false });
              this.props?.handleAlert(
                response?.errorMessage ||
                  "Please fill correct data in the fields",
                "error"
              );
              this.setState({ buttonLoading: false });
            }
          })
          .catch((error) => {
            this.props?.handleAlert(
              error?.message || "Something went wrong",
              "error"
            );
            this.setState({ buttonLoading: false });
          });
      }
    }
  };

  handleClick = () => {
    const { type } = this.state;
    this.setState({ type: !type });
  };

  render() {
    const { email, password, first_name, last_name } = this.state?.form;
    const { errors, register } = this.props;
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
            <h3>Create an account</h3>
            <hr />
            <Form className="">
              <Row className="chatbot-signup-row">
                <Col className="chatbot-signup-col">
                  <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>
                      First Name <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Control
                      type="text"
                      className={{
                        "is-invalid": errors?.first_name,
                      }}
                      name="first_name"
                      value={first_name}
                      {...register("first_name", {
                        required: "First name is required",

                        onChange: this.handleChange,
                      })}
                      placeholder="First Name"
                      onChange={this.handleChange}
                    />
                    {errors?.first_name && (
                      <div className="invalid-feedback">
                        {errors?.first_name?.message}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>
                      Last Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className={{
                        "is-invalid": errors?.last_name,
                      }}
                      placeholder="Last Name"
                      name="last_name"
                      value={last_name}
                      {...register("last_name", {
                        required: "Last name is required",

                        onChange: this.handleChange,
                      })}
                      onChange={this.handleChange}
                    />
                    {errors?.last_name && (
                      <div className="invalid-feedback">
                        {errors?.last_name?.message}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  Email <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  className={{
                    "is-invalid": errors?.email,
                  }}
                  {...register("email", {
                    required: "Please enter your email address",
                    pattern: {
                      value: emailValidRegex,
                      message: "Please enter valid email address",
                    },
                    onChange: this.handleChange,
                  })}
                  value={email}
                  placeholder="Enter your Email Address"
                />
                {errors?.email && (
                  <div className="invalid-feedback">
                    {errors?.email?.message}
                  </div>
                )}
              </Form.Group>
              <Form.Group
                className="mb-3 login-password-field"
                controlId="formBasicPassword"
              >
                <Form.Label>
                  Password <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type={this.state?.type ? "password" : "text"}
                  className={{
                    "is-invalid": errors.password,
                  }}
                  placeholder="Password"
                  name="password"
                  value={password}
                  {...register("password", {
                    required: "Please enter your password",
                    pattern: {
                      value: passwordRegex,
                      message:
                        "Password should contain at least one special character, one uppercase letter, one lowercase letter,a number and password should be atleast 8 digit",
                    },
                    onChange: this.handleChange,
                  })}
                />
                <span className="show-password" onClick={this.handleClick}>
                  {this.state?.type ? (
                    <i className="fa fa-eye-slash"></i>
                  ) : (
                    <i className="fa fa-eye"></i>
                  )}
                </span>
                {errors?.password && (
                  <div className="invalid-feedback">
                    {errors?.password?.message}
                  </div>
                )}
              </Form.Group>

              <Button
                className="signUpSubmitButton w-100 m-0 mt-4 mb-3 brilCrmButton btn btn-primary "
                type="submit"
                onClick={this.doSignUp}
              >
                SignUp
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

// export default withRouter(SignUp);

const mapDispatchToProps = {
  doSignUp,
};
export default connect(
  null,
  mapDispatchToProps
)(withRouter(withUseFormHook(SignUp)));
