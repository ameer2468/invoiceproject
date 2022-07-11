import Sidebar from '../src/components/page-specific/dashboard/sidebar';
import Header from '../src/components/page-specific/dashboard/header';

interface props {
  children: JSX.Element;
}

export default function DashboardLayout({ children }: props) {
  return (
    <>
      <Header />
      <Sidebar />
      {children}
    </>
  );
}
