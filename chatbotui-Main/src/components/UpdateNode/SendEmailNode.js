import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import IMG from "../../Images/NodeImages/sendMail.png";
import { connect } from "react-redux";
import { getGridEmail, sendGridEmail } from "./Action";

const SendEmailNode = (props) => {
  const userId = localStorage.getItem("user_id");
  const { handleCancel, handleUpdateSubNode } = props;
  const [updateData, setUpdateData] = useState({
    nodeData: [],
  });
  const [addNewEmailOpen, setNewEmailOpen] = useState(false);
  const [newEmailData, setNewEmailData] = useState({
    from_email: "",
    secret: "",
    userId: parseInt(userId),
  });
  const [getEmailData, SetGetEmailData] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e?.target;
    let data = { ...updateData };
    data.data.nodeData[0].data[name] = value;
    setUpdateData(data);
  };

  const handleOpenSendMail = (e) => {
    const { value } = e?.target;
    let data = { ...updateData };
    if (value === "0") {
      setNewEmailOpen(true);
      data.data.nodeData[0].data.customEmail = true;
      if (value !== -1) {
        data.data.nodeData[0].data.customEmail = true;
      }
    } else {
      data.data.nodeData[0].data.customEmail = false;
      setNewEmailOpen(false);
    }
    setUpdateData(data);
  };

  const handleSendGridChange = (e) => {
    const { value, name } = e.target;
    setNewEmailData({ ...newEmailData, [name]: value });
  };

  const sendGridEmail = () => {
    props
      ?.sendGridEmail(newEmailData)
      .then((response) => {
        if (response && !response?.errorMessage) {
          setNewEmailOpen(false);
          getGridEmail();
        } else {
          props?.handleAlert(
            response?.errorMessage || "Something went wrong",
            "error"
          );
        }
      })
      .catch((error) => {
        props?.handleAlert(error?.message || "Something went wrong", "error");
      });
  };

  const getGridEmail = () => {
    props
      ?.getGridEmail(userId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          SetGetEmailData(response?.emails);
        } else {
          props?.handleAlert(
            response?.errorMessage || "Something went wrong",
            "error"
          );
        }
      })
      .catch((error) => {
        props?.handleAlert(error?.message || "Something went wrong", "error");
      });
  };

  useEffect(() => {
    getGridEmail();
    setUpdateData(props?.data);
  }, [props?.data]);
  return (
    <Form>
      <div className="mb-3 update-sidebar-main">
        <Form.Group>
          <div className="update-sidebar-title">
            <img className="type-icon" src={IMG} alt="img" />
            <h2>Send Email</h2>
            <i className="fa fa-times" onClick={handleCancel}></i>
          </div>
        </Form.Group>

        <Form.Group className="update-sidebar-text">
          <Form.Label className="update-sidebar-body-header">From</Form.Label>
          <Form.Select
            aria-label="Default select example"
            // className="mt-15px"
            onClick={handleOpenSendMail}
            name="from_email"
            onChange={handleChange}
            value={updateData?.data?.nodeData[0]?.data?.from_email}
          >
            <option selected disabled>
              Select Email
            </option>
            <option value={0}>Custom SendGrid Email</option>
            <option value={-1}>jenish.m@brilworks.com</option>
            {getEmailData?.map((data, index) => {
              return (
                <option key={index} value={data?.id}>
                  {data?.email}
                </option>
              );
            })}
          </Form.Select>
          {addNewEmailOpen && (
            <Form.Group className="send-email-container mt-15px">
              <Form.Label className="update-sidebar-body-header">
                SET UP A SENDGRID ACCOUNT
              </Form.Label>
              <Form.Label className="update-sidebar-body-header">
                SendGrid email
              </Form.Label>
              <Form.Control
                as="input"
                name="from_email"
                className="textarea-resize"
                placeholder="abc@ds.com"
                onChange={handleSendGridChange}
              ></Form.Control>
              <Form.Label className="update-sidebar-body-header">
                SendGrid API key
              </Form.Label>
              <Form.Control
                as="input"
                name="secret"
                className="textarea-resize"
                placeholder="SET UP A SENDGRID ACCOUNT"
                onChange={handleSendGridChange}
              ></Form.Control>
              <Button onClick={sendGridEmail} className="btn-bot">
                Apply
              </Button>
            </Form.Group>
          )}
          <Form.Label className="update-sidebar-body-header mt-15px">
            Send to
          </Form.Label>
          <Form.Control
            as="input"
            name="to_email"
            className="textarea-resize"
            value={updateData?.data?.nodeData[0]?.data?.to_email || ""}
            onChange={handleChange}
          ></Form.Control>
          <Form.Label className="update-sidebar-body-header mt-15px">
            Email subject
          </Form.Label>
          <Form.Control
            as="textarea"
            name="subject"
            rows={4}
            className="textarea-resize"
            value={updateData?.data?.nodeData[0]?.data?.subject || ""}
            onChange={handleChange}
          ></Form.Control>
          <Form.Label className="update-sidebar-body-header mt-15px">
            Email message
          </Form.Label>
          <Form.Control
            as="textarea"
            name="text"
            rows={4}
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

const mapDispatchToProps = {
  getGridEmail,
  sendGridEmail,
};

export default connect(null, mapDispatchToProps)(SendEmailNode);
