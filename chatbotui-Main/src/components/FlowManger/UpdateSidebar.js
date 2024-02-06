import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  selectorElements,
  selectorUpdateNodeData,
} from "../../Selectors/selector";
import { useState } from "react";
import { updateNodeData } from "../CustomNodes/Action";
import { updateSubNode } from "./Action";
import TextNode from "../UpdateNode/TextNode";
import ButtonNode from "../UpdateNode/ButtonNode";
import DateNode from "../UpdateNode/DateNode";
import ConditionNode from "../UpdateNode/ConditionNode";
import PhoneNode from "../UpdateNode/PhoneNode";
import UrlNode from "../UpdateNode/UrlNode";
import NumberNode from "../UpdateNode/NumberNode";
import EmailNode from "../UpdateNode/EmailNode";
import SpecialNode from "../UpdateNode/SpecialNode";
import JumpNode from "../UpdateNode/JumpNode";
import { useParams } from "react-router-dom";
import FileNode from "../UpdateNode/FileNode";
import SlackNode from "../UpdateNode/SlackNode";
import SendEmailNode from "../UpdateNode/SendEmailNode";
import MessagesChat from "../UpdateNode/MessagesChat";

const UpdateSidebar = (props) => {
  const { updateNode, elementList } = props;
  const { botId } = useParams();
  const [updateData, setUpdateData] = useState({
    nodeData: [],
  });

  const handleCancel = () => {
    props?.updateNodeData({});
    props?.getAllNodeList();
  };

  useEffect(() => {
    const nodeData = elementList?.nodes?.filter(
      (data) => parseInt(data.id) === updateNode.id
    );
    setUpdateData(nodeData[0]);
  }, [updateNode]);

  const handleUpdateSubNode = (data) => {
    let sendData = {};
    if (data?.type === "conditional_logic") {
      sendData = [
        {
          id: data?.data?.nodeData[0]?.id,
          node_id: data?.id,
          flow_id: botId,
          type: data?.type,
          destination: "",
          data: {
            value1: data?.data?.nodeData[0]?.data?.value1,
            operator: data?.data?.nodeData[0]?.data?.operator,
            value2: data?.data?.nodeData[0]?.data?.value2,
          },
        },
      ];
    } else if (data?.type === "jumpflow") {
      sendData = [
        {
          id: data?.data?.nodeData[0]?.id,
          node_id: data?.id,
          flow_id: botId,
          type: data?.type,
          destination: "",
          data: {
            jumpId: data?.data?.nodeData[0]?.jumpId.toString(),
            name: data?.data?.nodeData[0]?.name,
          },
        },
      ];
    } else if (data?.type === "button") {
      sendData = data?.nodeData;
    } else if (data?.type === "slack") {
      sendData = [
        {
          id: data?.data?.nodeData[0]?.id,
          node_id: data?.id,
          flow_id: botId,
          type: data?.type,
          destination: "",
          data: {
            text: data?.data?.nodeData[0]?.data?.text,
            slack_id: data?.data?.nodeData[0]?.data?.slack_id,
          },
        },
      ];
    } else if (data?.type === "send_email") {
      sendData = [
        {
          id: data?.data?.nodeData[0]?.id,
          node_id: data?.id,
          flow_id: botId,
          type: data?.type,
          destination: "",
          data: {
            from_email: data?.data?.nodeData[0]?.data?.from_email,
            to_email: data?.data?.nodeData[0]?.data?.to_email,
            subject: data?.data?.nodeData[0]?.data?.subject,
            text: data?.data?.nodeData[0]?.data?.text,
            customEmail: data?.data?.nodeData[0]?.data?.customEmail,
          },
        },
      ];
    } else {
      sendData = [
        {
          id: data?.data?.nodeData[0]?.id,
          node_id: data?.id,
          flow_id: botId,
          type: data?.type,
          destination: data?.data?.nodeData[0]?.destination,
          data: {
            text: data?.data?.nodeData[0]?.data?.text,
          },
        },
      ];
    }
    props
      ?.updateSubNode(sendData)
      .then((response) => {
        if (response && !response?.errorMessage) {
          props?.updateNodeData({});
          props?.getAllNodeList();
          props?.handleAlert("Bot update successfully ", "success");
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

  return (
    <>
      {updateData?.type === "chat" && (
        <MessagesChat
          data={updateData}
          handleCancel={handleCancel}
          handleUpdateSubNode={handleUpdateSubNode}
          handleAlert={props?.handleAlert}
          variable={elementList?.custom_fields || {}}
        />
      )}
      {updateData?.type === "special" && (
        <SpecialNode
          data={updateData}
          handleCancel={handleCancel}
          handleUpdateNode={handleUpdateSubNode}
          handleAlert={props?.handleAlert}
        />
      )}
      {updateData?.type === "button" && (
        <ButtonNode
          data={updateData}
          handleCancel={handleCancel}
          handleUpdateSubNode={handleUpdateSubNode}
          handleAlert={props?.handleAlert}
        />
      )}
      {updateData?.type === "text" && (
        <TextNode
          data={updateData}
          handleCancel={handleCancel}
          handleUpdateSubNode={handleUpdateSubNode}
          handleAlert={props?.handleAlert}
          variable={elementList?.custom_fields || {}}
          getAllNodeList={props?.getAllNodeList}
        />
      )}
      {updateData?.type === "date" && (
        <DateNode
          data={updateData}
          handleCancel={handleCancel}
          handleUpdateSubNode={handleUpdateSubNode}
          handleAlert={props?.handleAlert}
          variable={elementList?.custom_fields || {}}
          getAllNodeList={props?.getAllNodeList}
        />
      )}
      {updateData?.type === "conditional_logic" && (
        <ConditionNode
          data={updateData}
          handleCancel={handleCancel}
          handleUpdateSubNode={handleUpdateSubNode}
          handleAlert={props?.handleAlert}
          variable={elementList?.custom_fields || {}}
          getAllNodeList={props?.getAllNodeList}
        />
      )}
      {updateData?.type === "phone" && (
        <PhoneNode
          data={updateData}
          handleCancel={handleCancel}
          handleUpdateSubNode={handleUpdateSubNode}
          handleAlert={props?.handleAlert}
          variable={elementList?.custom_fields || {}}
          getAllNodeList={props?.getAllNodeList}
        />
      )}
      {updateData?.type === "url" && (
        <UrlNode
          data={updateData}
          handleCancel={handleCancel}
          handleUpdateSubNode={handleUpdateSubNode}
          handleAlert={props?.handleAlert}
          variable={elementList?.custom_fields || {}}
          getAllNodeList={props?.getAllNodeList}
        />
      )}
      {updateData?.type === "number" && (
        <NumberNode
          data={updateData}
          handleCancel={handleCancel}
          handleUpdateSubNode={handleUpdateSubNode}
          handleAlert={props?.handleAlert}
          variable={elementList?.custom_fields || {}}
          getAllNodeList={props?.getAllNodeList}
        />
      )}
      {updateData?.type === "email" && (
        <EmailNode
          data={updateData}
          handleCancel={handleCancel}
          handleUpdateSubNode={handleUpdateSubNode}
          handleAlert={props?.handleAlert}
          variable={elementList?.custom_fields || {}}
          getAllNodeList={props?.getAllNodeList}
        />
      )}

      {updateData?.type === "jumpflow" && (
        <JumpNode
          data={updateData}
          handleCancel={handleCancel}
          handleUpdateSubNode={handleUpdateSubNode}
        />
      )}
      {updateData?.type === "file" && (
        <FileNode
          data={updateData}
          handleCancel={handleCancel}
          handleUpdateSubNode={handleUpdateSubNode}
        />
      )}
      {updateData?.type === "slack" && (
        <SlackNode
          data={updateData}
          handleCancel={handleCancel}
          handleUpdateSubNode={handleUpdateSubNode}
          handleAlert={props?.handleAlert}
        />
      )}
      {updateData?.type === "send_email" && (
        <SendEmailNode
          data={updateData}
          handleCancel={handleCancel}
          handleUpdateSubNode={handleUpdateSubNode}
          handleAlert={props?.handleAlert}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    updateNode: selectorUpdateNodeData(state),
    elementList: selectorElements(state),
  };
};

const mapDispatchToProps = {
  updateNodeData,
  updateSubNode,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSidebar);
