import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const ShowMoreAction = (props) => {
  const { data } = props;
  const { id } = useParams();
  const hideMore = useRef();

  const handleKeyDown = (e) => {
    if (hideMore.current && !hideMore.current.contains(e?.target)) {
      props?.setShowMoreAt(-1);
    }
  };

  useEffect(() => {
    document.body.addEventListener("mousedown", handleKeyDown);
    return () => {
      document.body.removeEventListener("mousedown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div
        className="show-more-main"
        onClick={(e) => e.stopPropagation()}
        ref={hideMore}
      >
        <li
          className="showmore-list-group-item"
          onClick={() => props?.handleOpenFlow(data?.flow_id)}
        >
          <i className="fa fa-external-link-alt"></i>
          <span>Open Bot</span>
        </li>
        {id && (
          <li
            className="showmore-list-group-item"
            onClick={() => props?.handleRemoveFromWorkSpace(data?.flow_id)}
          >
            <i className="fa fa-share"></i>
            <span>Remove from workspace</span>
          </li>
        )}
        <li
          className="showmore-list-group-item"
          onClick={() => props?.handleMoveTo(data)}
        >
          <i className="fa fa-reply-all"></i>
          <span>Move to</span>
        </li>
        <li
          className="showmore-list-group-item"
          onClick={() => props?.handleUpdateName(data)}
        >
          <i className="fa fa-pencil-square-o"></i>
          <span>Rename</span>
        </li>
        <li
          className="showmore-list-group-item"
          onClick={() => props?.handleDeleteFlow(data)}
        >
          <i className="fa fa-trash"></i>
          <span>Delete</span>
        </li>
      </div>
    </>
  );
};

export default ShowMoreAction;
