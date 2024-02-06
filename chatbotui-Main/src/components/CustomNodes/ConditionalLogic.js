import React from "react";
import { Card } from "react-bootstrap";
import { Handle, Position } from "react-flow-renderer";
import { connect } from "react-redux";
import { deleteNodes, getAllNodeList, updateNodeData } from "./Action";
import conditionImg from "../../Images/NodeImages/condition.png";
import { useLocation, useParams } from "react-router-dom";

const ConditionalLogic = (props) => {
  const { data } = props;
  const { pathname } = useLocation();
  const { botId } = useParams();

  const handleNodeDelete = (id, flowId) => {
    props
      ?.deleteNodes(id, flowId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          // props.handleAlert("New Node Added", "success");
          getAllNodeList(flowId);
        } else {
          // props?.handleAlert(
          //   response?.message || "Something went wrong",
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
            <img className="node-icon" src={conditionImg} alt="img" />
            <span>Condition</span>
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
          <div className="ifcondition-node-inputbox">
            <div className="ifcondition-name">
              <span>IF</span>
              <span>{data?.nodeData[0]?.data?.value1}</span>
              <span>{data?.nodeData[0]?.data?.operator}</span>
              <span>{data?.nodeData[0]?.data?.value2}</span>
            </div>
          </div>
          <Handle
            className="node-handle node-target-handle"
            type="target"
            position={Position.Left}
            id={`${props.id}c`}
            style={{ top: "60%", borderRadius: 10 }}
          />
          <div className="ifcondition-right1-node">
            <Handle
              className="node-handle"
              type="source"
              position={Position.Right}
              id={data?.nodeData[0]?.id}
              style={{ top: "50%", borderRadius: 0, color: "green" }}
            >
              <span>success</span>
            </Handle>
          </div>
          <div className="ifcondition-right2-node">
            <Handle
              className="node-handle"
              type="source"
              position={Position.Right}
              id={`${data?.nodeData[0]?.node_id}_2b`}
              style={{ top: "80%", borderRadius: 0, color: "red" }}
            >
              <span>fail</span>
            </Handle>
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

export default connect(null, mapDispatchToProps)(ConditionalLogic);
