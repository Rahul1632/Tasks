import React, { useEffect, useRef, useState } from "react";
import {
  getAllNodeList,
  addNewNodeData,
  addNodeWithConnection,
  getFlowDetail,
} from "../FlowManger/Action";
import { connect } from "react-redux";
import FlowManager from "../FlowManger/FlowManager";
import { useParams } from "react-router-dom";
import FlowManagerNavbar from "../FlowManger/FlowManagerNavbar";
import FlowManagerSideBar from "../FlowManger/FlowMangerSideBar";
import { Button } from "react-bootstrap";
import UpdateSidebar from "../FlowManger/UpdateSidebar";
import Loader from "../reusable/Loader";
import {
  selectorPanPosition,
  selectorUpdateNodeData,
} from "../../Selectors/selector";
let nodePx, node;
const Flow = (props) => {
  const { updateNodeData, panPosition } = props;
  const { botId } = useParams();
  const reactFlowWrapper = useRef(null);
  const [diagram, setDiagram] = useState({});
  const [flowDetail, setFlowDetail] = useState({});
  const [nodePopUp, setNodePopUp] = useState(false);
  const [open, setOpen] = useState(true);
  const [openUpdateSidebar, setOpenUpdateSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [publishName, setPublishName] = useState("Publish");
  const [data, setData] = useState({
    flow_id: parseInt(botId),
    type: "",
    position: {
      top: "",
      left: "",
    },
    destination: "",
    data: {
      nodeData: {
        type: "",
        text: "",
        value: "",
        name: "",
        source: "",
        message: "",
        btn: "",
        value1: "",
        value2: "",
        operator: "",
        slack_id: null,
        from_email: "",
        to_email: "",
        subject: "",
        customEmail: false,
      },
    },
  });

  const [flowData, setFlowData] = useState({
    xPos: 900,
    yPos: 400,
    source: null,
    sourceHandle: null,
  });

  const clearState = () => {
    setData({
      flow_id: parseInt(botId),
      type: "",
      position: {
        top: "",
        left: "",
      },
      destination: "",
      data: {
        nodeData: {
          type: "",
          text: "",
          value: "",
          name: "",
          source: "",
          message: "",
          btn: "",
          value1: "",
          value2: "",
          operator: "",
          slack_id: null,
          from_email: "",
          to_email: "",
          subject: "",
          customEmail: false,
        },
      },
    });
    setFlowData({ xPos: 900, yPos: 400, source: null, sourceHandle: null });
  };

  const getAllNodeList = () => {
    // setLoading(true);
    props
      .getAllNodeList(botId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          setTimeout(() => setLoading(false), 1000);
          // setLoading(false);
          setDiagram(response);
        } else {
          props?.handleAlert(
            response?.errorMessage || "Something went wrong",
            "error"
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        props?.handleAlert(error?.message || "Something went wrong", "error");
        setLoading(false);
      });
  };

  const addNewNodeData = (data) => {
    props
      ?.addNewNodeData(data)
      .then((response) => {
        if (response && !response?.errorMessage) {
          props.handleAlert("New Node Added", "success");
          getAllNodeList();
          clearState();
        } else {
          props?.handleAlert(
            response?.errorMessage || "Something went wrong",
            "error"
          );
          clearState();
        }
      })
      .catch((error) => {
        props?.handleAlert(error?.message || "Something went wrong", "error");
        clearState();
      });
  };

  const addNodeWithConnection = (data) => {
    props
      ?.addNodeWithConnection(data, flowData?.source, flowData?.sourceHandle)
      .then((response) => {
        if (response && !response?.errorMessage) {
          props.handleAlert("New Node Added", "success");
          getAllNodeList();
          setNodePopUp(false);
          clearState();
        } else {
          props?.handleAlert(
            response?.errorMessage || "Something went wrong",
            "error"
          );
          setNodePopUp(false);
          clearState();
        }
      })
      .catch((error) => {
        props?.handleAlert(error?.message || "Something went wrong", "error");
        setNodePopUp(false);
        clearState();
      });
  };

  const handleAddNode = (type, x, y) => {
    const div = document.getElementById("reactflow").getBoundingClientRect();
    const node_data = [
      {
        ...data?.data?.nodeData,
        type: type,
      },
    ];
    const sendData = {
      ...data,
      type: type,
      position: {
        x: x + div.left || flowData?.xPos - panPosition.x + div.left,
        y: y || flowData?.yPos - panPosition.y + div.top,
      },
      data: {
        nodeData: node_data,
      },
    };
    if (flowData?.source) {
      addNodeWithConnection(sendData);
    } else {
      addNewNodeData(sendData);
    }
  };

  const getFlowDetail = () => {
    props
      ?.getFlowDetail(botId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          setFlowDetail(response);
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
    getFlowDetail();
    getAllNodeList();
  }, []);

  useEffect(() => {
    if (updateNodeData?.id) {
      setOpenUpdateSidebar(true);
    } else {
      setOpenUpdateSidebar(false);
    }
  }, [updateNodeData]);

  return (
    <>
      <div className="main-screen">
        <FlowManagerNavbar
          diagram={diagram}
          flowDetail={flowDetail}
          id={botId}
          handleAlert={props?.handleAlert}
          setPublishName={setPublishName}
          publishName={publishName}
        />
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="flow-part" ref={reactFlowWrapper}>
              <div className="flow-main">
                {openUpdateSidebar ? (
                  <UpdateSidebar
                    getAllNodeList={getAllNodeList}
                    handleAlert={props?.handleAlert}
                  />
                ) : (
                  <>
                    <Button
                      className="open-sidebar-btn"
                      onClick={() => setOpen(!open)}
                      style={{ "--left": open ? "294px" : "auto" }}
                    >
                      {open ? (
                        <i className="fa fa-arrow-left"></i>
                      ) : (
                        <i className="fa fa-arrow-right"></i>
                      )}
                    </Button>
                    <FlowManagerSideBar
                      handleAddNode={handleAddNode}
                      open={open}
                    />
                  </>
                )}
                <FlowManager
                  handleAddNode={handleAddNode}
                  setFlowData={setFlowData}
                  flowData={flowData}
                  getAllNodeList={getAllNodeList}
                  handleAlert={props?.handleAlert}
                  nodePopUp={nodePopUp}
                  setNodePopUp={setNodePopUp}
                  diagram={diagram}
                  setDiagram={setDiagram}
                  clearState={clearState}
                  setPublishName={setPublishName}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    updateNodeData: selectorUpdateNodeData(state),
    panPosition: selectorPanPosition(state),
  };
};
const mapDispatchToProps = {
  getAllNodeList,
  getFlowDetail,
  addNewNodeData,
  addNodeWithConnection,
};

export default connect(mapStateToProps, mapDispatchToProps)(Flow);
