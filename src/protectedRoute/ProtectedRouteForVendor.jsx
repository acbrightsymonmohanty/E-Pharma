import { Navigate } from "react-router"

export const ProtectedRouteForVendor = ({children}) => {
    const user = JSON.parse(localStorage.getItem('vendor'))
    if (user?.role === "vendor") {
      return children
    }
    else {
      return <Navigate to={'/login'}/>
    }
}