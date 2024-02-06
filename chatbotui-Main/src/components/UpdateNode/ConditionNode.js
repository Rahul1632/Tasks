import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import IMG from "../../Images/NodeImages/condition.png";

const ConditionNode = (props) => {
  const { handleCancel, handleUpdateSubNode } = props;
  const [updateData, setUpdateData] = useState({
    nodeData: [],
  });

  useEffect(() => {
    setUpdateData(props?.data);
  }, [props?.data]);

  const handleChange = (e) => {
    const { name, value } = e?.target;
    let data = { ...updateData };
    if (name === "value1") {
      data.data.nodeData[0].data.value1 = value;
    } else if (name === "operator") {
      data.data.nodeData[0].data.operator = value;
    } else if (name === "value2") {
      data.data.nodeData[0].data.value2 = value;
    }
    setUpdateData(data);
  };

  useEffect(() => {
    setUpdateData(props?.data);
  }, [props?.data]);

  return (
    <Form>
      <div className="mb-3 update-sidebar-main">
        <Form.Group>
          <div className="update-sidebar-title">
            <img className="type-icon" src={IMG} alt="img" />
            <h2>Condition</h2>
            <i className="fa fa-times" onClick={handleCancel}></i>
          </div>
        </Form.Group>
        <Form.Group className="update-sidebar-text">
          <Form.Label>Set the condition</Form.Label>
          <div className="condition-conatiner">
            <InputGroup>
              <InputGroup.Text className="condition-input">IF</InputGroup.Text>
              <Form.Control
                name="value1"
                className="condition-input-text"
                value={updateData?.data?.nodeData[0]?.data?.value1 || ""}
                onChange={handleChange}
              ></Form.Control>
            </InputGroup>
            <Form.Select
              name="operator"
              onChange={(e) => handleChange(e)}
              value={
                updateData?.data?.nodeData[0]?.data?.operator || "selected"
              }
            >
              <option value="selected" disabled>
                selected
              </option>
              <option value="Eqval">Eqvals ( == )</option>
              <option value="Not-equals">Not equals ( !== )</option>
              <option value="Strict-equals">Strict equals ( === )</option>
              <option value="Not-strict-equals">
                Not strict equals ( !=== )
              </option>
            </Form.Select>
            <Form.Control
              name="value2"
              className="textarea-resize"
              value={updateData?.data?.nodeData[0]?.data?.value2 || ""}
              onChange={handleChange}
            ></Form.Control>
          </div>
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

export default ConditionNode;
