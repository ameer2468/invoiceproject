import Sidebar from "../pages/components/page-specific/dashboard/sidebar";
import Header from "../pages/components/page-specific/dashboard/header";

interface props {
    children: JSX.Element;
}

export default function DashboardLayout({ children }: props) {

    return (
                    <>
                        <Header/>
                        <Sidebar/>
                        {children}
                    </>

    )
}

