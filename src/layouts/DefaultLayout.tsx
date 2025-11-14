import { Outlet } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterC from "@/components/common/FooterC";
import HeaderC from "@/components/common/HeaderC";
import Navbar from "@/components/common/Navbar";

function DefaultLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderC />
      <Navbar />
      <Breadcrumb />
      <main className="container mx-auto flex-1 p-4">
        <Outlet />
      </main>
      <FooterC />
    </div>
  );
}

export default DefaultLayout;
