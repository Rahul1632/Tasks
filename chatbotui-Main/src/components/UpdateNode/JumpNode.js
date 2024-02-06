import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import IMG from "../../Images/NodeImages/jump.png";
import FlowListpopUp from "./FlowListpopUp";

const JumpNode = (props) => {
  const { handleCancel, handleUpdateSubNode } = props;
  const [updateData, setUpdateData] = useState({
    nodeData: [],
  });

  const [flowListOpen, setFlowListOpen] = useState(false);
  const [flowName, setFlowName] = useState(
    props?.data?.data?.nodeData[0]?.data?.name
  );

  const handleFlowListPopUp = () => {
    setFlowListOpen(!flowListOpen);
  };
  return (
    <Form>
      <div className="mb-3 update-sidebar-main">
        <Form.Group>
          <div className="update-sidebar-title">
            <img className="type-icon" src={IMG} alt="img" />
            <h2> BOT JUMP</h2>
            <i className="fa fa-times" onClick={handleCancel}></i>
          </div>
        </Form.Group>
        <Form.Group className="update-sidebar-text">
          <Form.Label className="update-sidebar-body-header">
            Jump to Bot
          </Form.Label>

          <Button className="btn-bot" onClick={handleFlowListPopUp}>
            {flowName || "Select Bot"}
          </Button>
          {flowListOpen && (
            <FlowListpopUp
              openModal={flowListOpen}
              closeModal={setFlowListOpen}
              data={props?.data}
              updateData={updateData}
              setUpdateData={setUpdateData}
              setFlowListOpen={setFlowListOpen}
              setFlowName={setFlowName}
            />
          )}
        </Form.Group>
        <Form.Group className="update-sidebar-button">
          <Button onClick={handleCancel} variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleUpdateSubNode(updateData)}
            className="btn-bot"
          >
            Apply
          </Button>
        </Form.Group>
      </div>
    </Form>
  );
};

export default JumpNode;
