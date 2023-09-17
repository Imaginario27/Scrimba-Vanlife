import { Outlet } from "react-router-dom"
import SubNavigation from "./SubNavigation"

export default function HostLayout (){
    return (
        <>  
            <SubNavigation />
            <Outlet />
        </>
    )
}