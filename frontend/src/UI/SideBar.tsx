export interface SideBarProps {
  isOpen: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen }) => {
  console.log(isOpen);
  let transitionState = "transform translate-x-0";
  if (!isOpen) {
    transitionState = "transform -translate-x-350";
  }
  const baseClasses =
    "absolute ring-40 z-1 h-[100vh] align-center w-350 rounded bg-zinc-800/90 ring-zinc-900 flex-none transition-all duration-1000 ease-in-out";

  return <div className={`${baseClasses} ${transitionState}`}></div>;
};

export default SideBar;
