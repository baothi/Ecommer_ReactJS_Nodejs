import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) =>{
  const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).token
  : null;
 return getTokenFromLocalStorage ===null ? children : (<Navigate to="/admin" replace={true}/>);
}