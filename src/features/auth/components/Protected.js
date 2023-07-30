import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice";

function Protected({chilren}) {
  const user = useSelector(selectLoggedInUser);
    if (!user) {
        return <Navigate to='/login' replace={true}></Navigate>
    }
    return chilren;
}

export default Protected;