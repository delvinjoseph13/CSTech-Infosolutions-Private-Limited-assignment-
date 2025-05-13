import Agents from "./componets/Agents";
import DashBoard from "./componets/dashBoard";
import Login from "./componets/login";
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App(){
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        < Route path="/agents" element={<Agents/>}/>
      </Routes>
    </BrowserRouter>
    </>

  )
}

export default App;