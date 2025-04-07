import { DarkThemeToggle } from "flowbite-react";
import { Routes, Route } from 'react-router-dom';
import { useState, useContext } from "react";
import AuthContext from "./components/Hooks/Context/AuthContext";
/* Importing elements or local jsx pages */
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { ProtectRoutes } from "./components/Hooks/Protected/Protect";
import Managestaff from "./components/Content/Staff/Managestaff";

function App() {
  const [loginuser, setloginUser ] = useState(null);
  const { cookies } = useContext(AuthContext);

  return (
    <main className="flex flex-col h-dvh w-screen overflow-hidden items-center justify-center gap-2 dark:bg-gray-800">
      <div className="flex-grow w-full overflow-hidden"> {/* Added this div to contain the routes */}
        <Routes>
          {loginuser && 
            <Route path='/Dashboard' element={<ProtectRoutes><Dashboard loginuser={loginuser} /></ProtectRoutes>} />
          }
          <Route path='/' element={<Login setloginUser ={setloginUser } />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
      <div className="absolute top-8 right-4 z-50">
        <DarkThemeToggle />
      </div>
    </main>
  );
}

export default App;