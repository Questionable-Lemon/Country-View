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

  const animateViewBox = (target: string, duration = 800) => {
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
    }
    animateViewBox(newViewBox);
  };

  const getStateColorLogic = (stateName: string) => {
    return { base: "#8f0000ff", hover: "#da0000ff" };
  };

  return (
    <div className="relative z-10">
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
                handleZoom(state.bounds);
                setStateClicked((value) => !value);
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
