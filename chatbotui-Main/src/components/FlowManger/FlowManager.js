import React, { useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  // MiniMap,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "react-flow-renderer";
import { connect } from "react-redux";
import SpecialNode from "../CustomNodes/SpecialNode";
import ButtonNode from "../CustomNodes/ButtonNode";
import Messages from "../CustomNodes/Messages";
import InputText from "../CustomNodes/InputText";
import ConditionalLogic from "../CustomNodes/ConditionalLogic";
import File from "../CustomNodes/File";
import DateNode from "../CustomNodes/DateNode";
import Email from "../CustomNodes/Email";
import NumberNode from "../CustomNodes/NumberNode";
import PhoneNumber from "../CustomNodes/PhoneNumber";
import Url from "../CustomNodes/Url";
import JumpNode from "../CustomNodes/JumpNode";
import MediaNode from "../CustomNodes/MediaNode";
import {
  addNewEdgeConnection,
  addNewNodeEdge,
  getUpdateNode,
  updatePanPosition,
} from "./Action";
import {
  selectorElements,
  selectorUpdateNodeData,
} from "../../Selectors/selector";
import CustomEdge from "./CustomEdge";
// import CustomLine from "./CustomLine";
import { useLocation, useParams } from "react-router-dom";
import AddNodePopUp from "./AddNodePopUp";
import SlackNode from "../CustomNodes/SlackNode";
import SendEmail from "../CustomNodes/SendEmail";

let targetNode = "";
let xPos, yPos, panX, panY, panZoom;

const nodeTypes = {
  special: SpecialNode,
  conditional_logic: ConditionalLogic,
  button: ButtonNode,
  chat: Messages,
  text: InputText,
  file: File,
  number: NumberNode,
  phone: PhoneNumber,
  email: Email,
  date: DateNode,
  url: Url,
  jumpflow: JumpNode,
  media: MediaNode,
  slack: SlackNode,
  send_email: SendEmail,
};

const edgeTypes = {
  buttonedge: CustomEdge,
};

const FlowManager = (props) => {
  const { elements, setFlowData, nodePopUp, setNodePopUp } = props;
  const { botId } = useParams();
  const { pathname } = useLocation();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnectStart = (event, { nodeId, handleId }) => {
    setFlowData({ ...props?.flowData, source: nodeId, sourceHandle: handleId });
  };

  const onConnect = (params) => {
    const { target, source, sourceHandle } = params;
    targetNode = target;
    const data = {
      flow_id: botId,
      sub_node_id: sourceHandle,
      source_node_id: parseInt(source),
      target_node_id: parseInt(target),
    };
    props?.addNewEdgeConnection(data).then(() => {
      props?.getAllNodeList();
      props?.clearState();
      targetNode = "";
    });
  };

  const onConnectEnd = (event) => {
    if (targetNode === "") {
      const div = document.getElementById("reactflow").getBoundingClientRect();
      var x = event.clientX - div.left;
      var y = event.clientY - div.top;
      xPos = x;
      yPos = y;
      if (event.target.classList[0] === "react-flow__pane") {
        setNodePopUp(true);
      }
    }
  };

  const onNodeDragStop = (event, nodes) => {
    let nodesData = nodes;
    var x = nodesData.positionAbsolute.x;
    var y = nodesData.positionAbsolute.y;
    nodesData.position.x = x;
    nodesData.position.y = y;
    nodesData.flow_id = parseInt(botId);
    if (pathname !== `/analyze/${botId}`) {
      props.getUpdateNode(nodesData, nodesData?.id).then(() => {
        props?.getAllNodeList();
      });
    }
  };

  const onPaneClick = () => {
    if (nodePopUp) {
      setNodePopUp(false);
      setFlowData({ ...props?.flowData, source: null, sourceHandle: null });
    }
  };

  const onMoveEnd = (e, viewport) => {
    props?.updatePanPosition(viewport);
  };

  useEffect(() => {
    setNodes(elements?.nodes);
    setEdges(elements?.connections);
    props?.setPublishName("Publish");
  }, [elements]);

  return (
    <>
      <ReactFlowProvider>
        <ReactFlow
          id="reactflow"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDragStop={onNodeDragStop}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          onPaneClick={onPaneClick}
          edgeTypes={edgeTypes}
          zoomOnDoubleClick={false}
          onMoveEnd={onMoveEnd}
          // fitView
          preventScrolling={false}
          zoomOnScroll={false}
          // connectionLineComponent={CustomLine}
          // onInit={onInit}
        >
          <Controls />
          {/* <MiniMap
          nodeColor={(node) => {
            switch (node?.type) {
              case "special":
                return "#228B22";
                case "button":
                  return "#FF0000";
                  case "chat":
                    return "#00BFFF";
                    case "conditional_logic":
                      return "#A9A9A9";
                      case "input":
                        return "#FFFF00";
                        case "text":
                return "#800080";
                case "number":
                  return "#008080";
                  case "phone":
                return "#FF1493";
                case "email":
                  return "#7B68EE";
                  case "jump":
                    return "#ADD8E6";
                    case "date":
                return "#FFD700";
                case "url":
                  return "#CD853F";
                default:
                return "#eee";
              }
            }}
            nodeStrokeWidth={3}
          style={{ backgroundColor: "#FFFFFF" }}
        /> */}
          <Background
            variant="lines"
            gap={100}
            size={0.5}
            color="white"
            style={{ backgroundColor: "#123438" }}
          />
          {nodePopUp && (
            <AddNodePopUp
              handleAddNode={props?.handleAddNode}
              setNodePopUp={setNodePopUp}
              xPos={xPos}
              yPos={yPos}
            />
          )}
        </ReactFlow>
      </ReactFlowProvider>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    elements: selectorElements(state),
    updateNodeData: selectorUpdateNodeData(state),
  };
};

const mapDispatchToProps = {
  addNewEdgeConnection,
  addNewNodeEdge,
  getUpdateNode,
  updatePanPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowManager);
