import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Mint from "./Pages/Mint";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mint />} />
      </Routes>
    </Router>
  );
}

export default App;