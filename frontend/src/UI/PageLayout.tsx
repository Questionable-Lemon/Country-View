import React from "react";
import SlidingPanel, { type SliderProps } from "react-sliding-side-panel";
import USMap, { type USMapProps } from "../US_components/USMap";
import { useState } from "react";

interface PageLayoutProps {
  children: React.ReactNode[];
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isStateClicked, setStateClicked] = useState(false);

  return (
    <div className="pageLayout">
      <main>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return child;
          }

          const elementA = child as React.ReactElement<SliderProps>;
          if (child.type === SlidingPanel) {
            return React.cloneElement(elementA, {
              type: "left",
              isOpen: isStateClicked,
              size: 30,
            });
          }
          const elementB = child as React.ReactElement<USMapProps>;
          if (child.type === USMap) {
            return React.cloneElement(elementB, {
              setStateClicked: setStateClicked,
            });
          }
          return child;
        })}
      </main>
    </div>
  );
};

export default PageLayout;
