import React from "react";

interface StateDataProps {
  id: string;
  path: string;
  click: Function;
  name: string;
}

const StateData: React.FC<StateDataProps> = ({ id, path, click, name }) => {
  return (
    <path
      id={id}
      d={path}
      onClick={() => click(name)}
      style={{ cursor: "pointer" }}
      fill="#b3b3b3ff"
      stroke="#000000ff"
      strokeWidth="2"
      fillRule="evenodd"
    />
  );
};

export default StateData;
