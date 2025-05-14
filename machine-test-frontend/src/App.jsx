import Agents from "./componets/Agents";
import DashBoard from "./componets/dashBoard";
import Login from "./componets/login";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./componets/Register";
import Upload from "./componets/upload";

function App(){
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        < Route path="/agents" element={<Agents/>}/>
        <Route path="/upload" element={<Upload/>}/>
      </Routes>
    </BrowserRouter>
    </>

  )
}

export default App;