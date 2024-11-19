import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import UpdateUser from "./pages/UpdateUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="max-w-5xl mx-auto flex justify-center py-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/edit/:id" element={<UpdateUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
