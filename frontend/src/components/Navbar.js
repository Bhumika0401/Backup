import { Link, useLocation, useNavigate } from "react-router-dom";
import { API } from "../api/api";

export default function Navbar() {
  const location = useLocation();
  const nav = useNavigate();

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 20px",
      background: "#111827",
      color: "white",
      alignItems: "center"
    },
    logo: {
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "18px"
    },
    links: {
      display: "flex",
      gap: "20px"
    },
    link: {
      color: "#cbd5e1",
      textDecoration: "none"
    },
    active: {
      color: "#3b82f6",
      fontWeight: "bold"
    },
    btn: {
      background: "#1f2937",
      color: "white",
      border: "none",
      padding: "6px 10px",
      borderRadius: "6px",
      cursor: "pointer"
    },
    logout: {
      background: "#ef4444",
      color: "white",
      border: "none",
      padding: "6px 10px",
      borderRadius: "6px",
      cursor: "pointer"
    }
  };

  return (
    <nav style={styles.navbar}>
      
      <div style={styles.logo} onClick={() => nav("/home")}>
        PollHub 🚀
      </div>

      <div style={styles.links}>
        <Link to="/home" style={styles.link}>
          <span style={location.pathname === "/home" ? styles.active : null}>
            Home
          </span>
        </Link>

        <Link to="/polls" style={styles.link}>
          <span style={location.pathname === "/polls" ? styles.active : null}>
            Polls
          </span>
        </Link>

        <Link to="/surveys" style={styles.link}>
          <span style={location.pathname === "/surveys" ? styles.active : null}>
            Surveys
          </span>
        </Link>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        
        <button
          style={styles.btn}
          onClick={async () => {
            try {
              const res = await API.get("/auth/verify");
              alert(`${res.data.user.name}\n${res.data.user.email}`);
            } catch {
              alert("Not logged in");
            }
          }}
        >
          Profile
        </button>

        <button
          style={styles.logout}
          onClick={async () => {
            await API.post("/auth/logout");
            nav("/");
          }}
        >
          Logout
        </button>
      </div>

    </nav>
  );
}