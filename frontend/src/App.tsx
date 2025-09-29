import "./App.css";
import PageLayout from "./UI/PageLayout.tsx";
import USMap from "./US_components/USMap.tsx";

function App() {
  return (
    <>
      <PageLayout>
        <USMap setStateClicked={() => {}} />
      </PageLayout>
    </>
  );
}

export default App;
