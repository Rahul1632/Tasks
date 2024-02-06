import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { size } from "lodash";
import { connect } from "react-redux";
import { getFlowListData } from "../Dashboard/Action";
import IMG from "../../Images/brilworks-logo.png";

const FlowListpopUp = (props) => {
  const { openModal, updateData } = props;
  const userId = localStorage.getItem("user_id");
  const [flowList, setFlowList] = useState([]);
  const [searchFlow, setSearchFlow] = useState([]);

  const getFlowListData = () => {
    props
      ?.getFlowListData(userId)
      .then((response) => {
        if (response && !response?.errorMessage && !response?.error) {
          setFlowList(response?.flows);
          setSearchFlow(response?.flows);
        } else {
          props?.handleAlert(
            response?.errorMessage || response?.error || "Something went wrong",
            "error"
          );
          setSearchFlow([]);
        }
      })
      .catch((error) => {
        props?.handleAlert(error?.message || "Something went wrong", "error");
        setSearchFlow([]);
      });
  };

  const handelSearchData = (e) => {
    const { value } = e?.target || "";
    const data = flowList?.filter((data) =>
      data?.name?.toLowerCase()?.includes(value.toLowerCase())
    );
    setSearchFlow(data);
  };

  const selectJumpFlow = (jumpId, name) => {
    let data = { ...updateData };
    data.data.nodeData[0].jumpId = jumpId;
    data.data.nodeData[0].name = name;
    props?.setUpdateData(data);
    props?.setFlowListOpen(false);
    props?.setFlowName(name);
  };

  useEffect(() => {
    getFlowListData();
  }, []);

  useEffect(() => {
    props?.setUpdateData(props?.data);
  }, [props?.data]);

  return (
    <Modal
      className="workspace-list-modal"
      show={openModal}
      onHide={() => props?.closeModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Selecte Bot</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="search-container">
          <input
            onChange={handelSearchData}
            type="text"
            name="search"
            className="form-control"
            placeholder="Search..."
          />
          <i className={`fa fa-search`} />
        </div>
        <div className="flowlist-pop-main-body">
          {size(searchFlow) ? (
            searchFlow?.map((data, index) => {
              return (
                <div
                  className="flowlist-pop-main"
                  key={index}
                  onClick={() => selectJumpFlow(data?.flow_id, data?.name)}
                >
                  <img src={IMG} alt="brillogo" />
                  <span className="ml-1">{data?.name}</span>
                </div>
              );
            })
          ) : (
            <div className="list-group-item text-center p-3">
              <h5>No bot list found!</h5>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapDispatchToProps = {
  getFlowListData,
};

export default connect(null, mapDispatchToProps)(FlowListpopUp);
