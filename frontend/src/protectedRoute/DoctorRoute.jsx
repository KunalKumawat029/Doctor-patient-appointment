import { Navigate, Outlet } from "react-router-dom"
import { getUser } from "../helper/helper"
import Navbar1 from "../Component/Navbar"

export default function DoctorRoute() {
    let auth = getUser()

    return (
        <>
            {auth && auth.status ? <>
                <Navbar1 />
                <Outlet />
            </> : <Navigate to="/login" />}
        </>
    )
}