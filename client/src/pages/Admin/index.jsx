import { useSelector } from "react-redux";
import { Sidebar, Header } from "../../components/Admin";
import { Navigate, Outlet } from "react-router-dom";

const Admin = () => {
  const { userInfo } = useSelector((state) => state.auth?.userInfo || {});

  if ((userInfo && userInfo.role === "user") || !userInfo) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="flex flex-col min-h-screen max-h-full dashboard w-full bg-[#f1f5f9]">
      <div className="flex">
        <Sidebar />
        <div className="flex-grow flex flex-col">
          <Header />
          <div className="pt-[86px] pl-[256px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
