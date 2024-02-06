import React from "react";
import { Button, FormControl, Modal } from "react-bootstrap";

const AddNewBotModal = (props) => {
  const { openModal } = props;
  return (
    <>
      <Modal
        show={openModal}
        onHide={props?.handleOpenModal}
        className="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Bot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-newbot-modal-list">
            <form onSubmit={props?.handleAddData}>
              <FormControl
                onChange={props?.handleChangeData}
                name="name"
                type="text"
                className="form-control"
                placeholder="Add New Bot"
              />
            </form>
            <div className="add-newbot-button">
              <Button
                className="add-newbot-button-cancel"
                onClick={props?.handleOpenModal}
              >
                Cancel
              </Button>
              <Button
                className="add-newbot-button-add btn-bot"
                onClick={props?.handleAddData}
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

export default AddNewBotModal;
