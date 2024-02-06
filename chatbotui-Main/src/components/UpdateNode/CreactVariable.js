import React from "react";
import { useState } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { creactVariable } from "./Action";

const CreactVariable = (props) => {
  const { openAddVariable } = props;
  const userId = localStorage.getItem("user_id");
  const [variableData, setVariableData] = useState({
    name: "",
    type: "",
    value: "",
    userId: parseInt(userId),
  });

  const handleChangeData = (e) => {
    const { value, name } = e.target;
    setVariableData({ ...variableData, [name]: value });
  };

  const creactVariable = () => {
    props
      ?.creactVariable(variableData)
      .then((response) => {
        if (response && !response?.errorMessage) {
          setVariableData({});
          props?.setOpenAddVariable(false);
          props?.getAllNodeList();
        } else {
          props?.handleAlert(
            response?.errorMessage || "Something went wrong",
            "error"
          );
        }
      })
      .catch((error) => {
        this.props?.handleAlert(
          error?.message || "Something went wrong",
          "error"
        );
      });
  };
  return (
    <>
      <Modal
        show={openAddVariable}
        onHide={() => props?.setOpenAddVariable(false)}
        className="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Variable </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-newbot-modal-list">
            <form onSubmit={creactVariable}>
              <FormControl
                onChange={handleChangeData}
                name="name"
                type="text"
                className="form-control"
                placeholder="Add Variable name"
              />
              <Form.Select
                className="mt-15px"
                aria-label="Default select example"
                name="type"
                onChange={handleChangeData}
              >
                <option value="" selected disabled>
                  Select Variable type
                </option>
                <option value="String">String</option>
                <option value="Number">Number</option>
                <option value="Date">Date</option>
                <option value="Array">Array</option>
                <option value="Boolean">Boolean</option>
              </Form.Select>
            </form>
            <div className="add-newbot-button">
              <Button
                className="add-newbot-button-cancel"
                onClick={() => props?.setOpenAddVariable(false)}
              >
                Cancel
              </Button>
              <Button
                className="add-newbot-button-add btn-bot"
                onClick={creactVariable}
              >
                Add
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapDispatchToProps = { creactVariable };

export default connect(null, mapDispatchToProps)(CreactVariable);
