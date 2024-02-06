import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import withRouter from "../WrapperComponents/withRouter";

const ShareFlowSideBar = (props) => {
  const { botId } = useParams();
  const { pathname } = useLocation();
  const [isIndex, setIsIndex] = useState(0);
  const data = [
    {
      id: 1,
      name: "Embed into your website",
      icon: "fa fa-code",
      handleClickValue: `embed`,
    },
    {
      id: 2,
      name: "Share with a link",
      icon: "fa fa-link",
      handleClickValue: `link`,
    },
  ];

  const isIndexhandle = (i) => {
    setIsIndex(i);
  };

  useEffect(() => {
    if (pathname === `/share/${botId}/link`) {
      setIsIndex(1);
    } else {
      setIsIndex(0);
    }
  }, [pathname]);

  return (
    <div className="shareflow-sidebar">
      <div className="shareflow-sidebar-headder">
        <span>Share your Bot</span>
      </div>
      <div className="shareflow-sidebar-body">
        {data?.map((item, index) => {
          return (
            <Link to={item?.handleClickValue} key={item.id}>
              <div
                key={index}
                className={`shareflow-item-list ${
                  isIndex === index ? `shareflow-item-isactive` : ""
                }`}
                onClick={() => isIndexhandle(index)}
              >
                <i className={`${item?.icon}`}></i>
                <span>{item?.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default withRouter(ShareFlowSideBar);
