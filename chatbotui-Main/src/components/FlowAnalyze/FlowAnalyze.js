import React from "react";
import ReactFlow, {
  Background,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getFlowAnalyze } from "./Action";
import { useParams } from "react-router-dom";
import SpecialNode from "../CustomNodes/SpecialNode";
import ConditionalLogic from "../CustomNodes/ConditionalLogic";
import ButtonNode from "../CustomNodes/ButtonNode";
import Messages from "../CustomNodes/Messages";
import InputText from "../CustomNodes/InputText";
import File from "../CustomNodes/File";
import NumberNode from "../CustomNodes/NumberNode";
import PhoneNumber from "../CustomNodes/PhoneNumber";
import Email from "../CustomNodes/Email";
import DateNode from "../CustomNodes/DateNode";
import Url from "../CustomNodes/Url";
import JumpNode from "../CustomNodes/JumpNode";
import MediaNode from "../CustomNodes/MediaNode";
import SlackNode from "../CustomNodes/SlackNode";
import CustomEdge from "../FlowManger/CustomEdge";

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
};
const edgeTypes = {
  buttonedge: CustomEdge,
};

const FlowAnalyze = (props) => {
  const { botId } = useParams();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const getFlowAnalyze = () => {
    props
      ?.getFlowAnalyze(botId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          setNodes(response?.nodes);
          setEdges(response?.connections);
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
    getFlowAnalyze();
  }, []);

  return (
    <>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <Background style={{ backgroundColor: "#fff" }} />
        </ReactFlow>
      </ReactFlowProvider>
    </>
  );
};

const mapDispatchToProps = {
  getFlowAnalyze,
};

export default connect(null, mapDispatchToProps)(FlowAnalyze);
