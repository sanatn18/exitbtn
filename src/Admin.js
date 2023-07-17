import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import app from "./FbConfig";
import AdminPage from "./AdminPage";

export default function Login() {

	const login=localStorage.getItem("login")

	const navigate = useNavigate();

	useEffect( () => {
		let un=localStorage.getItem("un");
		if (un != null)
		{
			nav("/admin");
			setUn("");
			setPw1("");
		}
	},[]);


	const nav= useNavigate();
	const [un, setUn]=useState("");
	const [pw1, setPw1]=useState("");
	
	const hUn=(event)=>{setUn(event.target.value);}
	const hPw1=(event)=>{setPw1(event.target.value);}	

	const check =(event)=> {
		event.preventDefault();
		const auth=getAuth();
		signInWithEmailAndPassword(auth, un, pw1)
		.then(res=> {
			localStorage.setItem("un", un);
			alert("Admin Login Successful");
			
			
			localStorage.setItem("login", "true");
		
			
		})
		.catch(err=>alert("issue " + err) );
	};
		
	if(login==="true"){
		return(
			<AdminPage/>
		)
	}
	else{
		return(
			<>
			<center>
			
			<h1> Login Page </h1>
			<form onSubmit={check}>
			<input type="text" placeholder="Enter Email"
			onChange={hUn} value={un} />
			<br/><br/>
			<input type="password" placeholder="Enter Password"
			onChange={hPw1} value={pw1} />
			<br/><br/>
			<input type="submit" value="Login" />
			<br/><br/>
		
			</form>
			</center>
			</>
			);
	}
}


