import { Outlet } from "@remix-run/react";
import HardinLogo from "~/components/logo";
import AdminNav from "~/modules/admin/components/AdminNav";

const AdminLayout = () => {
  return (
    <div>
      <div className="w-full min-h-screen flex">
        <AdminNav />
        <div className="w-full gap-3 flex flex-col bg-gray-200">
          <div className="w-full bg-white p-3 flex items-center justify-center gap-3">
            <HardinLogo link="/" className="w-11" />
            <h1 className="text-primary-brown text-lg">HARDIN CAFE</h1>
          </div>
          <div className="border h-full bg-white mx-3 rounded-lg p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
