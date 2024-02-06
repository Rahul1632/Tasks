import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FlowManagerNavbar from "../FlowManger/FlowManagerNavbar";
import { getFlowDetail, getAllNodeList } from "../FlowManger/Action";
import { connect } from "react-redux";
import FlowAnalyze from "../FlowAnalyze/FlowAnalyze";
import Loader from "../reusable/Loader";

const Analyze = (props) => {
  const { botId } = useParams();
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
      </div>
      {loading ? <Loader /> : <FlowAnalyze handleAlert={props?.handleAlert} />}
    </>
  );
};

const mapDispatchToProps = {
  getFlowDetail,
  getAllNodeList,
};

export default connect(null, mapDispatchToProps)(Analyze);
