import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Paymeeqr from "./pages/paymeeqr";
import Modification from "./pages/modification";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Paymeeqr />} />
        <Route path="/modification/:cardId" element={<Modification />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
export default App;
