import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import FlowManagerNavbar from "../FlowManger/FlowManagerNavbar";
import { getFlowDetail } from "../FlowManger/Action";
import { connect } from "react-redux";
import ShareFlowSideBar from "../ShareFlow/ShareFlowSideBar";
import Loader from "../reusable/Loader";

const Share = (props) => {
  const { botId } = useParams();
  const { pathname } = useLocation();
  const history = useNavigate();
  const [flowDetail, setFlowDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [publishName, setPublishName] = useState("Publish");

  const getFlowDetail = () => {
    props
      ?.getFlowDetail(botId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          setTimeout(() => setLoading(false), 1000);
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
    if (pathname === `/share/${botId}`) {
      history(`/share/${botId}/embed`);
    }
  }, []);

  return (
    <>
      <div className="main-screen">
        <FlowManagerNavbar
          id={botId}
          flowDetail={flowDetail}
          handleAlert={props?.handleAlert}
          setPublishName={setPublishName}
          publishName={publishName}
        />
        {loading ? (
          <Loader />
        ) : (
          <div className="share-layout">
            <ShareFlowSideBar flowDetail={flowDetail} />
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
};

const mapDispatchToProps = {
  getFlowDetail,
};

export default connect(null, mapDispatchToProps)(Share);
