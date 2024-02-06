import React from "react";
import { Button, FormControl, Modal } from "react-bootstrap";

const AddNewBotModal = (props) => {
  const { openModal, data } = props;
  return (
    <>
      <Modal
        show={openModal}
        onHide={props?.handleOpenModal}
        className="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{data?.id ? "Update" : "Add"} WorkSpace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-newbot-modal-list">
            <form onSubmit={props?.handleSubmitData}>
              <FormControl
                onChange={props?.handleChangeData}
                value={data?.name}
                name="name"
                type="text"
                className="form-control"
                placeholder="Add WorkSpace"
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
                onClick={props?.handleSubmitData}
              >
                {data?.id ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddNewBotModal;
