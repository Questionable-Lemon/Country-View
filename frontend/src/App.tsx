import "./App.css";
import PageLayout from "./UI/PageLayout.tsx";
import SideBar from "./UI/SideBar.tsx";
import USMap from "./US_components/USMap.tsx";

function App() {
  return (
    <>
      <PageLayout>
        <SideBar isOpen={false} />
        <USMap setStateClicked={() => {}} />
      </PageLayout>
    </>
  );
}

export default App;
