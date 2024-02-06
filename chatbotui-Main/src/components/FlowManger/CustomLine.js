import React from "react";

const CustomLine =
  () =>
  ({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    connectionLineType,
    connectionLineStyle,
  }) => {
    return (
      <g>
        <path
          fill="none"
          stroke="rgb(121, 213, 148)"
          strokeWidth={1.5}
          className="animated"  
          d={`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`}
        />
        <circle
          cx={targetX}
          cy={targetY}
          fill="#fff"
          r={3}
          stroke="rgb(121, 213, 148)"
          strokeWidth={1.5}
        />
      </g>
    );
  };

export default CustomLine;
