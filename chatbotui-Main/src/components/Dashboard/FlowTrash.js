import moment from "moment";
import React, { useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import NoDataIndicatePage from "../reusable/NoDataIndicatePage";
import DashboardNavbar from "./DashboardNavbar";
import { size } from "lodash";
import { getTrashFlowList, restoreFlow, trashDelete } from "./Action";
import { connect } from "react-redux";
import { useState } from "react";
import logo from "../../Images/brilworks-logo.png";
import { AiOutlineRobot } from "react-icons/ai";
import Loader from "../reusable/Loader";
import DeleteModal from "../reusable/DeleteModal";

const FlowTrash = (props) => {
  const userId = localStorage.getItem("user_id");
  const [trashList, setTrashList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [trashData, setTarshData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [showMoreAt, setShowMoreAt] = useState(-1);
  const [loading, setLoading] = useState(true);
  const hideMore = useRef();

  const getTrashListData = () => {
    props
      ?.getTrashFlowList(userId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          setTrashList(response?.flows);
          setSearchData(response?.flows);
          setLoading(false);
        } else {
          props?.handleAlert(
            response?.errorMessage || response?.error || "Something went wrong",
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

  const handleRestore = (id) => {
    props
      ?.restoreFlow(id, userId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          props?.handleAlert("Bot restore successfully", "success");
          getTrashListData();
        } else {
          props?.handleAlert(
            response?.errorMessage || response?.error || "Something went wrong",
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

  const handelSearchData = (e) => {
    const { value } = e.target || "";
    const data = trashList.filter((data) =>
      data?.name?.toLowerCase()?.includes(value.toLowerCase())
    );
    setSearchData(data);
  };

  const handleDelete = (data) => {
    setTarshData(data);
    setShowMoreAt(-1);
    handeleOpenPopup();
  };

  const handeleOpenPopup = () => {
    setIsOpen(!isOpen);
  };

  const handleTrashDelete = () => {
    props
      ?.trashDelete(trashData?.flow_id, userId)
      .then((response) => {
        if (response && !response?.errorMessage && !response?.error) {
          props?.handleAlert("Bot Deleted", "success");
          getTrashListData();
          setIsOpen(false);
        } else {
          props?.handleAlert(
            response?.errorMessage || response?.error || "Something went wrong",
            "error"
          );
        }
      })
      .catch((error) => {
        props?.handleAlert(error?.message || "Something went wrong", "error");
      });
  };

  useEffect(() => {
    getTrashListData();
    document.body.addEventListener("mousedown", handleKeyDown);
    return () => {
      document.body.removeEventListener("mousedown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (hideMore.current && !hideMore.current.contains(e?.target)) {
      setShowMoreAt(-1);
    }
  };

  const handleShowMore = (id) => {
    setShowMoreAt(id);
  };

  return (
    <div className="d-flex h-100">
      <div className="dashbord-main ">
        <DashboardNavbar heading="Trash" handelSearchData={handelSearchData} />
        {loading ? (
          <Loader />
        ) : (
          <div className="flowtrash-main-container">
            <div className="flow-trash-main">
              {size(searchData) > 0 ? (
                searchData?.map((data, index) => {
                  const getCreated = moment(data?.created_at)
                    .startOf("minutes")
                    .fromNow();

                  const getUpdated = moment(data?.updated_at)
                    .startOf("minutes")
                    .fromNow();
                  return (
                    <div className="dashboard-bots-list mb-15" key={index}>
                      <Card>
                        <Card.Body className="dashboard-bot-card">
                          <div className="dashboard-bot-cheackbox"></div>
                          <div className="dashboard-bots-img">
                            <img
                              className="brilbot-logo"
                              alt="logo"
                              src={logo}
                            />
                          </div>
                          <div className="dashboard-bots-text">
                            <div className="dashboard-bots-text">
                              <span className="dashboard-bots-textspan">
                                {data?.name}
                              </span>
                              <div className="dashboard-bots-creat-update">
                                <div>
                                  <span>Created {getCreated}/</span>
                                  <span>Updated {getUpdated}</span>
                                </div>
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
                            <div className="dashboard-icon-link not-allowed">
                              <i className="fa fa-bar-chart"></i>
                            </div>
                            <div className="dashboard-icon-link not-allowed">
                              <i className="fa fa-comments"></i>
                            </div>
                            <div className="dashboard-icon-link not-allowed">
                              <i className="fa fa-share-square"></i>
                            </div>
                            <div
                              className="dashboard-icon-link"
                              onClick={() => handleShowMore(data?.flow_id)}
                            >
                              <i className="fa fa-ellipsis-h"></i>
                            </div>
                          </div>
                          {showMoreAt === data?.flow_id && (
                            <>
                              <div className="show-more-main" ref={hideMore}>
                                <li
                                  className="showmore-list-group-item"
                                  onClick={() => handleRestore(data?.flow_id)}
                                >
                                  <i className="fa fa-undo"></i>
                                  <span>Restore</span>
                                </li>
                                <li
                                  className="showmore-list-group-item"
                                  onClick={() => handleDelete(data)}
                                >
                                  <i className="fa fa-trash"></i>
                                  <span>Delete</span>
                                </li>
                              </div>
                            </>
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
            </div>
          </div>
        )}
        {isOpen && (
          <DeleteModal
            isOpenDelete={isOpen}
            setIsOpenDelete={setIsOpen}
            handeleOpenPopup={handeleOpenPopup}
            modalName={trashData?.name}
            deleteDataById={handleTrashDelete}
          />
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  getTrashFlowList,
  restoreFlow,
  trashDelete,
};

export default connect(null, mapDispatchToProps)(FlowTrash);
