import React, { useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import NodeType from "./NodeType.json";
import { size } from "loadsh";
import buttonImg from "../../Images/NodeImages/button.png";
import conditionImg from "../../Images/NodeImages/condition.png";
import dateImg from "../../Images/NodeImages/date.png";
import emailImg from "../../Images/NodeImages/Email.png";
import fileImg from "../../Images/NodeImages/file.png";
import mediaImg from "../../Images/NodeImages/media.png";
import messageImg from "../../Images/NodeImages/message.png";
// import nameImg from "../../Images/NodeImages/name.png";
import numberImg from "../../Images/NodeImages/NUMBER.png";
import phoneImg from "../../Images/NodeImages/phone.png";
import textImg from "../../Images/NodeImages/text.png";
import urlImg from "../../Images/NodeImages/url.png";
import jump from "../../Images/NodeImages/jump.png";
import slack from "../../Images/NodeImages/slack.png";
import sendMail from "../../Images/NodeImages/sendMail.png";

const AddNodePopUp = (props) => {
  const { xPos, yPos, handleAddNode } = props;
  const hidePopUp = useRef("");
  const { ESSENTIALS, QUESTIONS, FLOWOPERATIONS, INTEGRATIONS } = NodeType[0];

  const loadImg = (type) => {
    switch (type) {
      case "button":
        return buttonImg;
      case "chat":
        return messageImg;
      case "media":
        return mediaImg;
      case "text":
        return textImg;
      case "number":
        return numberImg;
      case "phone":
        return phoneImg;
      case "url":
        return urlImg;
      case "email":
        return emailImg;
      case "file":
        return fileImg;
      case "date":
        return dateImg;
      case "conditional_logic":
        return conditionImg;
      case "jumpflow":
        return jump;
      case "slack":
        return slack;
      case "send_email":
        return sendMail;

      default:
        return "";
    }
  };

  const handleKeyDown = (e) => {
    if (hidePopUp.current && !hidePopUp.current.contains(e?.target)) {
      props?.setNodePopUp(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleKeyDown);
    return () => {
      window.removeEventListener("mousedown", handleKeyDown);
    };
  }, []);

  return (
    <div className="add-node-container">
      <Card
        className={`add-node-card`}
        ref={hidePopUp}
        style={{ "--top": `${yPos}px`, "--left": `${xPos}px` }}
      >
        <Card.Body className="add-node-card-body">
          <ul className="add-node-list">
            <div className="add-node-list-container">
              {size(ESSENTIALS) > 0 && (
                <div className="essentials-setion">
                  <div className="sidebar-heading">ESSENTIALS</div>
                  {ESSENTIALS?.map((data, index) => {
                    return (
                      <div
                        key={index}
                        className="list-group-item"
                        onClick={() => handleAddNode(data?.type, xPos, yPos)}
                      >
                        <img
                          className="type-icon"
                          src={loadImg(data?.type)}
                          alt="abc"
                        />
                        <span className="type-name">{data?.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              {size(QUESTIONS) > 0 && (
                <div className="questions-setion">
                  <div className="sidebar-heading">QUESTIONS</div>
                  {QUESTIONS?.map((data, index) => {
                    return (
                      <div
                        key={index}
                        className="list-group-item"
                        onClick={() => handleAddNode(data?.type, xPos, yPos)}
                      >
                        <img
                          className="type-icon"
                          src={loadImg(data?.type)}
                          alt="abc"
                        />
                        <span className="type-name">{data?.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              {size(FLOWOPERATIONS) > 0 && (
                <div className="flowoperations-setion">
                  <div className="sidebar-heading">FLOWOPERATIONS</div>
                  {FLOWOPERATIONS?.map((data, index) => {
                    return (
                      <div
                        key={index}
                        className="list-group-item"
                        onClick={() => handleAddNode(data?.type, xPos, yPos)}
                      >
                        <img
                          className="type-icon"
                          src={loadImg(data?.type)}
                          alt="abc"
                        />
                        <span className="type-name">{data?.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              {size(INTEGRATIONS) > 0 && (
                <div className="integrations-setion">
                  <div className="sidebar-heading">INTEGRATIONS</div>
                  {INTEGRATIONS?.map((data, index) => {
                    return (
                      <div
                        key={index}
                        className="list-group-item"
                        onClick={() => handleAddNode(data?.type, xPos, yPos)}
                      >
                        <img
                          className="type-icon"
                          src={loadImg(data?.type)}
                          alt="abc"
                        />
                        <span className="type-name">{data?.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddNodePopUp;
