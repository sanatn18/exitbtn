import db from "./FbConfig";
import { set, get, ref, child } from "firebase/database";
import { useState, useRef, useEffect } from "react";



export default function Feedback()
{
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [fb, setFb]=useState("excellent");
    const [query, setQuery]=useState("");
    const [ans, setAns]=useState("");
    const [isExitButtonClicked, setIsExitButtonClicked] = useState(false);
    
    const rName=useRef();
    const rEmail=useRef();

    const handleExitButtonClick = () => {
      setIsExitButtonClicked(true);
    };
    


    const hName=(event)=>{setName(event.target.value);}
    const hEmail=(event)=>{setEmail(event.target.value);}
    const hFb=(event)=>{setFb(event.target.value);}
    const hQuery=(event)=>{setQuery(event.target.value);}

    useEffect(() => {
      const handleWindowClose = (event) => {
        if (isExitButtonClicked) {
          return null; // Allow the user to leave
        }
    
        event.preventDefault();
        event.returnValue = 'Are You Sure?'; // Display the confirmation dialog
    
        return ''; // Chrome requires the return value to be set
      };
    
      window.addEventListener('beforeunload', handleWindowClose);
    
      return () => {
        window.removeEventListener('beforeunload', handleWindowClose);
      };
    }, [isExitButtonClicked]);
    


    const save=(event)=> {
        event.preventDefault();
        const r1=ref(db);
        get(child(r1, "feedbacks/" + email))
        .then((snapshot)=> {
        	if(snapshot.exists())
        	{
       		 alert(email+ " Error. Try Again ");
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
	if ( (email=="") || (email.trim()=="") || (! email.match(/^\w+([,-]?\w+)*@\w+([,-]?\w+)*(\,\w{2,3})+$/)) )
	{
		alert("Invalid Email");
		setEmail("");
		rEmail.current.focus();
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
            <input type="text" placeholder="Enter Email Replace . with ,"
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
	        onChange={hQuery} value={query}> </textarea>
            <br/><br/>
            <input type="submit"/>
            <br/><br/>
            <button onClick={handleExitButtonClick}>Exit</button>
          
       
            <br/><br/>
            
        </form>
        <h1> {ans} </h1>
        </center>
        
        </>
    );
}


