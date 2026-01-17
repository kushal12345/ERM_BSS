import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useContext } from "react";
import AuthContext from "../Hooks/Context/AuthContext";

const Login = ({setloginUser}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
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
    <div className="w-screen h-screen flex items-center">
      <form className="w-[30%] mx-auto">
        <div className="mb-2">
          <span className="font-bold text-xl dark:text-white">Login to Continue</span>
        </div>
        <div className="mb-2">
          <label htmlFor="uname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
          <input
            type="text"
            id="uname"
            name="uname"
            className="bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
            autoComplete="username"
            required
            onChange={handleChange}
            value={user.uname}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="***********"
            autoComplete="new-password"
            required
            onChange={handleChange}
            value={user.password}
          />
        </div>
        <div className="flex items-start mb-3">
          <div className="flex items-center h-5">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={user.remember}
              onChange={handleChange}
              className="w-4 h-4 border border-gray-800 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;
