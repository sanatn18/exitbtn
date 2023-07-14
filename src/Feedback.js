import db from "./FbConfig";
import { set, get, ref, child } from "firebase/database";
import { useState, useRef } from "react";

export default function Feedback()
{
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [fb, setFb]=useState("excellent");
    const [query, setQuery]=useState("");
    const [ans, setAns]=useState("");

    const rName=useRef();
    const rEmail=useRef();
    const rQuery=useRef();

    const hName=(event)=>{setName(event.target.value);}
    const hEmail=(event)=>{setEmail(event.target.value);}
    const hFb=(event)=>{setFb(event.target.value);}
    const hQuery=(event)=>{setQuery(event.target.value);}

    const save=(event)=> {
        event.preventDefault();
        const r1=ref(db);
        get(child(r1, "feedbacks/" + email))
        .then((snapshot)=> {
        	if(snapshot.exists())
        	{
       		 alert(name+ " already exists ");
        		 setName("");
        		 setEmail("");
        	}
	if ( (name=="") || (name.trim()=="") || (name.trim().length <2) || (! name.match(/^[A-Za-z ]+$/) ) )
	{
		alert("Invalid Name");
		setName("");
		rName.current.focus();
		return;
	}
	if ( (query=="") || (query.trim().length <2) || (query.isNotAlpha) )
	{
		alert("Invalid Feedback");
		setQuery("");
		rQuery.current.focus();
		return;
	}
        	else
        	{
        		let data={name, email, fb, query};
        		const r2=ref(db, "feedbacks/" +name);
        		set(r2, data);
        		alert("Feedback Submitted");
        		setName("");
        		setEmail("");
        		setFb("");
        		setQuery("");
        	}
        })
        .catch(err=> console.log(err));
        }

        return(
        <>
        <center>
        <h1>Feedback Application</h1>
        <form onSubmit={save}>
            <input type="text" placeholder="Enter Name"
            onChange={hName} value={name} ref={rName}/>
            <br/><br/>
            <input type="text" placeholder="Enter Email Without Dot (.)"
            onChange={hEmail} value={email} ref={rEmail}/>
            <br/><br/>
            <h2>Please Rate Us On A 1-5 Scale & Give Your Valuable Feedback</h2>
            <input type="radio" name="f" value="⭐"
            onChange={hFb} checked={fb=="⭐"} />⭐
            <input type="radio" name="f" value="⭐⭐"
            onChange={hFb} checked={fb=="⭐⭐"} />⭐⭐
            <input type="radio" name="f" value="⭐⭐⭐"
            onChange={hFb} checked={fb=="⭐⭐⭐"} />⭐⭐⭐
            <input type="radio" name="f" value="⭐⭐⭐⭐"
            onChange={hFb} checked={fb=="⭐⭐⭐⭐"} />⭐⭐⭐⭐
            <input type="radio" name="f" value="⭐⭐⭐⭐⭐"
            onChange={hFb} checked={fb=="⭐⭐⭐⭐⭐"} />⭐⭐⭐⭐⭐
            <br/><br/>
            <textarea placeholder="Enter Feedback" rows={3} cols={30}
	        onChange={hQuery} value={query}> ref={rQuery}</textarea>
            <br/><br/>
            <input type="submit"/>
            <br/><br/>
        </form>
        <h1> {ans} </h1>
        </center>
        </>
    );
}


