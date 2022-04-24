import Sidebar from "../pages/components/page-specific/dashboard/sidebar";
import Header from "../pages/components/page-specific/dashboard/header";
import {useUser} from "../pages/hooks/useUser";
import Loading from "../pages/components/global/loading";

interface props {
    children: JSX.Element;
}

export default function DashboardLayout({ children }: props) {

    const {userLoading} = useUser();

    return (
        <>
            {userLoading ?
                <div className="absoluteCenter">
                    <Loading size={12} color="black"/>
                </div>
            :
             <>
                 <Header/>
                 <Sidebar/>
                 {children}
             </>
            }
        </>
    )
}
