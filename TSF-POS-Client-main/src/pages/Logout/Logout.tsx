import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.clear();
    window.location.href = "/";
  }, []);

  return <div>Logging Out</div>;
};

export default Logout;
