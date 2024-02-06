import React from "react";
import { Button } from "react-bootstrap";

const DashboardNavbar = (props) => {
  const { handelSearchData, handleOpenNewbot, addButton, heading } = props;
  return (
    <>
      <div className="dashboard-navbar">
        <div className="dashboard-navbar-logo ml-1">
          <span>{heading}</span>
        </div>
        <div className="dashboard-bot-search-add ">
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
          {addButton && (
            <Button onClick={handleOpenNewbot} className="btn-bot ml-1">
              ADD NEW BOT
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
