import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getFlowListData,
  getWorkSpaceList,
  getWokpsaceFlowList,
} from "./Action";
import withRouter from "../WrapperComponents/withRouter";
import Loader from "../reusable/Loader";
import DashbordSideBar from "./DashbordSideBar";
import DashboardList from "./DashboardList";
import { useParams } from "react-router-dom";
import FlowTrash from "./FlowTrash";

const Dashboard = (props) => {
  const { name } = useParams() || "";
  const { id } = useParams() || 0;
  const userId = localStorage.getItem("user_id");
  const [flowListData, setFlowListData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workSpaceList, setWorksSpaceList] = useState([]);
  const [listLoader, setListLoader] = useState(false);
  const [heading, setHeading] = useState(name);

  const getFlowListData = () => {
    setListLoader(true);
    props
      ?.getFlowListData(userId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          setFlowListData(response?.flows);
          setSearchData(response?.flows);
          setLoading(false);
          setTimeout(() => setListLoader(false));
        } else {
          props?.handleAlert(
            response?.errorMessage || response?.error || "Something went wrong",
            "error"
          );
          setFlowListData([]);
          setSearchData([]);
          setLoading(false);
          setTimeout(() => setListLoader(false));
        }
      })
      .catch((error) => {
        props?.handleAlert(error?.message || "Something went wrong", "error");
        setFlowListData([]);
        setSearchData([]);
        setLoading(false);
        setTimeout(() => setListLoader(false));
      });
  };

  const getWokpsaceFlowList = () => {
    setListLoader(true);
    props
      ?.getWokpsaceFlowList(id, userId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          setFlowListData(response?.flows);
          setSearchData(response?.flows);
          setLoading(false);
          setTimeout(() => setListLoader(false));
        } else {
          props?.handleAlert(
            response?.errorMessage || response?.error || "Something went wrong",
            "error"
          );
          setFlowListData([]);
          setSearchData([]);
          setLoading(false);
          setTimeout(() => setListLoader(false));
        }
      })
      .catch((error) => {
        props?.handleAlert(error?.message || "Something went wrong", "error");
        setFlowListData([]);
        setSearchData([]);
        setLoading(false);
        setTimeout(() => setListLoader(false));
      });
  };

  const getWorkSpaceList = () => {
    setLoading(true);
    props
      ?.getWorkSpaceList(userId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          setWorksSpaceList(response?.workspace);
          const navBarHeading = response?.workspace?.filter(
            (data) => data?.id === parseInt(id)
          );
          setHeading(navBarHeading[0]?.name);
          setLoading(false);
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

  const getData = () => {
    if (id) {
      getWokpsaceFlowList();
    } else {
      getFlowListData();
    }
  };

  useEffect(() => {
    getWorkSpaceList();
  }, []);

  useEffect(() => {
    if (name !== "trash") {
      getData();
    }
    const navBarHeading = workSpaceList?.filter(
      (data) => data?.id === parseInt(id)
    );
    setHeading(navBarHeading[0]?.name);
  }, [id, name]);

  return (
    <div className="d-flex h-100">
      {loading ? (
        <Loader />
      ) : (
        <>
          <DashbordSideBar
            id={id}
            name={name}
            getWorkSpaceList={getWorkSpaceList}
            getFlowListData={getFlowListData}
            workSpaceList={workSpaceList}
            handleAlert={props?.handleAlert}
          />
          <div className="dashbord-main">
            {name === "trash" ? (
              <FlowTrash handleAlert={props?.handleAlert} />
            ) : (
              <DashboardList
                listLoader={listLoader}
                heading={heading}
                id={id}
                getWorkSpaceList={getWorkSpaceList}
                workSpaceList={workSpaceList}
                getFlowListData={getData}
                flowListData={flowListData}
                setFlowListData={setFlowListData}
                searchData={searchData}
                setSearchData={setSearchData}
                handleAlert={props?.handleAlert}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  getFlowListData,
  getWokpsaceFlowList,
  getWorkSpaceList,
};

export default connect(null, mapDispatchToProps)(withRouter(Dashboard));
