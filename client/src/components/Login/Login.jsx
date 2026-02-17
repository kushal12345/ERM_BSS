import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useContext } from "react";
import AuthContext from "../Hooks/Context/AuthContext";
import chest from "../assets/chest.png";

import { EyeClosed, Eye } from 'lucide-react';

const Login = ({ setloginUser }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    uname: "",
    password: "",
    remember: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setUser({
      ...user,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (user.uname && user.password) {
      api.post("/api/login", user)
        .then(res => {

          if (res.status === 200) {
            setloginUser(res.data.user);
            //localStorage.setItem("user", JSON.stringify(res.data.user));            
            //localStorage.setItem("token", res.data.token);
            login(res.data);
            navigate("/dashboard");
          } else {
            alert("Invalid Credentials");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* Left Section */}
      <div className="w-full bg-[#0100B9] md:rounded-none sm:rounded-none lg:rounded-br-[10%] flex flex-col items-center justify-center py-10 md:py-0">
        <img src={chest} className="w-24 md:w-[20%]" alt="image" />
        <h5 className="text-white text-lg md:text-xl mt-4 text-center">
          Bauddhanath Security
        </h5>
        <i className="text-white text-sm md:text-md text-center">
          "Enterprise Resource Management System"
        </i>
      </div>

      {/* Right Section */}
      <div className="w-full flex items-center justify-center px-4 py-10">

        <div className="relative w-full max-w-md bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs">
          <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-[#0100B9]/30 hidden sm:block"></div>

          <form>
            <div className="mb-2">
              <span className="font-bold text-xl">Welcome Back</span>
            </div>

            {/* Username */}
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium">Username</label>
              <input
                type="text"
                name="uname"
                className="bg-gray-50 border border-gray-800 text-sm rounded-lg w-full p-2.5"
                autoComplete="username"
                placeholder="Username"
                onChange={handleChange}
                value={user.uname}
              />
            </div>

            {/* Password */}
            <div className="mb-3 relative">
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="bg-gray-50 border border-gray-800 text-sm rounded-lg w-full p-2.5"
                autoComplete="current-password"
                placeholder="***********"
                onChange={handleChange}
                value={user.password}
              />
              {showPassword ? <EyeClosed className="absolute right-2 top-1/2" onClick={() => setShowPassword(!showPassword)} size={20} /> : <Eye className="absolute right-2 top-1/2" onClick={() => setShowPassword(!showPassword)} size={20} />}
            </div>

            {/* Remember */}
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                name="remember"
                checked={user.remember}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label className="ml-2 text-sm">Remember me</label>
            </div>

            {/* Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg px-5 py-2.5"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Login;
