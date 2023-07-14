import { Link } from "react-router-dom";
	
export default function NavBar() {
	return(
	<>
	<center>
	<div className="nav">
		<Link to="/admin"> Admin </Link>
		<Link to="/feedback"> Feedback </Link>
		<Link to="/adminpage"> AdminPage </Link>
	</div>
	</center>
	</>
	);
}