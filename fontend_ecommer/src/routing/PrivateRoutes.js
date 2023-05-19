import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) =>{
  const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer")).token
  : null;
 return getTokenFromLocalStorage !==null ? children : (<Navigate to="/login" replace={true}/>);
}