import state_data from "../assets/state_data.json";
import StateData from "./StateData.tsx";
import "./USMap.css";
import { useState } from "react";

const getStateColorLogic = (stateName: string) => {
  return { base: "#8f0000ff", hover: "#da0000ff" };
};

const handleZoom = (
  bounds: Record<string, number>,
  setViewBox: React.Dispatch<React.SetStateAction<string>>,
) => {
  let newViewBox = `${bounds["x_max"]} ${bounds["y_max"]} ${(bounds["x_max"] + bounds["x_min"]) / 2} ${(bounds["y_max"] + bounds["y_min"]) / 2}`;
  setViewBox(newViewBox);
};

export interface USMapProps {
  setStateClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const USMap: React.FC<USMapProps> = ({ setStateClicked }) => {
  const [viewBox, setViewBox] = useState("0 0 2000 1700");

  return (
    <div>
      <svg width="4000" height="2600" viewBox={viewBox}>
        {state_data.map((state) => {
          const colors = getStateColorLogic(state.name);

          return (
            <StateData
              name={state.name}
              key={state.name}
              id={state.id}
              path={state.path}
              click={() => {
                handleZoom(state.bounds, setViewBox);
                setStateClicked(true);
              }}
              style={{
                fill: colors.base,
                "--hover-fill": colors.hover,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default USMap;
