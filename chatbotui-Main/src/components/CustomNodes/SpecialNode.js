import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Handle, Position } from "react-flow-renderer";
import { connect } from "react-redux";
import welcomeImg from "../../Images/NodeImages/welcome.png";
import { updateSubNode, getAllNodeList } from "../FlowManger/Action";
import { useLocation, useParams } from "react-router-dom";

const SpecialNode = (props) => {
  const { pathname } = useLocation();
  const { data } = props;
  const { botId } = useParams();
  const [message, setMessage] = useState({
    text: data?.nodeData[0]?.data?.text || "",
    btn: data?.nodeData[0]?.data?.button || "",
  });

  useEffect(() => {
    setMessage(data?.nodeData[0]?.text);
  }, [data]);

  const handleMessageChange = (e) => {
    const { value, name } = e?.target;
    setMessage({ ...message, [name]: value });
  };

  const handleBlure = (type) => {
    if (type === "text") {
      const sendData = [
        {
          id: data.nodeData[0].id,
          node_id: data?.id,
          flow_id: botId,
          type: "special",
          destination: "",
          data: {
            text: message?.text,
          },
        },
      ];
      props.updateSubNode(sendData).then((response) => {
        props?.getAllNodeList(botId);
      });
    } else {
      const sendData = [
        {
          id: data.nodeData[0].id,
          node_id: data?.id,
          flow_id: botId,
          type: "special",
          destination: "",
          data: {
            button: message?.btn,
          },
        },
      ];
      props.updateSubNode(sendData).then((response) => {
        props?.getAllNodeList(botId);
      });
    }
  };

  return (
    <>
      <Card className="special-node-main-container">
        <Card.Header className="special-node-welcome-container">
          <div className="special-node-img">
            <img className="node-icon" src={welcomeImg} alt="img" />
            <span>Welcome</span>
          </div>
          {/* <i
            className="fa fa-ellipsis-h ml-1 ml-1"
            onClick={() => handleUpdate(data)}
          ></i> */}
        </Card.Header>
        <Card.Body className="special-node-body">
          <div className="special-node-inputbox">
            {pathname === `/analyze/${botId}` ? (
              <textarea
                type="text"
                name="text"
                className="node-text-box"
                defaultValue={message?.text}
                disabled
              ></textarea>
            ) : (
              <textarea
                type="text"
                name="text"
                className="node-text-box"
                defaultValue={message?.text}
                onBlur={() => handleBlure("text")}
                onChange={handleMessageChange}
                placeholder="Enter Text"
              ></textarea>
            )}
          </div>
          <div className="special-node-button">
            {pathname === `/analyze/${botId}` ? (
              <input
                type="text"
                name="btn"
                className="btn-bot"
                defaultValue={message?.btn}
                disabled
              />
            ) : (
              <input
                type="text"
                name="btn"
                className="btn-bot"
                onBlur={() => handleBlure("btn")}
                defaultValue={message?.btn}
                onChange={handleMessageChange}
              />
            )}
          </div>

          <div className="special-node-handle">
            <Handle
              className="node-handle special-node-dot"
              type="source"
              position={Position.Right}
              id={data?.nodeData[0]?.id}
              style={{ top: "87%", borderRadius: 0 }}
            />
          </div>
        </Card.Body>
      </Card>
      {/* {pathname === `/analyze/${botId}` && (
        <div>
          <div className="border-analyze"></div>
        </div>
      )} */}
    </>
  );
};
const mapDispatchToProps = {
  getAllNodeList,
  updateSubNode,
};
export default connect(null, mapDispatchToProps)(SpecialNode);
