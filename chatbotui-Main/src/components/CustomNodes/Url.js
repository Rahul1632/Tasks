import { Card } from "react-bootstrap";
import React from "react";
import { Handle, Position } from "react-flow-renderer";
import { deleteNodes, getAllNodeList, updateNodeData } from "./Action";
import { connect } from "react-redux";
import urlImg from "../../Images/NodeImages/url.png";
import { useLocation, useParams } from "react-router-dom";

const Url = (props) => {
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
      <Card className="special-node-main-container email-customnode-card">
        <Card.Header className="email-customnode-header">
          <div className="emailnode-img">
            <img className="node-icon" src={urlImg} alt="img" />
          </div>
          <div className="emailnode-question">
            <span className="emailnode-question-span1">Question: URL</span>
            <span className="emailnode-question-span2">
              {data?.nodeData[0]?.data?.text}
            </span>
          </div>
          {pathname !== `/analyze/${botId}` && (
            <div className="emailnode-delete-more">
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
      </Card>
    </>
  );
};

const mapDispatchToProps = {
  deleteNodes,
  getAllNodeList,
  updateNodeData,
};
export default connect(null, mapDispatchToProps)(Url);
