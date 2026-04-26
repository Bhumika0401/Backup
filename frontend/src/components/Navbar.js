import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav style={styles.navbar}>
      
      {/* LOGO */}
      <h2 style={styles.logo}>Poll App</h2>

      {/* LINKS */}
      <div style={styles.links}>
        <Link to="/home" style={styles.link}>
          <span style={location.pathname === "/home" ? styles.active : null}>
            Home
          </span>
        </Link>

        <Link to="/create-poll" style={styles.link}>
          <span style={location.pathname === "/create-poll" ? styles.active : null}>
            Create Poll
          </span>
        </Link>

        <Link to="/create-survey" style={styles.link}>
          <span style={location.pathname === "/create-survey" ? styles.active : null}>
            Create Survey
          </span>
        </Link>
      </div>

      {/* PROFILE */}
      <div style={styles.profile}>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          style={styles.profileImg}
        />
        <span style={styles.profileName}>Bhavya</span>
      </div>

    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 28px",
    background: "rgba(15, 23, 42, 0.9)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },

  logo: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  links: {
    display: "flex",
    gap: "30px",
  },

  link: {
    textDecoration: "none",
    fontSize: "15px",
    color: "#cbd5e1",
  },

  active: {
    color: "#38bdf8",
    borderBottom: "2px solid #38bdf8",
    paddingBottom: "4px",
  },

  profile: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#1e293b",
    padding: "6px 12px",
    borderRadius: "20px",
    cursor: "pointer",
  },

  profileImg: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
  },

  profileName: {
    fontSize: "14px",
    color: "#fff",
  },
};
