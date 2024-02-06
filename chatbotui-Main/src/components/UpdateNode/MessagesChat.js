import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import IMG from "../../Images/NodeImages/message.png";

const MessagesChat = (props) => {
  const { handleCancel, handleUpdateSubNode } = props;
  const [updateData, setUpdateData] = useState({
    nodeData: [],
  });

  const handleChange = (e) => {
    const { value, name } = e?.target;
    let data = { ...updateData };
    if (name === "var") {
      data.data.nodeData[0].data.text += " " + "$·" + value + "$";
    } else {
      data.data.nodeData[0].data.text = value;
    }
    setUpdateData(data);
  };

  useEffect(() => {
    setUpdateData(props?.data);
  }, [props?.data]);
  return (
    <>
      <Form>
        <div className="mb-3 update-sidebar-main">
          <Form.Group>
            <div className="update-sidebar-title">
              <img className="type-icon" src={IMG} alt="img" />
              <h2>Messages</h2>
              <i className="fa fa-times" onClick={handleCancel}></i>
            </div>
          </Form.Group>
          <Form.Group className="update-sidebar-text">
            <Form.Label className="update-sidebar-body-header">
              Messages
            </Form.Label>
            <Form.Control
              contenteditable="true"
              data-role="tagsinput"
              as="textarea"
              rows={4}
              name="text"
              className="textarea-resize"
              value={updateData?.data?.nodeData[0]?.data?.text || ""}
              onChange={handleChange}
            ></Form.Control>

            <Form.Select
              aria-label="Default select example"
              name="var"
              onChange={handleChange}
            >
              <option selected disabled>
                Select variable
              </option>
              {props?.variable?.map((data, index) => {
                return (
                  <option key={index} value={data?.name}>
                    {data?.name}
                    {`(${data?.type})`}
                  </option>
                );
              })}
            </Form.Select>
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
    </>
  );
};

export default MessagesChat;
