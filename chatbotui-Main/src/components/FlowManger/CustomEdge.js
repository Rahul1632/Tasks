import React from "react";
import {
  getBezierPath,
  getEdgeCenter,
  getSmoothStepPath,
} from "react-flow-renderer";
import { connect } from "react-redux";
import { deleteEdge, getAllNodeList } from "./Action";
import { Badge } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

const CustomEdge = (props) => {
  const foreignObjectSize = 30;
  const foreignObjectPer = 60;
  const foreignObjectUser = 120;
  const { pathname } = useLocation();
  const { botId } = useParams();
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    data,
    sourcePosition,
    targetPosition,
    style = { stroke: "rgb(121, 213, 148)" },
    markerEnd,
  } = props;

  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
    props?.deleteEdge(id, botId).then((response) => {
      props?.getAllNodeList(botId);
    });
  };

  return (
    <>
      {pathname === `/analyze/${botId}` ? (
        <>
          <path
            id={id}
            style={style}
            className="react-flow__edge-path react-flow-pathedge"
            d={edgePath}
            markerEnd={markerEnd}
          />
          <foreignObject
            width={50}
            height={30}
            x={edgeCenterX - foreignObjectPer / 2}
            y={edgeCenterY - foreignObjectPer / 2}
            className="user-count-percentage"
            requiredExtensions="http://www.w3.org/1999/xhtml"
          >
            <div
              className="analyze-show-percentage"
              style={{ "--background-color": `${data?.color}` }}
            >
              <textpath
                href={`#${id}`}
                style={{ fontSize: "11px" }}
                startOffset="50%"
                textAnchor="middle"
              >
                {data?.percentage || `0%`}
              </textpath>
            </div>
          </foreignObject>
          <foreignObject
            width={50}
            height={30}
            x={edgeCenterX - foreignObjectUser / 1.7}
            y={edgeCenterY - foreignObjectUser / 8}
            className="analyze-user-count"
            requiredExtensions="http://www.w3.org/1999/xhtml"
          >
            <div className="user-count-analyze" bg="rgb(121, 213, 148)">
              <textpath href={`#${id}`} startOffset="50%" textAnchor="middle">
                {data?.n || `0`} users took this path
              </textpath>
            </div>
          </foreignObject>
        </>
      ) : (
        <>
          <path
            id={id}
            style={style}
            className="react-flow__edge-path"
            d={edgePath}
            markerEnd={markerEnd}
          />
          <foreignObject
            width={50}
            height={30}
            x={edgeCenterX - foreignObjectSize / 2}
            y={edgeCenterY - foreignObjectSize / 2}
            className="edgebutton-foreignobject"
            requiredExtensions="http://www.w3.org/1999/xhtml"
          >
            <Badge
              className="edgebutton"
              bg="rgb(121, 213, 148)"
              onClick={(event) => onEdgeClick(event, id)}
            >
              <i className="fa fa-trash"></i>
            </Badge>
          </foreignObject>
        </>
      )}
    </>
  );
};

const mapDispatchToProps = {
  deleteEdge,
  getAllNodeList,
};
export default connect(null, mapDispatchToProps)(CustomEdge);
