import { Navigate, Outlet } from "react-router-dom"
import { getUser } from "../helper/helper"
import Navbar2 from "../Receptionside/Navbar2"

export default function ReceptionRoute() {
    let auth = getUser()

    return (
        <>
            {auth && auth.status ?
            <>
                <Navbar2 />
                <Outlet />
            </> 
            : <Navigate to="/login" />}
        </>
    )
}