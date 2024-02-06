import React, { useEffect, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import IMG from "../../Images/NodeImages/button.png";
import { updateNewSubNode, updateSubNode } from "../FlowManger/Action";
import { connect } from "react-redux";

const ButtonNode = (props) => {
  const { handleCancel, handleUpdateSubNode } = props;
  const mainData = props?.data;
  const { data } = mainData;
  const { nodeData } = data;
  const btnData = nodeData?.filter((data) => data.type === "button");
  const [buttonData, setButtonData] = useState({
    nodeData: [],
  });

  const handleChange = (e, id) => {
    const { value } = e?.target;
    let data = [...btnData];
    let indexData = data?.findIndex((item) => item.id === id);
    data[indexData].data.btn = value;
    setButtonData({ ...buttonData, nodeData: data });
  };

  useEffect(() => {
    setButtonData(props?.data);
  }, [props?.data]);

  return (
    <Form>
      <div className="mb-3 update-sidebar-main">
        <Form.Group>
          <div className="update-sidebar-title">
            <img className="type-icon" src={IMG} alt="img" />
            <h2>Buttons</h2>
            <i className="fa fa-times" onClick={handleCancel}></i>
          </div>
        </Form.Group>
        <Form.Group className="update-sidebar-text">
          <Form.Label className="update-sidebar-body-header">
            Advanced buttons editor
          </Form.Label>
          <div className="button-container">
            {btnData?.map((node, index) => {
              return (
                <FormControl
                  key={index}
                  type={`text`}
                  placeholder="Click here to edit"
                  className="position-relative btn-bot"
                  value={node?.data?.btn}
                  onChange={(e) => handleChange(e, node?.id, index)}
                />
              );
            })}
            {/* <div className="add-more-button-container">
              <button className="add-more-button">+</button>
            </div> */}
          </div>
        </Form.Group>
        <Form.Group className="update-sidebar-button">
          <Button onClick={handleCancel} variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleUpdateSubNode(buttonData)}
            className="btn-bot"
          >
            Apply
          </Button>
        </Form.Group>
      </div>
    </Form>
  );
};

const mapDispatchToProps = {
  updateNewSubNode,
  updateSubNode,
};

export default connect(null, mapDispatchToProps)(ButtonNode);
