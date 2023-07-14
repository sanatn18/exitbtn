import logo from './logo.svg';
import './App.css';
import Admin from "./Admin";
import AdminPage from "./AdminPage";
import Feedback from "./Feedback";
import NavBar from "./NavBar";
import {BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
	<NavBar/>
	<Routes>
		<Route path= "/" element={<Feedback/>}/>
		<Route path="/admin" element={<Admin/> }/>
		<Route path="/adminpage" element={<AdminPage/> }/>
		<Route path="*" element={<Feedback/>}/>
	</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;