import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import IMG from "../../Images/NodeImages/date.png";
import CreactVariable from "./CreactVariable";

const DateNode = (props) => {
  const { handleCancel, handleUpdateSubNode } = props;
  const [updateData, setUpdateData] = useState({
    nodeData: [],
  });

  const [openAddVariable, setOpenAddVariable] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e?.target;
    let data = { ...updateData };
    if (name === "var") {
      data.data.nodeData[0].data.text += " " + "$·" + value + "$";
    } else if (name === "destination") {
      data.data.nodeData[0].destination = value;
    } else {
      data.data.nodeData[0].data.text = value;
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
            <h2>QUESTION: Date</h2>
            <i className="fa fa-times" onClick={handleCancel}></i>
          </div>
        </Form.Group>
        <Form.Group className="update-sidebar-text">
          <Form.Label className="update-sidebar-body-header">
            Question Date
          </Form.Label>
          <Form.Control
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

          <Form.Label className="update-sidebar-body-header mt-15px">
            Save answers in the variable
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="destination"
            onChange={handleChange}
            value={updateData?.data?.nodeData[0]?.destination}
          >
            <option disabled>Select variable</option>
            {props?.variable?.map((data, index) => {
              return (
                <option key={index} value={data?.name}>
                  {data?.name}
                  {`(${data?.type})`}
                </option>
              );
            })}
          </Form.Select>
          <Button variant="secondary" onClick={() => setOpenAddVariable(true)}>
            Add variable
          </Button>
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
      {openAddVariable && (
        <CreactVariable
          nodeId={props?.data?.id}
          openAddVariable={openAddVariable}
          setOpenAddVariable={setOpenAddVariable}
          handleAlert={props?.handleAlert}
          getAllNodeList={props?.getAllNodeList}
        />
      )}
    </Form>
  );
};

export default DateNode;
