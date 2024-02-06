import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import IMG from "../../Images/NodeImages/welcome.png";

const SpecialNode = (props) => {
  const { handleCancel, handleUpdateNode } = props;
  const [updateData, setUpdateData] = useState({
    nodeData: [],
  });

  useEffect(() => {
    setUpdateData(props?.data);
  }, [props?.data]);

  const handleChange = (e) => {
    const { value } = e?.target;
    let data = { ...updateData };
    data.data.nodeData[0].data.text = value;
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
            <h2>Welcome</h2>
            <i className="fa fa-times" onClick={handleCancel}></i>
          </div>
        </Form.Group>
        <Form.Group className="update-sidebar-text">
          <Form.Label className="update-sidebar-body-header">
            Welcome Text
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="text"
            className="textarea-resize"
            value={updateData?.data?.nodeData[0]?.data?.text || ""}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="update-sidebar-button">
          <Button onClick={handleCancel} variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleUpdateNode(updateData, updateData?.flow_id)}
            className="btn-bot"
          >
            Apply
          </Button>
        </Form.Group>
      </div>
    </Form>
  );
};

export default SpecialNode;
