import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import IMG from "../../Images/NodeImages/slack.png";
import { connect } from "react-redux";
import { getSlackChannel } from "./Action";

const SlackNode = (props) => {
  const userId = localStorage.getItem("user_id");
  const { handleCancel, handleUpdateSubNode } = props;
  const [updateData, setUpdateData] = useState({
    nodeData: [],
  });

  const [slackChannel, setSlackChannel] = useState([]);

  const handleChange = (e) => {
    const { value } = e?.target;
    let data = { ...updateData };
    data.data.nodeData[0].data.text = value;
    setUpdateData(data);
  };

  const handleSlackMessage = (e) => {
    const { value } = e?.target;
    let data = { ...updateData };
    data.data.nodeData[0].data.slack_id = value;
  };

  const getSlackChannel = () => {
    props
      ?.getSlackChannel(userId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          setSlackChannel(response?.channels);
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

  const handleGetSlak = () => {
    getSlackChannel();
  };

  useEffect(() => {
    setUpdateData(props?.data);
  }, [props?.data]);

  useEffect(() => {
    getSlackChannel();
  }, []);

  return (
    <Form>
      <div className="mb-3 update-sidebar-main">
        <Form.Group>
          <div className="update-sidebar-title">
            <img className="type-icon" src={IMG} alt="img" />
            <h2> Slack</h2>
            <i className="fa fa-times" onClick={handleCancel}></i>
          </div>
        </Form.Group>
        <Form.Group className="update-sidebar-text">
          <Form.Label className="update-sidebar-body-header">Slack</Form.Label>

          <a
            target="_blank"
            className="w-9rem"
            href={`https://slack.com/oauth/v2/authorize?client_id=3875217294902.3908719676998&scope=chat:write,incoming-webhook,chat:write.public&user_scope=&state=${userId}`}
          >
            <img
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
          </a>

          <Form.Select
            aria-label="Default select example"
            className="mt-15px"
            onClick={handleGetSlak}
            onChange={handleSlackMessage}
          >
            <option>Select Slack Channel</option>
            {slackChannel?.map((data, index) => {
              const slackChannelId =
                props?.data?.data?.nodeData[0]?.data?.slack_id;
              const slackChannelName = slackChannel.filter(
                (item) => item?.id === parseInt(slackChannelId)
              );

              return (
                <option
                  key={index}
                  value={data?.id}
                  selected={slackChannelName[0]?.channel}
                >
                  {data?.channel}
                </option>
              );
            })}
          </Form.Select>
          <Form.Label className="update-sidebar-body-header mt-15px">
            Slack Message
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
  getSlackChannel,
};

export default connect(null, mapDispatchToProps)(SlackNode);
