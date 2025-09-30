import state_data from "../assets/state_data.json";
import StateData from "./StateData.tsx";
import "./USMap.css";
import { useRef, useState } from "react";

export interface USMapProps {
  setStateClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const USMap: React.FC<USMapProps> = ({ setStateClicked }) => {
  const animationRef = useRef<number | null>(null);

  const initialViewBox = "0 0 2000 1700";
  const [viewBox, setViewBox] = useState(initialViewBox);
  const [targetViewBox, setTargetViewbox] = useState(initialViewBox);

  const animateViewBox = (target: string, duration = 1000) => {
    setTargetViewbox(target);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startTime = performance.now();
    const startViewBox = viewBox.split(" ").map(Number);
    const endViewBox = target.split(" ").map(Number);

    const stepThroughAnimation = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      let t = Math.min(1, elapsedTime / duration);
      t = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // ease in and out

      const newViewBox = startViewBox.map(
        (startingValue: number, index: number) => {
          return startingValue + t * (endViewBox[index] - startingValue); // lerp function
        },
      );

      setViewBox(newViewBox.join(" "));

      if (t < 1) {
        animationRef.current = requestAnimationFrame(stepThroughAnimation);
      } else {
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(stepThroughAnimation);
  };

  const handleZoom = (bounds: Record<string, number>) => {
    let newViewBox = `${bounds["x_min"] - (bounds["x_max"] - bounds["x_min"]) / 2} ${bounds["y_min"] - (bounds["y_max"] - bounds["y_min"]) / 2} ${(bounds["x_max"] - bounds["x_min"]) * 2} ${(bounds["y_max"] - bounds["y_min"]) * 2}`;
    if (newViewBox == targetViewBox) {
      newViewBox = initialViewBox;
      setStateClicked(false);
    } else {
      setStateClicked(true);
    }
    animateViewBox(newViewBox);
  };

  const getStateColorLogic = (stateName: string) => {
    // if majority of reps are repub, return red
    // if majority are dem return blue
    // otherwise return purple
    return { base: "#8f0000ff", hover: "#da0000ff" };
  };

  return (
    <div className="z-1 flex items-center w-full">
      <svg className="w-3000 h-[100vh] flex " viewBox={viewBox}>
        {state_data.map((state) => {
          const colors = getStateColorLogic(state.name);

          return (
            <StateData
              name={state.name}
              key={state.name}
              id={state.id}
              path={state.path}
              click={() => {
                handleZoom(state.bounds);
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
