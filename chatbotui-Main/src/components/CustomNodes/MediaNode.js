import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Handle, Position } from "react-flow-renderer";
import { connect } from "react-redux";
import { deleteNodes, getAllNodeList } from "./Action";
import media from "../../Images/NodeImages/media.png";
import SelectmediaPopUp from "./SelectmediaPopUp";
import { useLocation, useParams } from "react-router-dom";

const MediaNode = (props) => {
  const { data } = props;
  const { botId } = useParams();
  const { pathname } = useLocation();
  const [mediaOpen, setMediaOpen] = useState(false);
  const [saveBtnDisable, setSaveBtnDisable] = useState(true);

  const handleNodeDelete = (id, flowId) => {
    props
      ?.deleteNodes(id, flowId)
      .then((response) => {
        if (response && !response?.errorMessage && !response?.error) {
          // handleAlert("New Node Added", "success");
          getAllNodeList(flowId);
        } else {
          // props?.handleAlert(
          //   !response?.message || !response?.error || "Something went wrong",
          //   "error"
          // );
        }
      })
      .catch((error) => {
        props?.handleAlert(error?.message || "Something went wrong", "error");
      });
  };

  const getAllNodeList = (id) => {
    props?.getAllNodeList(id);
  };

  const handleMediaOpen = () => {
    setMediaOpen(true);
    setSaveBtnDisable(true);
  };

  return (
    <>
      <Card className="special-node-main-container">
        <Card.Header className="special-node-welcome-container">
          <div className="special-node-img">
            <img className="node-icon" src={media} alt="img" />
            <span>Media</span>
          </div>
          {pathname !== `/analyze/${botId}` && (
            <div className="special-node-delete-more">
              <i
                className="fa fa-trash"
                onClick={() =>
                  handleNodeDelete(data?.id, data?.nodeData[0]?.flow_id)
                }
              ></i>
              <i
                className="fa fa-ellipsis-h ml-1"
                onClick={handleMediaOpen}
              ></i>
            </div>
          )}
        </Card.Header>
        <Card.Body className="special-node-body">
          <div className="special-node-inputbox">
            {data.nodeData[0].data?.content_type === "video/mp4" ? (
              <video
                className="w-226px"
                type="video/mp4"
                src={data?.nodeData[0]?.data?.source}
                width="225px"
                controls
              />
            ) : data.nodeData[0].data?.content_type === "audio/mpeg" ? (
              <audio
                className="w-226px"
                type="video/mp4"
                src={data?.nodeData[0]?.data?.source}
                controls
              />
            ) : (
              <img
                className="w-226px"
                alt="img"
                height="130px"
                width="226px"
                src={data?.nodeData[0]?.data?.source || media}
              ></img>
            )}
          </div>

          <div className="special-node-handle">
            <Handle
              className="node-handle"
              type="source"
              position={Position.Right}
              id={data?.nodeData[0]?.id}
              style={{ top: "50%", borderRadius: 0 }}
            />
            <Handle
              className="node-handle node-target-handle"
              type="target"
              position={Position.Left}
              id="1a"
              style={{ top: "50%", borderRadius: 0 }}
            />
          </div>
        </Card.Body>
      </Card>

      {mediaOpen && (
        <SelectmediaPopUp
          data={data}
          mediaOpen={mediaOpen}
          setMediaOpen={setMediaOpen}
          getAllNodeList={getAllNodeList}
          setSaveBtnDisable={setSaveBtnDisable}
          saveBtnDisable={saveBtnDisable}
        />
      )}
    </>
  );
};

const mapDispatchToProps = {
  deleteNodes,
  getAllNodeList,
};

export default connect(null, mapDispatchToProps)(MediaNode);
