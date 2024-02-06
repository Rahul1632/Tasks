import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddWorkSpaceModal from "./AddWorkSpaceModal";
import { connect } from "react-redux";
import { addWorkSpace, renameWorkSpace, deleteWorkSpace } from "./Action";
import DeleteModal from "../reusable/DeleteModal";
import { trim } from "lodash";
import withRouter from "../WrapperComponents/withRouter";

const DashbordSideBar = (props) => {
  const { workSpaceList } = props;
  const userId = localStorage.getItem("user_id");
  const [workSpaceopen, setWorkSpaceopen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(-1);
  const [data, setData] = useState({});
  const [workSpaceData, setWorkSpaceData] = useState({
    user_id: userId,
    name: "",
  });
  const [tempWorkspaceName, setTempWorkspaceName] = useState("");

  const hideMore = useRef("");

  const handleChangeData = (e) => {
    const { value } = e?.target;
    setWorkSpaceData({ ...workSpaceData, name: value });
  };

  const handleAddWorkSpace = () => {
    setWorkSpaceopen(false);
    setWorkSpaceData({ user_id: userId, name: "" });
  };

  const handleOpenMore = (id) => {
    setShowMore(id);
  };

  const handleKeyDown = (e) => {
    if (hideMore.current && !hideMore.current.contains(e?.target)) {
      setShowMore(-1);
    }
  };

  const Validation = () => {
    const { name } = workSpaceData;
    const newName = workSpaceList?.filter((data) => data?.name === name.trim());
    if (tempWorkspaceName === name) {
      setWorkSpaceopen(false);
      return false;
    } else if (name.trim() === newName[0]?.name?.trim()) {
      props?.handleAlert("Name is already exists ", "error");
      return false;
    } else if (trim(name) === "") {
      props?.handleAlert("Please enter name", "error");
      return false;
    }
    return true;
  };

  const handleWorksSpace = (e) => {
    e.preventDefault();
    const validate = Validation();
    if (validate) {
      if (workSpaceData?.id) {
        // if (tempWorkspaceName !== workSpaceData?.name) {
        props
          ?.renameWorkSpace({
            ...workSpaceData,
            name: workSpaceData?.name?.trim(),
          })
          .then((response) => {
            if (response && !response?.errorMessage) {
              props?.handleAlert("Workspace renamed", "success");
              props?.getWorkSpaceList();
              setWorkSpaceopen(false);
              setWorkSpaceData({
                user_id: userId,
                name: "",
              });
            } else {
              props?.handleAlert(
                response?.errorMessage || "Something went wrong",
                "error"
              );
              setWorkSpaceopen(false);
              setWorkSpaceData({
                user_id: userId,
                name: "",
              });
            }
          })
          .catch((error) => {
            props?.handleAlert(
              error?.message || "Something went wrong",
              "error"
            );
            setWorkSpaceopen(false);
            setWorkSpaceData({
              user_id: userId,
              name: "",
            });
          });
        // } else {
        //   // setWorkSpaceopen(false);
        // }
      } else {
        props
          ?.addWorkSpace({
            ...workSpaceData,
            name: workSpaceData?.name?.trim(),
          })
          .then((response) => {
            if (response && !response?.errorMessage) {
              props?.handleAlert("WorkSpace Created", "success");
              props?.getWorkSpaceList();
              setWorkSpaceopen(false);
              setWorkSpaceData({
                user_id: userId,
                name: "",
              });
            } else {
              props?.handleAlert(
                response?.errorMessage || "Something went wrong",
                "error"
              );
              // setWorkSpaceopen(false);
              setWorkSpaceData({
                user_id: userId,
                name: "",
              });
            }
          })
          .catch((error) => {
            props?.handleAlert(
              error?.message || "Something went wrong",
              "error"
            );
            setWorkSpaceopen(false);
            setWorkSpaceData({
              user_id: userId,
              name: "",
            });
          });
      }
    }
  };

  const handleUpdateWorkSpaceName = (data) => {
    setWorkSpaceData({ ...workSpaceData, name: data?.name, id: data?.id });
    setWorkSpaceopen(true);
    setShowMore(-1);
    setTempWorkspaceName(data?.name);
  };

  const handleDeleteWorkSpace = () => {
    props
      ?.deleteWorkSpace(data?.id, userId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          props?.handleAlert("Workspace Deleted", "success");
          props?.getWorkSpaceList();
          props?.getFlowListData();
          setIsOpen(false);
          if (parseInt(props?.id) === data?.id) {
            props?.history("/dashboard");
          }
        } else {
          props?.handleAlert(
            response?.errorMessage || "Something went wrong",
            "error"
          );
          setIsOpen(false);
        }
      })
      .catch((error) => {
        props?.handleAlert(error?.message || "Something went wrong", "error");
        setIsOpen(false);
      });
  };

  const handleDeleteModal = (data) => {
    setData(data);
    setShowMore(-1);
    setIsOpen(true);
  };

  useEffect(() => {
    document.body.addEventListener("mousedown", handleKeyDown);
    return () => {
      document.body.removeEventListener("mousedown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="sidebar-section menu-open">
        <div className="dashbord-sidebar">
          <div className="dashbord-workspace">
            <Link
              to={`/dashboard`}
              className={`workspace-main-name ${
                props?.id === undefined && props?.name === undefined
                  ? "workspace-active"
                  : ""
              }`}
            >
              <span>WORKSPACES</span>
            </Link>
            <div className="dashbord-works-list">
              {workSpaceList?.map((data, index) => {
                return (
                  <div key={index} className="position-relative">
                    <div
                      className={`dashbord-workspace-file ${
                        data.id === parseInt(props?.id)
                          ? "workspace-active"
                          : ""
                      }`}
                    >
                      <Link to={`/dashboard/workspace/${data?.id}`}>
                        <i className="fa-solid fa fa-folder"></i>
                        <span>{data?.name}</span>
                      </Link>
                      <i
                        className="fa fa-ellipsis-h"
                        onClick={() => handleOpenMore(data.id)}
                      ></i>
                    </div>
                    {showMore === data?.id && (
                      <div className="workspace-show-more" ref={hideMore}>
                        <li
                          className="showmore-list-group-item"
                          onClick={() => handleUpdateWorkSpaceName(data)}
                        >
                          <i className="fa fa-pencil-square-o"></i>
                          <span>Rename</span>
                        </li>
                        <li
                          className="showmore-list-group-item"
                          onClick={() => handleDeleteModal(data)}
                        >
                          <i className="fa fa-trash"></i>

                          <span>Delete</span>
                        </li>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div
              className={`dashboard-trash ${
                props?.name === "trash" ? "workspace-active" : ""
              }`}
            >
              <Link to={`/dashboard/trash`}>
                <i className="fa fa-trash"></i>
                <span>Trash</span>
              </Link>
            </div>
            <Button className="btn-bot" onClick={() => setWorkSpaceopen(true)}>
              Add Workspace
            </Button>
          </div>
          <div className="dashbord-team-member"></div>
        </div>
      </div>
      <AddWorkSpaceModal
        data={workSpaceData}
        handleChangeData={handleChangeData}
        openModal={workSpaceopen}
        handleOpenModal={handleAddWorkSpace}
        handleSubmitData={handleWorksSpace}
      />
      <DeleteModal
        isOpenDelete={isOpen}
        setIsOpenDelete={setIsOpen}
        modalName={data?.name}
        deleteDataById={handleDeleteWorkSpace}
      />
    </>
  );
};

const mapDispatchToProps = {
  addWorkSpace,
  renameWorkSpace,
  deleteWorkSpace,
};

export default connect(null, mapDispatchToProps)(withRouter(DashbordSideBar));
