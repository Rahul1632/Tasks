import React from "react";
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
import media from "../../Images/NodeImages/media.png";
import slack from "../../Images/NodeImages/slack.png";
import sendMail from "../../Images/NodeImages/sendMail.png";

const FlowManagerSideBar = (props) => {
  const { open, handleAddNode } = props;
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
      case "media":
        return media;
      case "slack":
        return slack;
      case "send_email":
        return sendMail;

      default:
        return "";
    }
  };
  return (
    <div className={`sidebar-section ${open ? "menu-open" : "menu-close"}`}>
      {size(ESSENTIALS) > 0 && (
        <div className="essentials-setion">
          <div className="sidebar-heading">ESSENTIALS</div>
          <div className="node-type-list">
            {ESSENTIALS?.map((data, index) => {
              return (
                <div
                  key={index}
                  className="type-btn"
                  onClick={() => handleAddNode(data?.type)}
                >
                  <img
                    className="type-icon"
                    src={loadImg(data?.type)}
                    alt="img"
                  />
                  <span className="type-name">{data?.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {size(QUESTIONS) > 0 && (
        <div className="questions-setion">
          <div className="sidebar-heading">QUESTIONS</div>
          <div className="node-type-list">
            {QUESTIONS?.map((data, index) => {
              return (
                <div
                  key={index}
                  className="type-btn"
                  onClick={() => handleAddNode(data?.type)}
                >
                  <img
                    className="type-icon"
                    src={loadImg(data?.type)}
                    alt="img"
                  />
                  <span className="type-name">{data?.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {size(FLOWOPERATIONS) > 0 && (
        <div className="flowoperations-setion">
          <div className="sidebar-heading">FLOW OPERATIONS</div>
          <div className="node-type-list">
            {FLOWOPERATIONS?.map((data, index) => {
              return (
                <div
                  key={index}
                  className="type-btn"
                  onClick={() => handleAddNode(data?.type)}
                >
                  <img
                    className="type-icon"
                    src={loadImg(data?.type)}
                    alt="img"
                  />
                  <span className="type-name">{data?.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {size(INTEGRATIONS) > 0 && (
        <div className="integrations-setion">
          <div className="sidebar-heading">INTEGRATIONS</div>
          <div className="node-type-list">
            {INTEGRATIONS?.map((data, index) => {
              return (
                <div
                  key={index}
                  className="type-btn"
                  onClick={() => handleAddNode(data?.type)}
                >
                  <img
                    className="type-icon"
                    src={loadImg(data?.type)}
                    alt="img"
                  />
                  <span className="type-name">{data?.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowManagerSideBar;
