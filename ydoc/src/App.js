import logo from './logo.svg';
import './App.css';
import {NextUIProvider} from "@nextui-org/react";
import Login from "./components/Login/login"
import NavBar from './components/Home/navbar2';
import {Routes , Route } from "react-router-dom" 

function App() {
  return (
    <NextUIProvider>
      <div className="App"> 
        <Routes> 
            <Route path="/" element={<NavBar/> } /> 
            <Route path="/login" element={<Login/> } /> 
       </Routes> 
    </div> 
    </NextUIProvider>
  );
}

export default App;
