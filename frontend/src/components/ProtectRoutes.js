import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../api/api";

export default function ProtectRoutes({ children }) {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await API.get("/auth/verify");
        setAuth(!!res.data.user);
      } catch (err) {
        setAuth(false);
      }
      setLoading(false);
    };

    check();
  }, []);

  // useEffect(() => {
  //   if (!loading && !auth) {
  //     nav("/home"); // redirect to login
  //   }
  // }, [loading, auth, nav]);

  if (loading) return <h3>Loading...</h3>;

 return auth ? children : <Navigate to="/login" />;
}