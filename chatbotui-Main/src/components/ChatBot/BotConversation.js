import React, { Component } from "react";
import { FormControl, Button, InputGroup, Form } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getPreview,
  sendResponse,
  publishPreview,
  sendHistory,
  getUserIp,
  sendUserFile,
  getVariableList,
  sendVariableList,
} from "./Action";
import { getAllNodeList } from "../FlowManger/Action";

let temp_chat = [];
class BotConversation extends Component {
  constructor(props) {
    super(props);
    this.messageRef = React.createRef();
    this.state = {
      chat: [],
      preview: {},
      options: [],
      loading: true,
      messageLoading: false,
      userIp: "",
      StartAgain: false,
      fileUploadLoading: 0,
      buttonDisable: true,
      variableList: [],
    };
  }

  getIpData = () => {
    this.props?.getUserIp().then((response) => {
      this.publishPreview();
      this.setState({ userIp: response?.ip });
    });
  };

  publishPreview = () => {
    this.props
      ?.publishPreview(this.props?.token)
      .then((response) => {
        if (response && !response?.errorMessage) {
          this.setState({ preview: response, loading: false });
          this.setStartNode(response);
          this.getVariableList();
        } else {
          this.props?.handleAlert(
            response?.errorMessage || "Something went wrong",
            "error"
          );
        }
      })
      .catch((error) => {
        this.props?.handleAlert(
          error?.message || "Something went wrong",
          "error"
        );
      });
  };

  getAllNodeList = (botId) => {
    this.props
      ?.getAllNodeList(botId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          this.setState({ preview: response });
          this.setStartNode(response, botId);
        } else {
          this.props?.handleAlert(
            response?.errorMessage || "Something went wrong",
            "error"
          );
        }
      })
      .catch((error) => {
        this.props?.handleAlert(
          error?.message || "Something went wrong",
          "error"
        );
      });
  };

  getVariableList = () => {
    this.props
      ?.getVariableList(this.props?.userId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          this.setState({ variableList: response?.Variables });
        } else {
          this.props?.handleAlert(
            response?.errorMessage || "Something went wrong",
            "error"
          );
        }
      })
      .catch((error) => {
        this.props?.handleAlert(
          error?.message || "Something went wrong",
          "error"
        );
      });
  };
  sendVariableList = () => {
    const { variableList } = this.state;
    this.props
      ?.sendVariableList(variableList, this.props?.userId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          // this.props?.handleAlert("data send", "success")
        } else {
          this.props?.handleAlert(
            response?.errorMessage || "Something went wrong",
            "error"
          );
        }
      })
      .catch((error) => {
        this.props?.handleAlert(
          error?.message || "Something went wrong",
          "error"
        );
      });
  };

  sendHistory = () => {
    const { chat, userIp } = this.state;
    const sendData = {
      flow_id: chat[0]?.flow_id,
      chat: temp_chat,
      visitor_ip: userIp,
    };
    this.props
      ?.sendHistory(sendData)
      .then((response) => {
        if (response && !response?.errorMessage) {
          // this.props?.handleAlert("data send", "success")
        } else {
          this.props?.handleAlert(
            response?.errorMessage || "Something went wrong",
            "error"
          );
        }
      })
      .catch((error) => {
        this.props?.handleAlert(
          error?.message || "Something went wrong",
          "error"
        );
      });
  };

  // getHistory = (preview) => {
  //   this.setState({ StartAgain: true });
  //   const { userIp } = this.state;
  //   this.props
  //     ?.getHistory(userIp, this.props?.token)
  //     .then((response) => {
  //       if (response && size(response?.chat) && !response?.errorMessage) {
  //         const newData = response?.chat;
  //         const newButtonData = this.state.preview?.nodes.filter(
  //           (item) => parseInt(item.id) === newData[newData.length - 1].node_id
  //         );
  //         this.setState({ chat: newData });
  //         if (newButtonData[0]?.type === "button") {
  //           this.findOption(newData[newData.length - 1]?.node_id);
  //         }
  //       } else {
  //         const { nodes } = preview;
  //         const startNode = nodes?.filter((data) => data?.type === "special");
  //         this.setState({
  //           chat: [...this.state.chat, ...startNode[0]?.data?.nodeData],
  //           options: startNode[0]?.data?.nodeData,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       this.props?.handleAlert(
  //         error?.message || "Something went wrong",
  //         "error"
  //       );
  //     });
  // };

  findOption = (id) => {
    const nextNodeData = this.state.preview?.nodes.filter(
      (data) => parseInt(data?.id) === id
    );
    const optionBtn = nextNodeData[0]?.data?.nodeData.filter(
      (data) => data.type === "button"
    );
    this.setState({ options: optionBtn });
  };

  setStartNode = (preview, botId = "") => {
    // if (!botId) {
    //   this.getHistory(preview);
    // } else {
    //   const { nodes } = preview;
    //   const startNode = nodes?.filter((data) => data?.type === "special");
    //   this.setState({
    //     chat: [...this.state.chat, ...startNode[0]?.data?.nodeData],
    //     options: startNode[0]?.data?.nodeData,
    //   });
    // }

    const { nodes } = preview;
    const startNode = nodes?.filter((data) => data?.type === "special");
    this.setState({
      chat: [...this.state.chat, ...startNode[0]?.data?.nodeData],
      options: startNode[0]?.data?.nodeData,
    });
  };

  findNextNode = (sourceId) => {
    const { preview, chat } = this.state;
    this.setState({ options: [], messageLoading: true });
    const { connections, nodes } = preview;
    const nextNodeId = connections.filter(
      (data) => data?.sourceHandle === sourceId
    );

    if (nextNodeId.length) {
      const nextNodeData = nodes.filter(
        (data) => data?.id === nextNodeId[0]?.target
      );
      if (nextNodeData[0]?.type !== "button") {
        temp_chat = [...temp_chat, { ...nextNodeData[0]?.data?.nodeData[0] }];
        if (nextNodeData[0]?.data?.nodeData[0]?.type === "chat") {
          this.findNextNode(nextNodeData[0]?.data?.nodeData[0]?.id);
        } else if (nextNodeData[0]?.data?.nodeData[0]?.type === "slack") {
          this.findNextNode(nextNodeData[0]?.data?.nodeData[0]?.id);
        } else if (nextNodeData[0]?.data?.nodeData[0]?.type === "send_email") {
          this.findNextNode(nextNodeData[0]?.data?.nodeData[0]?.id);
        } else if (nextNodeData[0]?.data?.nodeData[0]?.type === "jumpflow") {
          this.getAllNodeList(nextNodeData[0]?.data?.nodeData[0]?.data?.jumpId);
        } else if (nextNodeData[0]?.data?.nodeData[0]?.type === "media") {
          this.findNextNode(nextNodeData[0]?.data?.nodeData[0]?.id);
        }
        setTimeout(() => {
          this.setState({ chat: temp_chat, messageLoading: false });
        }, chat?.length);
      } else {
        const btnChat = nextNodeData[0]?.data?.nodeData.filter(
          (data) => data.type === "chat"
        );
        const optionBtn = nextNodeData[0]?.data?.nodeData.filter(
          (data) => data.type === "button"
        );
        temp_chat = [...temp_chat, { ...btnChat[0] }];

        setTimeout(() => {
          this.setState({
            options: optionBtn,
            chat: temp_chat,
            messageLoading: false,
          });
        }, chat?.length);
      }
    } else {
      setTimeout(() => {
        setTimeout(() => {
          this.setState({ StartAgain: true });
        }, 2000);
        this.setState({ messageLoading: false });
        this.sendVariableList();
      }, chat?.length);
    }
  };

  checkUserMessageResponse = (data) => {
    const { chat } = this.state;
    switch (data?.type) {
      case "special":
        temp_chat = [
          ...chat,
          {
            ...data,
            data: { text: data?.data?.button },
            type: "chat",
            from: "user",
          },
        ];
        return temp_chat;

      case "text":
      case "number":
      case "phone":
      case "url":
      case "email":
      case "date":
        temp_chat = chat;
        const value = document.getElementById(data?.id).value;
        temp_chat.pop();
        temp_chat = [
          ...temp_chat,
          { ...data, type: "chat" },
          {
            ...data,
            type: "chat",
            from: "user",
            data: { text: value },
          },
        ];
        const { variableList } = this.state;
        for (let i = 0; i < variableList.length; i++) {
          if (variableList[i].varName === data?.destination) {
            variableList[i].varValue = value;
          }
        }
        return temp_chat;

      case "button":
        temp_chat = chat;
        temp_chat = [...temp_chat, { ...data, from: "user" }];
        return temp_chat;

      case "file":
        temp_chat = chat;
        temp_chat.pop();
        temp_chat = [
          ...temp_chat,
          { ...data, type: "chat" },
          {
            ...data,
            type: "chat",
            from: "user",
            data: { text: "file uploaded" },
          },
        ];
        return temp_chat;

      default:
        break;
    }
  };

  handleSendResponse = (data, e) => {
    e.preventDefault();
    const userMessage = this.checkUserMessageResponse(data);
    this.setState({ chat: userMessage });
    this.findNextNode(data?.id);
    this.sendHistory();
  };

  VariableResponceCheck = (preview) => {
    const { variableList } = this.state;
    let oldVar = preview?.data?.text;
    if (oldVar.includes("$")) {
      let SplitText = oldVar.split("$");
      for (let i = 0; i < SplitText.length; i++) {
        if (SplitText[i].includes("·")) {
          for (let j = 0; j < variableList.length; j++) {
            if (SplitText[i] === "·".concat(variableList[j].varName)) {
              SplitText[i] = variableList[j].varValue;
            }
          }
        }
      }
      return SplitText.join("");
    } else {
      return oldVar;
    }
  };

  messageText = (preview, type = "chat") => {
    switch (preview?.type) {
      case "chat":
        return this.VariableResponceCheck(preview);
      case "send_email":
      case "slack":
        return "send";

      case "jumpflow":
        return preview?.data?.name;

      case "button":
        return preview?.data?.btn;

      case "special":
        if (type === "option") {
          return preview?.data?.button;
        } else {
          return preview?.data?.text;
        }

      case "text":
      case "url":
      case "email":
      case "date":
      case "number":
      case "phone":
        let newText = this.VariableResponceCheck(preview);
        let sendPreview = {
          flow_id: preview?.flow_id,
          node_id: preview?.node_id,
          type: preview?.type,
          id: preview?.id,
          data: {
            text: newText,
            value: preview?.data?.text,
          },
          destination: preview?.destination,
        };

        return (
          <div>
            <p>{sendPreview?.data?.text}</p>
            <form onSubmit={(e) => this.handleSendResponse(sendPreview, e)}>
              <div className="input-group">
                {preview?.type === "number" || preview?.type === "phone" ? (
                  <input
                    autoFocus
                    className="form-control"
                    id={preview?.id}
                    autoComplete="off"
                    required
                    type="number"
                    min={0}
                    placeholder="add number..."
                  />
                ) : (
                  <input
                    autoFocus
                    className="form-control"
                    id={preview?.id}
                    autoComplete="off"
                    required
                    type={preview?.type}
                    placeholder="Type here..."
                  />
                )}

                <Button type="submit" autoFocus>
                  <i className="fa fa-send"></i>
                </Button>
              </div>
            </form>
          </div>
        );

      case "file":
        const { fileUploadLoading, buttonDisable } = this.state;
        const handleSendFile = (e) => {
          let { type } = e?.target?.files[0] || {};
          if (type !== undefined) {
            const typeCheck = type.slice(type.lastIndexOf("/") + 1);
            const fileSize = e?.target?.files[0].size;
            let accessFileType = [
              "jpg",
              "jpeg",
              "png",
              "pdf",
              "csv",
              "msword",
              "vnd.openxmlformats-officedocument.wordprocessingml.document",
              "svg+xml",
            ];

            if (accessFileType.includes(typeCheck)) {
              if (fileSize <= 15728640) {
                let formData = new FormData();
                formData.append("file", e?.target?.files[0]);
                this.setState({ fileUploadLoading: 1 });
                this?.props
                  ?.sendUserFile(formData, preview?.node_id, preview?.flow_id)
                  .then((response) => {
                    if (response && !response?.errorMessage) {
                      this.setState({
                        fileUploadLoading: 0,
                        buttonDisable: false,
                      });
                      this?.props.handleAlert(
                        "File successfully uploaded",
                        "success"
                      );
                    } else {
                      this?.props.handleAlert(
                        response?.errorMessage || "Please Upload again",
                        "error"
                      );
                    }
                  });
              } else {
                this.setState({ fileUploadLoading: 3, buttonDisable: true });
              }
            } else {
              this.setState({ fileUploadLoading: 2, buttonDisable: true });
            }
          } else {
            this.setState({ buttonDisable: true });
          }
        };

        return (
          <div>
            <p>{preview?.data?.text}</p>
            <form onSubmit={(e) => this.handleSendResponse(preview, e)}>
              <InputGroup>
                <FormControl
                  id={preview?.id}
                  type="file"
                  name="filename"
                  required
                  onChange={handleSendFile}
                />

                {buttonDisable ? (
                  <Button disabled>
                    <i className="fa fa-send"></i>
                  </Button>
                ) : (
                  <Button onClick={(e) => this.handleSendResponse(preview, e)}>
                    <i className="fa fa-send"></i>
                  </Button>
                )}
              </InputGroup>
              {fileUploadLoading === 1 ? (
                <div className="mt-15px">
                  <span className="wait-uploading">
                    *Please wait your data uploading...
                  </span>
                  <Button className="media-sumbit-loader" disabled>
                    <div className="dot-spin" />
                  </Button>
                </div>
              ) : fileUploadLoading === 2 ? (
                <div className="mt-15px">
                  <span className="wait-uploading-error">
                    *File format is not valid, upload only this format "jpg",
                    jpeg,png,pdf,cvc,doc,docx
                  </span>
                </div>
              ) : (
                fileUploadLoading === 3 && (
                  <div className="mt-15px">
                    <span className="wait-uploading-error">
                      *max upload size 15MB
                    </span>
                  </div>
                )
              )}
            </form>
          </div>
        );

      case "media":
        return preview.data?.content_type === "video/mp4" ? (
          <video
            className="w-265px"
            type="video/mp4"
            src={preview.data.source}
            controls
          />
        ) : preview.data?.content_type === "audio/mpeg" ? (
          <audio
            className="w-265px"
            type="video/mp4"
            src={preview.data.source}
            controls
          />
        ) : (
          <img className="w-265px" alt="img" src={preview.data.source}></img>
        );

      default:
        break;
    }
  };

  scrollToBottom = () => {
    this.messageRef.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.getIpData();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleStartAgain = () => {
    this.setState({ fileUploadLoading: 0 });
    this.publishPreview();
    const { chat, userIp } = this.state;
    // const { nodes } = this.state.preview;
    // const startNode = nodes?.filter((data) => data?.type === "special");
    // this.setState({ options: startNode[0]?.data?.nodeData, StartAgain: false });
    this.setState({
      chat: [],
      StartAgain: false,
    });
    const sendData = {
      flow_id: chat[0]?.flow_id,
      chat: [],
      visitor_ip: userIp,
    };
    this.props
      ?.sendHistory(sendData)
      .then((response) => {
        if (response && !response?.errorMessage) {
          // this.props?.handleAlert("data send", "success")
        } else {
          this.props?.handleAlert(
            response?.errorMessage || "Something went wrong",
            "error"
          );
        }
      })
      .catch((error) => {
        this.props?.handleAlert(
          error?.message || "Something went wrong",
          "error"
        );
      });
  };

  render() {
    const { loading, chat, options, StartAgain, messageLoading } = this.state;
    return (
      <>
        <div className={`main-conversation ${loading ? `d-flex` : `d-block`}`}>
          {loading ? (
            <div className="dot-typing" />
          ) : (
            <>
              {chat?.map((preview, index) => {
                // return preview?.data?.map((message, index) => {
                return (
                  <div
                    key={index}
                    className={`message-container ${
                      preview?.from === "user" ? `justify-end` : ``
                    }`}
                    style={{
                      "--time": `${
                        preview?.from === "user" ? "0" : index / 5
                      }s`,
                    }}
                  >
                    <div
                      className={`bot-message-container ${
                        preview?.from === "user" ? `bot-user-message` : ``
                      }`}
                    >
                      {this.messageText(preview, "chat")}
                    </div>
                  </div>
                );
                // });
              })}

              {options?.length > 0 && (
                <div
                  className="option-container-main"
                  style={{
                    "--optionTime": `${chat?.length / 5}s`,
                  }}
                >
                  <span className="option-heading">CHOOSE AN OPTION</span>
                  <div className="d-flex flex-wrap">
                    {options?.map((value, index) => {
                      return value?.type !== "button" &&
                        value?.type !== "special" ? (
                        <div key={index} className="bot-message-container">
                          {this.messageText(value, "option")}
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="bot-option-container"
                          onClick={(e) => this.handleSendResponse(value, e)}
                        >
                          {this.messageText(value, "option")}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {StartAgain && (
                <div>
                  <Button
                    className="start-again"
                    onClick={this.handleStartAgain}
                  >
                    Return to Main Menu
                  </Button>
                </div>
              )}
              {messageLoading && (
                <div className="message-loader ">
                  <div className="dot-typing" />
                </div>
              )}
            </>
          )}
          <div
            ref={(e) => {
              this.messageRef = e;
            }}
          ></div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = {
  getPreview,
  sendResponse,
  publishPreview,
  getAllNodeList,
  sendHistory,
  getUserIp,
  sendUserFile,
  getVariableList,
  sendVariableList,
};

export default connect(null, mapDispatchToProps)(BotConversation);
