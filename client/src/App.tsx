import { DarkThemeToggle } from "flowbite-react";
import { Routes, Route } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";
import AuthContext from "./components/Hooks/Context/AuthContext";
/* Importing elements or local jsx pages */
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { ProtectRoutes } from "./components/Hooks/Protected/Protect";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loginuser, setloginUser] = useState(null);
  const { cookies } = useContext(AuthContext);

  // Recover loginuser from cookies on reload
  useEffect(() => {
    if (cookies?.user) {
      setloginUser(cookies.user);
    }
  }, [cookies]);

  return (
   <main className="relative min-h-dvh w-full bg-gray-100 dark:bg-gray-800">
  {/* Dark mode toggle */}
  <div className="fixed right-4 top-4 z-50">
    <DarkThemeToggle />
  </div>

  {/* App Routes */}
  <div className="min-h-dvh w-full">
    <Routes>
      {/* Protected dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectRoutes>
            <Dashboard loginuser={loginuser || cookies.user} />
          </ProtectRoutes>
        }
      />

      {/* Public routes */}
      <Route path="/" element={<Login setloginUser={setloginUser} />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </div>
</main>

  );
}

export default App;
