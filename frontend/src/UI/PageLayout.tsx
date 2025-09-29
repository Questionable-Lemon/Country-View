import React from "react";
import USMap, { type USMapProps } from "../US_components/USMap";
import { useState } from "react";

interface PageLayoutProps {
  children: React.ReactNode;
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
