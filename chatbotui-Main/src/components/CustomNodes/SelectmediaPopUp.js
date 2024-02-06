import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { sendMediaData } from "./Action";
import { connect } from "react-redux";

const SelectMediaPopUp = (props) => {
  const { mediaOpen, data, saveBtnDisable } = props;
  const [loading, setloading] = useState(0);
  const [formData, setFormData] = useState({});
  const [uploadFileName, setUploadFileName] = useState(
    data?.nodeData[0]?.data.name
  );

  const handleUploadfile = (e) => {
    props?.setSaveBtnDisable(true);
    setloading(0);
    let { type } = e?.target?.files[0] || {};
    if (type !== undefined) {
      const typeCheck = type.slice(type.lastIndexOf("/") + 1);
      const fileSize = e?.target?.files[0].size;
      let accessFileType = ["jpg", "jpeg", "png", "mp4", "gif", "mpeg"];
      if (accessFileType.includes(typeCheck)) {
        if (fileSize <= 15728640) {
          let formData = new FormData();
          setUploadFileName(e?.target?.files[0].name);
          formData.append("file", e?.target?.files[0]);
          props.setSaveBtnDisable(false);
          setFormData(formData);
        } else {
          setloading(3);
          props.setSaveBtnDisable(true);
        }
      } else {
        setloading(2);
      }
    } else {
      setloading(4);
      props?.setSaveBtnDisable(true);
      setUploadFileName("");
    }
  };

  const sendMedia = () => {
    setloading(1);
    props
      ?.sendMediaData(formData, data?.id, data?.nodeData[0]?.flow_id)
      .then((response) => {
        if (response && !response?.errorMessage) {
          props?.setMediaOpen(false);
          props?.getAllNodeList(data?.nodeData[0]?.flow_id);
          setloading(0);
          setUploadFileName(response?.filename);
        } else {
          setloading(0);
          props?.handleAlert(
            response?.errorMessage || "Something went wrong",
            "error"
          );
        }
      });
  };

  return (
    <>
      <div className="select-media-main-container">
        <Modal
          show={mediaOpen}
          onHide={() => props?.setMediaOpen(false)}
          className="select-media-container"
        >
          <Modal.Header closeButton>
            <Modal.Title>Select media</Modal.Title>
          </Modal.Header>
          <div className="h-29vh">
            <Modal.Body>
              <div className="select-add-media-option">
                <div className="selectmedia-upload-flie">
                  <span name="uploadfile">UPLOAD YOUR FILE</span>
                </div>
              </div>
              <hr />

              <div className="selectmedia-option-list">
                <div className="h-12vh">
                  <i className="fa fa-paperclip"></i>
                </div>
                <div className="selectmedia-uploadfile-text">
                  <span>Upload your file</span>

                  <div className="uploadfile-text">
                    <input
                      type="file"
                      id="myFile"
                      name="filename"
                      onChange={handleUploadfile}
                    />
                    <span>{uploadFileName}</span>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </div>
          <Modal.Footer>
            {loading === 4 ? (
              <>
                <div className="wait-uploading-error">
                  <span>*Select File To upload</span>
                </div>
              </>
            ) : loading === 3 ? (
              <>
                <div className="wait-uploading-error">
                  <span>*max upload size 15MB</span>
                </div>
              </>
            ) : loading === 2 ? (
              <>
                <div className="wait-uploading-error">
                  <span>
                    *File format is not valid, upload only this format jpg,
                    jpeg, png, mp4, gif, mp3
                  </span>
                </div>
              </>
            ) : loading === 1 ? (
              <>
                <span className="wait-uploading">
                  *Please wait media is uploading...
                </span>
                <Button className="media-sumbit-loader" disabled>
                  <div className="dot-spin" />
                </Button>
              </>
            ) : (
              loading === 0 && (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => props?.setMediaOpen(false)}
                  >
                    Close
                  </Button>
                  {saveBtnDisable ? (
                    <Button variant="primary" disabled>
                      Save
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={sendMedia}>
                      Save
                    </Button>
                  )}
                </>
              )
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  sendMediaData,
};

export default connect(null, mapDispatchToProps)(SelectMediaPopUp);
