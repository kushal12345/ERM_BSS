import { useState,useEffect } from "react";
import AuthContext from "./AuthContext";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({children}) => {
    const [cookies,setCookies,removeCookie] = useCookies();
    const Navigate = useNavigate();

    const login = (user) => {
        setCookies("user",user.user,{path:"/dashboard"});
        setCookies("token",user.token,{path:"/dashboard"});
    }

    const logout = () => {
        removeCookie("user",{path:"/dashboard"});
        removeCookie("token",{path:"/dashboard"});
        Navigate("/");
    }





    return (
        <AuthContext.Provider value={{
           login,
           logout,
           cookies
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;