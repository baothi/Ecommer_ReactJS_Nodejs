import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) =>{
  const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).token
  : null;
 return getTokenFromLocalStorage !==null ? children : (<Navigate to="/" replace={true}/>);
}