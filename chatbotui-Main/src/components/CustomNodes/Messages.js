import React from "react";
import { Card } from "react-bootstrap";
import { Handle, Position } from "react-flow-renderer";
import { connect } from "react-redux";
import { deleteNodes, getAllNodeList, updateNodeData } from "./Action";

import messageImg from "../../Images/NodeImages/message.png";
import { useLocation, useParams } from "react-router-dom";

const Messages = (props) => {
  const { data } = props;
  const { botId } = useParams();
  const { pathname } = useLocation();

  const handleNodeDelete = (id, flowId) => {
    props
      ?.deleteNodes(id, flowId)
      .then((response) => {
        if (response && !response?.errorMessage && !response?.error) {
          // props.handleAlert("New Node Added", "success");
          getAllNodeList(flowId);
        } else {
          // props?.handleAlert(
          //   !response?.message || !response?.error || "Something went wrong",
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

  return (
    <>
      <Card className="special-node-main-container">
        <Card.Header className="special-node-welcome-container">
          <div className="special-node-img">
            <img className="node-icon" src={messageImg} alt="img" />
            <span>Messages</span>
          </div>
          {pathname !== `/analyze/${botId}` && (
            <div className="special-node-delete-more">
              <i
                className="fa fa-trash"
                onClick={() =>
                  handleNodeDelete(data?.id, data?.nodeData[0]?.flow_id)
                }
              ></i>
              <i
                className="fa fa-ellipsis-h ml-1"
                onClick={() => handleUpdate(data)}
              ></i>
            </div>
          )}
        </Card.Header>
        <Card.Body className="special-node-body">
          <div className="special-node-inputbox">
            {pathname === `/analyze/${botId}` ? (
              <div className="node-text-box">
                {data?.nodeData[0]?.data?.text}
              </div>
            ) : (
              <div className="node-text-box">
                {data?.nodeData[0]?.data?.text}
              </div>
            )}
          </div>

          <div className="special-node-handle">
            <Handle
              className="node-handle"
              type="source"
              position={Position.Right}
              id={data?.nodeData[0]?.id}
              style={{ top: "50%", borderRadius: 0 }}
            />
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
    </>
  );
};

const mapDispatchToProps = {
  deleteNodes,
  getAllNodeList,
  updateNodeData,
};

export default connect(null, mapDispatchToProps)(Messages);
