import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { publishBot, getFlowDetail } from "./Action";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../../Images/brilworks-logo.png";
import { useRef } from "react";
import { selectorElements } from "../../Selectors/selector";
import withRouter from "../WrapperComponents/withRouter";

const FlowManagerNavbar = (props) => {
  const [isActiveIndex, setIsActiveIndex] = useState(0);
  const { flowDetail, element, id } = props;
  const [token, setToken] = useState(flowDetail?.publish_token);
  const [show, setShow] = useState(false);
  const hideopen = useRef("");
  const { pathname } = useLocation();

  useEffect(() => {
    getFlowDetail();
    document.body.addEventListener("mousedown", handleKeyDown);
    return () => {
      document.body.removeEventListener("mousedown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (hideopen.current && !hideopen.current.contains(e?.target)) {
      setShow(false);
    }
  };

  const liTags = [
    {
      text: "Build",
      path: `/bot/${id}`,
    },
    // {
    //   text: "Design",
    //   path: "/design",
    // },
    // { text: "Settings", path: "/setting" },
    {
      text: "Share",
      path: `/share/${id}`,
    },
    { text: "Analyze", path: `/analyze/${id}` },
  ];

  const handleClick = (i) => {
    setIsActiveIndex(i);
  };

  const handlePublish = () => {
    props?.publishBot(props?.id, element).then((response) => {
      if (response && !response.errorMessage && !response.error) {
        props?.handleAlert("Published Successfully", "success");
        setToken(response?.token);
        props?.setPublishName("Published");
      } else {
        props?.handleAlert(
          response?.errorMessage ||
            response?.error?.message ||
            "Something went wrong",
          "error"
        );
      }
    });
  };

  useEffect(() => {
    if (
      pathname === `/share/${id}` ||
      pathname === `/share/${id}/embed` ||
      pathname === `/share/${id}/link`
    ) {
      setIsActiveIndex(1);
    } else if (pathname === `/analyze/${id}`) {
      setIsActiveIndex(2);
    } else {
      setIsActiveIndex(0);
    }
  }, [pathname]);

  return (
    <>
      <div className="navbar">
        <div className="brilbot-logo-section">
          <div className="brilbot-logo ">
            <img src={logo} alt="Brilbot" />
          </div>
          <span>{flowDetail?.name}</span>
        </div>
        <div className="navbar-select-item">
          {liTags.map(({ text, path }, index) => (
            <Link
              to={path}
              key={index}
              state={text}
              className={`flow-navbar-options ${
                isActiveIndex === index ? "active" : ""
              }`}
              onClick={() => handleClick(index)}
            >
              {text}
            </Link>
          ))}
        </div>
        <div className="navbar-end-icons">
          {/* <div className="navbar-end-list1">
            <p>Save as draft</p>
            <div className="preview-icon">
              <i className="far fa-save code-icon"></i>
            </div>
            <div className="preview-icon">
              <i className="far fa-eye code-icon"></i>
            </div>
          </div> */}
          <div className="navbar-end-list3">
            {props?.publishName === "Publish" ? (
              <Button
                size="sm"
                className="publish-btn btn-bot"
                onClick={handlePublish}
              >
                {props?.publishName}
              </Button>
            ) : (
              <Button
                size="sm"
                disabled
                className="publish-btn btn-bot"
                onClick={handlePublish}
              >
                {props?.publishName}
              </Button>
            )}
            <Button
              size="sm"
              className="dropdown-btn btn-bot"
              disabled={token ? false : true}
              onClick={() => setShow(!show)}
            >
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </Button>
          </div>
          {/* <Button
            size="sm"
            className="btn-bot"
            onClick={props?.handleOpensideBar}
          >
            <i className="fa fa-plus" aria-hidden="true"></i>
          </Button> */}
          {show && (
            <Card className="publish-card" ref={hideopen}>
              <Link
                to={`/${token}/preview`}
                target="_blank"
                onClick={() => setShow(false)}
              >
                <span>Open</span>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  publishBot,
  getFlowDetail,
};

const mapStateToProps = (state) => {
  return {
    element: selectorElements(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FlowManagerNavbar));
