import state_data from "../assets/state_data.json";
import StateData from "./StateData.tsx";
import "./USMap.css";

const handleStateClick = (stateName: string) => {
  console.log(stateName);
};

const getColorLogic = (stateName: string) => {
  return { base: "#a70000ff", hover: "#da0000ff" };
};

const USMap = () => {
  return (
    <svg
      className="stateMapContainer"
      width="5000"
      height="2600"
      viewBox="0 0 2000 1700"
    >
      {state_data.map((state) => {
        const colors = getColorLogic(state.name);

        return (
          <StateData
            name={state.name}
            key={state.name}
            id={state.id}
            path={state.path}
            click={handleStateClick}
            style={{
              fill: colors.base,
              "--hover-fill": colors.hover,
            }}
          />
        );
      })}
    </svg>
  );
};

export default USMap;
