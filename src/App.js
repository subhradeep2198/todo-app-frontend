import DefaultLayout from "./layouts/DefaultLayout"
import HeroSection from "./components/HeroSection";
import ViewTasks from "./components/ViewTasks";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="">
      <DefaultLayout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/tasks" element={<ViewTasks />} />
          </Routes>
        </BrowserRouter>
      </DefaultLayout>
    </div>
  );
}

export default App;
