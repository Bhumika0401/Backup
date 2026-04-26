// components/Navbar.js
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{display:"flex", justifyContent:"space-between", padding:"10px"}}>
      <h2>Poll App</h2>
      <div>
        <Link to="/home">Home</Link>
      </div>
    </div>
  );
}