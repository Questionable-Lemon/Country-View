import "./App.css";
import PageLayout from "./UI/PageLayout.tsx";
import SlidingPanel from "react-sliding-side-panel";
import USMap from "./US_components/USMap.tsx";

function App() {
  return (
    <>
      <PageLayout>
        <SlidingPanel type="left" isOpen={false} size={30} children={null} />
        <USMap setStateClicked={() => {}} />
      </PageLayout>
    </>
  );
}

export default App;
