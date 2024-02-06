import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Handle, Position } from "react-flow-renderer";
import { connect } from "react-redux";
import {
  deleteNodes,
  getAllNodeList,
  updateNodeData,
  deleteSubNodes,
} from "./Action";
import { updateSubNode, addSubNode } from "../FlowManger/Action";
import buttonImg from "../../Images/NodeImages/button.png";
import { useLocation, useParams } from "react-router-dom";
import { size } from "lodash";

const ButtonNode = (props) => {
  const userId = localStorage.getItem("user_id");
  const { data } = props;
  const { botId } = useParams();
  const { pathname } = useLocation();
  const [message, setMessage] = useState(data);
  const btnData = message?.nodeData?.filter((data) => data?.type === "button");
  const chatData = message?.nodeData?.filter((data) => data?.type === "chat");
  const [messageData, setmessageData] = useState("");
  const [buttonData, setButtonData] = useState({});

  useEffect(() => {
    setMessage(data);
  }, [data]);

  const handleButtonChange = (e, index) => {
    const { value } = e?.target;
    let data = { ...btnData };
    data[index].data.btn = value;
    setButtonData(data);
  };

  const handleMessageChange = (e) => {
    const { value } = e?.target;
    let data = { ...btnData };
    data[0].text = value;
    setmessageData(data);
  };

  const handleBlureChat = () => {
    const sendData = [
      {
        id: chatData[0]?.id,
        node_id: chatData[0]?.node_id,
        flow_id: botId,
        type: "chat",
        destination: "",
        data: {
          text: messageData[0]?.text,
        },
      },
    ];
    props.updateSubNode(sendData).then(() => {
      props?.getAllNodeList(botId);
    });
  };

  const handleBlureButton = (index) => {
    let sendData = [
      {
        id: btnData[index]?.id,
        node_id: btnData[index]?.node_id,
        flow_id: botId,
        type: "button",
        destination: "",
        data: {
          btn: buttonData[index]?.data?.btn,
        },
      },
    ];

    props.updateSubNode(sendData).then(() => {
      props?.getAllNodeList(botId);
      sendData = [];
      setButtonData({});
    });
  };

  const handleButtonAdd = () => {
    const btnData = {
      node_id: data?.id,
      flow_id: botId,
      type: "button",
      data: {
        btn: "",
      },
    };
    props.addSubNode(btnData).then(() => {
      props?.getAllNodeList(botId);
    });
  };

  const handleNodeDelete = (id) => {
    props
      ?.deleteNodes(id, botId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          // props.handleAlert("New Node Added", "success");
          getAllNodeList(botId);
        } else {
          // props?.handleAlert(
          //   response?.message ||  "Something went wrong",
          //   "error"
          // );
        }
      })
      .catch((error) => {
        props?.handleAlert(error?.message || "Something went wrong", "error");
      });
  };

  const getAllNodeList = (id) => {
    props?.getAllNodeList(id);
  };

  const handleUpdate = (data) => {
    props?.updateNodeData(data);
  };

  const handleDeleteButton = (id) => {
    props?.deleteSubNodes(id, userId, botId).then((response) => {
      props?.getAllNodeList(botId);
    });
  };
  return (
    <>
      {pathname === `/analyze/${botId}` ? (
        <Card className="special-node-main-container">
          <Card.Header className="special-node-welcome-container">
            <div className="special-node-img">
              <img className="node-icon" src={buttonImg} alt="img" />
              <span>Button</span>
            </div>
          </Card.Header>
          <Card.Body className="special-node-body">
            <div className="special-node-inputbox">
              <textarea
                type="text"
                name="text"
                className="node-text-box"
                disabled
                autoComplete="off"
                defaultValue={chatData[0]?.data.text}
              ></textarea>
            </div>
            <div className="special-node-add-morebutton">
              {btnData?.map((data, index) => {
                return (
                  <div key={index} className="special-node-button">
                    <div className="more-btn-show">
                      <input
                        type={`text`}
                        value={data?.data?.btn}
                        name="btn"
                        disabled
                        autoComplete="off"
                        placeholder="Click here to edit"
                        className="position-relative btn-bot"
                      />
                    </div>
                    <Handle
                      className="node-handle"
                      type="source"
                      position={Position.Right}
                      id={data?.id}
                      style={{ top: `47%`, right: `-5%`, borderRadius: 0 }}
                    />
                  </div>
                );
              })}
            </div>

            <div className="special-node-handle">
              <Handle
                className="node-handle node-target-handle"
                type="target"
                position={Position.Left}
                id="1a"
                style={{ top: "50%", borderRadius: 0 }}
              />
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Card className="special-node-main-container">
          <Card.Header className="special-node-welcome-container">
            <div className="special-node-img">
              <img className="node-icon" src={buttonImg} alt="img" />
              <span>Button</span>
            </div>
            <div className="special-node-delete-more">
              <i
                className="fa fa-trash"
                onClick={() => handleNodeDelete(data?.id)}
              ></i>
              <i
                className="fa fa-ellipsis-h ml-1 ml-1"
                onClick={() => handleUpdate(data)}
              ></i>
            </div>
          </Card.Header>
          <Card.Body className="special-node-body">
            <div className="special-node-inputbox">
              <textarea
                type="text"
                name="text"
                className="node-text-box"
                defaultValue={chatData[0]?.data.text}
                onBlur={handleBlureChat}
                onChange={handleMessageChange}
                autoComplete="off"
                placeholder="Click here to edit"
              ></textarea>
            </div>
            <div className="special-node-add-morebutton">
              {btnData?.map((data, index) => {
                return (
                  <div key={index} className="special-node-button">
                    <div className="more-btn-show">
                      <div className="special-node-add-morebtn">
                        <i className="fa fa-plus" onClick={handleButtonAdd}></i>
                        {size(btnData) > 1 && (
                          <i
                            className="fa fa-trash ml-11 "
                            onClick={() => handleDeleteButton(data.id)}
                          ></i>
                        )}
                      </div>
                      <input
                        type={`text`}
                        value={data?.data?.btn}
                        name="btn"
                        onBlur={() => handleBlureButton(index)}
                        onChange={(e) => handleButtonChange(e, index)}
                        autoComplete="off"
                        placeholder="Click here to edit"
                        className="position-relative btn-bot"
                      />
                    </div>
                    <Handle
                      className="node-handle"
                      type="source"
                      position={Position.Right}
                      id={data?.id}
                      style={{ top: `47%`, right: `-5%`, borderRadius: 0 }}
                    />
                  </div>
                );
              })}
            </div>

            <div className="special-node-handle">
              <Handle
                className="node-handle node-target-handle"
                type="target"
                position={Position.Left}
                id="1a"
                style={{ top: "50%", borderRadius: 0 }}
              />
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

const mapDispatchToProps = {
  deleteNodes,
  getAllNodeList,
  addSubNode,
  updateSubNode,
  updateNodeData,
  deleteSubNodes,
};
export default connect(null, mapDispatchToProps)(ButtonNode);
