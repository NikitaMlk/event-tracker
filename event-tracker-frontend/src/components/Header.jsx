import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => (
  <header className="header">
    <nav>
      <Link to="/">Home</Link>
      <Link to="/calendar">Calendar</Link>
      <Link to="/statistics">Statistics</Link>
    </nav>
  </header>
);

export default Header;
