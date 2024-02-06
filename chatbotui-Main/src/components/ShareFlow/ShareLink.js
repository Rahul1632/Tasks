import React, { useEffect } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { getFlowDetail } from "../FlowManger/Action";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Loader from "../reusable/Loader";

const ShareLink = (props) => {
  const { botId } = useParams();
  const [flowDetail, setFlowDetail] = useState({});
  const [loading, setloading] = useState(true);
  const getFlowDetail = () => {
    props
      ?.getFlowDetail(botId)
      .then((response) => {
        if (response && !response?.errorMessage) {
          setTimeout(() => setloading(false), 1000);
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
      {loading ? (
        <Loader />
      ) : (
        <div className="share-embed-container">
          <div className="share-link-container">
            <span>SHARE WITH A LINK</span>
            {flowDetail?.publish_token === null ? (
              <div>
                {/* <div className="share-link-notpublish"></div> */}
                <div>Bot is not Publish</div>
              </div>
            ) : (
              <InputGroup>
                <FormControl
                  type="url"
                  name="filename"
                  placeholder="Type here..."
                  disabled
                  value={`http://bril-chatbot.s3-website.ap-south-1.amazonaws.com/${flowDetail?.publish_token}/preview`}
                />
              </InputGroup>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = {
  getFlowDetail,
};

export default connect(null, mapDispatchToProps)(ShareLink);
