import db from "./FbConfig";
import { get, ref, child, remove } from "firebase/database";
import { useState, useEffect } from "react";

export default function AdminPage() {
	const [info, setInfo]=useState([]);
		
	useEffect(()=>{
	const dbref=ref(db);
	
	get(child(dbref, "feedbacks/"))
	.then((snapshot)=>{
		if(snapshot.exists() ){
			setInfo([]);
			console.log(snapshot.val());
			const data=snapshot.val()
			if (data !==null) {
			Object.values(data).map((da)=>{
				setInfo((oldArray)=>[...oldArray, da]);
			});
			}
		}
		else
		{
		console.log("No Data");	
		}
	})
},[])

	const delFb = (name) => {
		const r3=ref(db, "feedbacks/" +name )
		remove(r3)
		.then( () => {
			alert("Feedback Deleted");
			window.location.reload();
		})
		.catch( err=> console.log(err) );
	}
		
	return(
	<>
	<center>
	<h1> Home Page </h1>
	<table border="5" style={{ width:'50%' }}>
		<tr>
			<th> Name </th>
			<th> Email </th>
			<th> Feedback </th>
			<th> Rating </th>
			<th> Delete </th>
		</tr>
		{
			info.map((e=>
			<tr style={{"text-align":"center"}}>
				<td> {e.name} </td>
				<td> {e.email} </td>
				<td> {e.query} </td>
				<td> {e.fb} </td>
		<td> <button onClick= { () => {
	if (window.confirm('Are You Sure?')) delFb(e.name) }}> Delete </button></td>
			</tr>
			))
		}
	</table>
	</center>
	</>
	);
}
	