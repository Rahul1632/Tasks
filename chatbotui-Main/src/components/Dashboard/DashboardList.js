import moment from "moment";
import React, { useState } from "react";
import { Card, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import NoDataIndicatePage from "../reusable/NoDataIndicatePage";
import { AiOutlineRobot } from "react-icons/ai";
import { size, trim } from "lodash";
import logo from "../../Images/brilworks-logo.png";
import { selectorUserData } from "../../Selectors/selector";
import withRouter from "../WrapperComponents/withRouter";
import { connect } from "react-redux";
import {
  addNewFlowList,
  updateFlowName,
  archiveFlow,
  moveFlow,
  removeFromWorkSpace,
} from "./Action";
import AddNewBotModal from "./AddNewBotModal";
import DeleteModal from "../reusable/DeleteModal";
import DashboardNavbar from "./DashboardNavbar";
import WorkSpaceListPopUp from "./WorkSpaceListPopUp";
import Loader from "../reusable/Loader";
import ShowMoreAction from "./ShowMoreAction";
let workdspaceId;
const DashboardList = (props) => {
  const { flowListData, searchData } = props;
  const userId = localStorage.getItem("user_id");
  const [openAddBot, setOpenAddBot] = useState(false);
  const [workListOpen, setWorkListOpen] = useState(false);
  const [updateNameId, setUpdateNameId] = useState(-1);
  const [showMoreAt, setShowMoreAt] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [flowData, setFlowData] = useState("");
  const [flowId, setFlowId] = useState(0);
  const [addNewFlow, setAddNewFlow] = useState({
    name: "",
    user_id: userId,
  });
  const [tempName, setTempname] = useState("");
  const handelSearchData = (e) => {
    const { value } = e?.target || "";
    const data = flowListData?.filter(
      (data) =>
        data?.name?.toLowerCase()?.includes(value.toLowerCase()) ||
        data?.workspace_name?.toLowerCase()?.includes(value.toLowerCase())
    );
    props?.setSearchData(data);
  };

  const handleOpenNewbot = () => {
    setOpenAddBot(!openAddBot);
  };

  const handleChangeData = (e) => {
    const { value, name } = e?.target || "";
    setAddNewFlow({ ...addNewFlow, [name]: value });
  };

  const validation = () => {
    const { name } = addNewFlow;
    if (trim(name) === "") {
      props?.handleAlert("Please enter Name", "error");
      return false;
    } else {
      return true;
    }
  };

  const handleAddNewBot = (e) => {
    e.preventDefault();
    const validate = validation();
    if (validate) {
      props
        ?.addNewFlowList(addNewFlow)
        .then((response) => {
          if (response && !response?.errorMessage) {
            props?.handleAlert("New Bot Created", "success");
            props?.getFlowListData();
            setOpenAddBot(false);
            setAddNewFlow({ user_id: userId, name: "" });
          } else {
            props?.handleAlert(
              response?.errorMessage || "Something went wrong",
              "error"
            );
            setAddNewFlow({ user_id: userId, name: "" });
            // setOpenAddBot(false);
          }
        })
        .catch((error) => {
          props?.handleAlert(error?.message || "Something went wrong", "error");
          setAddNewFlow({ user_id: userId, name: "" });
          setOpenAddBot(false);
        });
    }
  };

  const handleOpenFlow = (id) => {
    if (updateNameId === -1) {
      props?.history(`/bot/${id}`);
    }
  };

  const handleShowMore = (e, id) => {
    e.stopPropagation();
    setShowMoreAt(id);
  };

  const handleUpdateName = (data) => {
    setUpdateNameId(data?.flow_id);
    setAddNewFlow({ ...addNewFlow, name: data?.name });
    setShowMoreAt(-1);
    setTempname(data?.name);
  };

  const handleChangeName = (e) => {
    const { value, name } = e?.target || "";
    setAddNewFlow({ ...addNewFlow, [name]: value });
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
    if (tempName !== addNewFlow?.name) {
      if (trim(addNewFlow?.name) !== "") {
        props
          ?.updateFlowName(id, userId, addNewFlow?.name)
          .then((response) => {
            if (response && !response?.errorMessage) {
              props?.handleAlert("Bot name updated", "success");
              props?.getFlowListData();
              setAddNewFlow({ user_id: userId, name: "" });
              setUpdateNameId(-1);
            } else {
              props?.handleAlert(
                response?.errorMessage || "Something went wrong",
                "error"
              );
              setAddNewFlow({ user_id: userId, name: "" });
              setUpdateNameId(-1);
            }
          })
          .catch((error) => {
            props?.handleAlert(
              error?.message || "Something went wrong",
              "error"
            );
            setAddNewFlow({ user_id: userId, name: "" });
            setUpdateNameId(-1);
          });
      } else {
        setAddNewFlow({ user_id: userId, name: "" });
        setTimeout(() => setUpdateNameId(-1), 200);
      }
    } else {
      setTimeout(() => setUpdateNameId(-1), 200);
    }
  };

  const handleDeleteFlow = (data) => {
    handeleOpenPopup();
    setFlowData(data);
  };

  const handeleOpenPopup = () => {
    setIsOpen(!isOpen);
    setShowMoreAt(-1);
  };

  const handleFlowDelete = () => {
    props
      ?.archiveFlow(flowData?.flow_id, userId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          props?.handleAlert("Bot move to trash ", "success");
          props?.getFlowListData();
          setIsOpen(false);
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

  const handleMoveTo = (data) => {
    workdspaceId = data?.workspace_id;
    setShowMoreAt(-1);
    setWorkListOpen(true);
    setFlowId(data?.flow_id);
  };

  const handleMoveFlow = (id) => {
    props
      ?.moveFlow(flowId, id)
      .then((response) => {
        if (response && !response?.errorMessage) {
          props?.handleAlert("Bot moved successfully ", "success");
          props?.getFlowListData();
          setFlowId(0);
          setWorkListOpen(false);
        } else {
          props?.handleAlert(
            response?.errorMessage || "Something went wrong",
            "error"
          );
          setWorkListOpen(false);
          setFlowId(0);
        }
      })
      .catch((error) => {
        props?.handleAlert(error?.message || "Something went wrong", "error");
        setWorkListOpen(false);
        setFlowId(0);
      });
  };

  const handleRemoveFromWorkSpace = (id) => {
    props
      ?.removeFromWorkSpace(id, userId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          props?.handleAlert(
            "Bot removed from workspace successfully ",
            "success"
          );
          props?.getFlowListData();
          setShowMoreAt(-1);
        } else {
          props?.handleAlert(
            response?.errorMessage || "Something went wrong",
            "error"
          );
          setShowMoreAt(-1);
        }
      })
      .catch((error) => {
        props?.handleAlert(error?.message || "Something went wrong", "error");
        setShowMoreAt(-1);
      });
  };

  return (
    <>
      <DashboardNavbar
        heading={props?.id ? props?.heading : "ALL BOTS"}
        handelSearchData={handelSearchData}
        handleOpenNewbot={handleOpenNewbot}
        addButton={true}
      />
      <div className="dashboard-main-container">
        <AddNewBotModal
          handleChangeData={handleChangeData}
          openModal={openAddBot}
          handleOpenModal={handleOpenNewbot}
          handleAddData={handleAddNewBot}
        />
        {props?.listLoader ? (
          <Loader />
        ) : (
          <div className="flow-list-container">
            {size(searchData) > 0 ? (
              searchData?.map((data, index) => {
                const getCreated = moment(data?.created_at)
                  .startOf("minutes")
                  .fromNow();

                const getUpdated = moment(data?.updated_at)
                  .startOf("minutes")
                  .fromNow();
                return (
                  <div
                    className="dashboard-bots-list mb-15"
                    key={index}
                    onClick={() => handleOpenFlow(data?.flow_id)}
                  >
                    <Card>
                      <Card.Body className="dashboard-bot-card">
                        <div className="dashboard-bot-cheackbox">
                          {/* <Form>
                        <Form.Check type="checkbox"></Form.Check>
                      </Form> */}
                        </div>
                        <div className="dashboard-bots-img">
                          <img className="brilbot-logo" alt="logo" src={logo} />
                        </div>
                        <div className="dashboard-bots-text">
                          <div className="dashboard-bots-text">
                            <span className="dashboard-bots-textspan">
                              {updateNameId === data?.flow_id ? (
                                <form
                                  onSubmit={(e) =>
                                    handleUpdate(e, data?.flow_id)
                                  }
                                >
                                  <FormControl
                                    autoFocus
                                    value={addNewFlow?.name}
                                    type="text"
                                    name="name"
                                    onChange={handleChangeName}
                                    onBlur={(e) =>
                                      handleUpdate(e, data?.flow_id)
                                    }
                                  />
                                </form>
                              ) : (
                                `${data?.name}`
                              )}
                            </span>
                            <div className="dashboard-bots-creat-update">
                              <div>
                                <span>Created {getCreated}/</span>
                                <span>Updated {getUpdated}</span>
                              </div>
                              {data?.workspace_name && (
                                <span className={`move-workspace-name`}>
                                  {data?.workspace_name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="dashboard-bots-function-list">
                          <div className="dashboard-bots-counter">
                            <div className="dashboard-bots-counter-chat">
                              <span className="conter-chats">CHATS</span>
                              <span className="conter-finished">
                                {data?.chats || 0}
                              </span>
                            </div>
                            <div className="dashboard-bots-counter-line"></div>
                            <div className="dashboard-bots-counter-finish">
                              <span className="conter-chats">FINISHED</span>
                              <span className="conter-finished">
                                {data?.finished || 0}
                              </span>
                            </div>
                          </div>
                          <div className="dashboard-bots-status">
                            <div
                              className="dashboard-icon-link not-allowed"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <i className="fa fa-bar-chart"></i>
                            </div>
                            <div
                              className="dashboard-icon-link not-allowed"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <i className="fa fa-comments"></i>
                            </div>
                            {data?.publish_token ? (
                              <Link
                                className="dashboard-icon-link"
                                to={`/${data?.publish_token}/preview`}
                                target="_blank"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <i className="fa fa-share-square"></i>
                              </Link>
                            ) : (
                              <div
                                className="dashboard-icon-link not-allowed"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <i className="fa fa-share-square"></i>
                              </div>
                            )}
                            <div
                              className="dashboard-icon-link"
                              onClick={(e) => handleShowMore(e, data?.flow_id)}
                            >
                              <i className="fa fa-ellipsis-h"></i>
                            </div>
                          </div>
                        </div>
                        {showMoreAt === data?.flow_id && (
                          <ShowMoreAction
                            data={data}
                            handleRemoveFromWorkSpace={
                              handleRemoveFromWorkSpace
                            }
                            handleMoveTo={handleMoveTo}
                            setShowMoreAt={setShowMoreAt}
                            handleUpdateName={handleUpdateName}
                            handleOpenFlow={handleOpenFlow}
                            handleDeleteFlow={handleDeleteFlow}
                          />
                        )}
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
            ) : (
              <NoDataIndicatePage
                icon={AiOutlineRobot}
                content="No data found"
                height="60vh"
              />
            )}
            <DeleteModal
              isOpenDelete={isOpen}
              setIsOpenDelete={setIsOpen}
              handeleOpenPopup={handeleOpenPopup}
              modalName={flowData?.name}
              deleteDataById={handleFlowDelete}
            />
            <WorkSpaceListPopUp
              id={workdspaceId}
              openModal={workListOpen}
              closeModal={setWorkListOpen}
              workSpaceList={props?.workSpaceList}
              moveFlow={handleMoveFlow}
            />
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: selectorUserData(state),
  };
};

const mapDispatchToProps = {
  addNewFlowList,
  updateFlowName,
  archiveFlow,
  moveFlow,
  removeFromWorkSpace,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DashboardList));
