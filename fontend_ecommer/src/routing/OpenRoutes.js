import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) =>{
  const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer")).token
  : null;
 return getTokenFromLocalStorage ===null ? children : (<Navigate to="/" replace={true}/>);
}