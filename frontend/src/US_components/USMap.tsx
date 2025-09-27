import state_data from "../assets/state_data.json";
import StateData from "../US_components/State.tsx";

const handleStateClick = (stateName: string) => {
  console.log(stateName);
};

const USMap = () => {
  return (
    <svg width="5500" height="3000" viewBox="0 0 2000 2000">
      {state_data.map((state) => {
        return (
          <StateData
            name={state.name}
            key={state.name}
            id={state.id}
            path={state.path}
            click={handleStateClick}
          />
        );
      })}
    </svg>
  );
};

export default USMap;
