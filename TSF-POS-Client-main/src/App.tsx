// importing core functions from packages
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// importing from custom made
import routes from "./routes";
import "./App.css";
import "./modern-ui.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBranchList } from "./redux/actions/branches/branchesAction";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

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
    </Router>
  );
}

export default App;