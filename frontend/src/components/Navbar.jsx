
import { Link } from "react-router-dom";
import "./navbar.css";
// import your custom logo
import logo from "../assets/logoblack.png";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <div>
          <img
            src={logo}          
            alt="Logo"
          />
          <h3>GitHub</h3>
        </div>
      </Link>
      <div>
        <Link to="/create">
          <p>Create a Repository</p>
        </Link>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
