import logo from './logo.svg';
import './App.css';
import Home from "./Home";
import Create from "./Create";
import NavBar from "./NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Update from "./Update";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
		<NavBar/>
		<Routes>
			<Route path = "/" element = { <Home/> } />
			<Route path = "/Create" element = { <Create/> } />
			<Route path = "*" element = { <Home/> } />
			<Route path = "/update" element = {<Update/> } />
		</Routes>
	</BrowserRouter>
	
    </div>
  );
}

export default App;
