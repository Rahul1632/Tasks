import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../reusable/Loader";
import { getFlowDetail } from "../FlowManger/Action";
import { connect } from "react-redux";

const ShareEmbed = (props) => {
  const { botId } = useParams();
  const userId = localStorage.getItem("user_id");
  const datacode = `<script type="text/javascript">
      var iframe = document.createElement("iframe");
      iframe.setAttribute("id", "ifrmlive");
      document.getElementsByTagName("BODY")[0].appendChild(iframe);
      iframe.setAttribute(
        "style",
        "height:48rem;width:30rem;position:absolute;z-Index:5;right:0;bottom:0;"
      );
      iframe.setAttribute("src", "https://jenish025.github.io/liveChat/?flowId=${botId}&userId=${userId}");
    </script>`;
  const [liveOption, setLiveOption] = useState("LIVECHAT");
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

  const handleUploadFile = (data) => {
    setLiveOption(data);
  };

  const liveOptionList = [
    {
      id: 1,
      name: "liveChat",
      type: "LIVECHAT",
    },
    {
      id: 2,
      name: "Fullpage",
      type: "FULLPAGE",
    },
    {
      id: 3,
      name: "Embed",
      type: "EMBED",
    },
    {
      id: 4,
      name: "Popup",
      type: "POPUP",
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="share-embed-container">
          <div className="share-embed-main">
            <div className="share-embed-header">
              <span>EMBED INTO YOUR WEBSITE</span>
            </div>
            {flowDetail?.publish_token === null ? (
              <div>
                {/* <div className="share-link-notpublish"></div> */}
                <div>Bot is not Publish</div>
              </div>
            ) : (
              <div>
                <div className="share-embed-body">
                  <span>
                    1. Choose how do you want your BrilBot to display:
                  </span>
                  <div className="share-embed-select">
                    {liveOptionList?.map((data) => {
                      return (
                        <div className="share-select-item" key={data?.id}>
                          <div
                            className="share-embed-select-live"
                            onClick={() => handleUploadFile(data?.type)}
                          >
                            1
                          </div>
                          <span>{data?.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="share-embed-code">
                  <span>
                    2. Copy and paste this code to create an HTML file with the
                    basics:
                  </span>

                  {liveOption === "LIVECHAT" ? (
                    <textarea
                      className="form-control embed-textarea"
                      rows="13"
                      disabled
                      value={datacode}
                    ></textarea>
                  ) : liveOption === "FULLPAGE" ? (
                    <textarea
                      className="form-control embed-textarea"
                      rows="13"
                      disabled
                      value="FULLPAGE"
                    ></textarea>
                  ) : liveOption === "EMBED" ? (
                    <textarea
                      className="form-control embed-textarea"
                      rows="13"
                      disabled
                      value="EMBED"
                    ></textarea>
                  ) : (
                    liveOption === "POPUP" && (
                      <textarea
                        className="form-control embed-textarea"
                        rows="13"
                        disabled
                        value="POPUP"
                      ></textarea>
                    )
                  )}
                </div>
                <div className="share-embed-footer"></div>
              </div>
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

export default connect(null, mapDispatchToProps)(ShareEmbed);
