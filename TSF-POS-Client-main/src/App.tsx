// importing core functions from packages
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

// importing from custom made
import routes from "./routes";
import "./App.css";
import "./modern-ui.css";
import { useDispatch } from "react-redux";
import { getBranchList } from "./redux/actions/branches/branchesAction";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import MobileNavigation from "./components/MobileNavigation/MobileNavigation";

function App() {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    // Check on initial load
    checkIsMobile();

    // Check on window resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup listener
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    dispatch(getBranchList());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          return (
            <Route
              path={route.path}
              element={
                route.secured ? (
                  <ProtectedRoute>
                    <route.component />
                  </ProtectedRoute>
                ) : (
                  <route.component />
                )
              }
              key={route.path}
            />
          );
        })}
      </Routes>
      {isMobile && <MobileNavigation />}
    </Router>
  );
}

export default App;