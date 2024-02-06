import React from "react";
import { Modal } from "react-bootstrap";
import { size } from "lodash";

const WorkSpaceListPopUp = (props) => {
  const { openModal, workSpaceList, id } = props;
  const workSpaces = workSpaceList?.filter((data) => data?.id !== id);
  return (
    <Modal
      className="workspace-list-modal"
      show={openModal}
      size="sm"
      onHide={() => props?.closeModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Move To</Modal.Title>
      </Modal.Header>
      <Modal.Body className="workspace-list-body">
        {size(workSpaces) ? (
          workSpaces?.map((data, index) => {
            return (
              <div
                className="list-group-item"
                key={index}
                onClick={() => props?.moveFlow(data?.id)}
              >
                <i className="fa-solid fa fa-folder"></i>
                <span className="ml-1">{data?.name}</span>
              </div>
            );
          })
        ) : (
          <div className="list-group-item text-center p-3">
            <h5>No workdspace found!</h5>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default WorkSpaceListPopUp;
