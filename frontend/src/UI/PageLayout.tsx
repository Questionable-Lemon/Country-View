import React from "react";
import USMap, { type USMapProps } from "../US_components/USMap";
import SideBar, { type SideBarProps } from "./SideBar";
import { useState } from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isStateClicked, setStateClicked] = useState(false);

  return (
    <div className="pageLayout z-0 w-[100vw] bg-[url(../assets/bg-stars.png)]">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        const elementA = child as React.ReactElement<SideBarProps>;
        if (child.type === SideBar) {
          return React.cloneElement(elementA, {
            isOpen: isStateClicked,
          });
        }

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
    </div>
  );
};

export default PageLayout;
